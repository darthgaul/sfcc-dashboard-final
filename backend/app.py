"""
SFCC Command Suite V2.5 - Flask Backend
P1 Security Backbone: Authentication, RBAC, Audit Logging
"""

import os
import json
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, request, jsonify, g
from flask_cors import CORS
import jwt
import bcrypt
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

# Configuration
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-change-in-prod')
DATABASE_URL = os.getenv('DATABASE_URL')

# Env-based admin
ENV_ADMIN = {
    'username': 'admin',
    'password_hash': os.getenv('ADMIN_PASSWORD_HASH'),
    'role': 'admin'
}

# ============================================
# DATABASE CONNECTION (OPTIONAL)
# ============================================
def get_db():
    """Get database connection. Returns None if DATABASE_URL not set."""
    if not DATABASE_URL:
        return None
    if 'db' not in g:
        import psycopg2
        from psycopg2.extras import RealDictCursor
        try:
            g.db = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        except Exception as e:
            print(f"[DB ERROR] {e}")
            return None
    return g.db

@app.teardown_appcontext
def close_db(error):
    """Close database connection."""
    db = g.pop('db', None)
    if db is not None:
        db.close()

# ============================================
# AUDIT LOGGING (Non-Repudiation)
# ============================================
def log_action(user_id, action_type, target_table=None, target_id=None, details=None):
    """Write to audit_log table. Falls back to console if no DB."""
    print(f"[AUDIT] user={user_id} action={action_type} table={target_table} id={target_id} details={details}")
    db = get_db()
    if db:
        try:
            cur = db.cursor()
            cur.execute("""
                INSERT INTO audit_log (user_id, action_type, target_table, target_id, details, ip_address)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (user_id, action_type, target_table, target_id, json.dumps(details) if details else None, request.remote_addr))
            db.commit()
            cur.close()
        except Exception as e:
            print(f"[AUDIT LOG ERROR] {e}")

# ============================================
# RBAC DECORATOR
# ============================================
def require_role(allowed_roles):
    """Decorator to enforce RBAC on endpoints."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization', '').replace('Bearer ', '')
            if not token:
                return jsonify({'error': 'No token provided'}), 401
            try:
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
                g.current_user = payload
                if payload.get('user_role') not in allowed_roles:
                    log_action(payload.get('user_id'), 'ACCESS_DENIED', None, None, {'endpoint': request.endpoint, 'required_roles': allowed_roles})
                    return jsonify({'error': 'Insufficient permissions'}), 403
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token'}), 401
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# ============================================
# AUTH ENDPOINTS
# ============================================
@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def auth_login():
    """Authenticate via username (env-based admin)."""
    if request.method == 'OPTIONS':
        return '', 200
    
    data = request.get_json()
    username = data.get('username', '').lower().strip()
    password = data.get('password', '')
    ip_address = request.remote_addr

    if username == ENV_ADMIN['username'] and ENV_ADMIN['password_hash']:
        try:
            if bcrypt.checkpw(password.encode('utf-8'), ENV_ADMIN['password_hash'].encode('utf-8')):
                token = jwt.encode({
                    'user_id': 0,
                    'username': username,
                    'user_role': ENV_ADMIN['role'],
                    'exp': datetime.utcnow() + timedelta(hours=24)
                }, app.config['SECRET_KEY'], algorithm='HS256')
                log_action(0, 'LOGIN_SUCCESS', 'auth', None, {'username': username, 'ip_address': ip_address})
                return jsonify({'token': token, 'user': {'username': username, 'role': ENV_ADMIN['role']}})
        except Exception as e:
            print(f"[AUTH ERROR] {e}")

    log_action(None, 'LOGIN_FAILED', 'auth', None, {'username': username, 'ip_address': ip_address})
    return jsonify({'error': 'Invalid credentials'}), 401

# ============================================
# HEALTH CHECK
# ============================================
@app.route('/api/health', methods=['GET'])
def health_check():
    db_status = 'connected' if get_db() else 'not configured'
    return jsonify({'status': 'healthy', 'version': '2.5.0', 'database': db_status})

@app.route('/', methods=['GET'])
def root():
    return jsonify({'service': 'SFCC Command Suite API', 'version': '2.5.0'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[STARTUP] Starting on port {port}")
    print(f"[STARTUP] DATABASE_URL configured: {bool(DATABASE_URL)}")
    print(f"[STARTUP] ADMIN_PASSWORD_HASH configured: {bool(ENV_ADMIN['password_hash'])}")
    app.run(host='0.0.0.0', port=port, debug=False)
