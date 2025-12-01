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
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

# Configuration
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-change-in-prod')
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://[localhost/sfcc_command_suite](http://localhost/sfcc_command_suite)')

# Env-based admin (for initial setup before database users exist)
ENV_ADMIN = {
    'username': 'admin',
    'password_hash': os.getenv('ADMIN_PASSWORD_HASH'),
    'role': 'admin'
}

# ============================================
# DATABASE CONNECTION
# ============================================
def get_db():
    """Get database connection."""
    if 'db' not in g:
        g.db = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
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
    """
    Write to audit_log table for non-repudiation.
    Every security-sensitive action must call this.
    """
    try:
        db = get_db()
        cur = db.cursor()
        cur.execute("""
            INSERT INTO audit_log (user_id, action_type, target_table, target_id, details, ip_address)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            user_id,
            action_type,
            target_table,
            target_id,
            json.dumps(details) if details else None,
            request.remote_addr
        ))
        db.commit()
        cur.close()
    except Exception as e:
        print(f"[AUDIT LOG ERROR] {e}")

# ============================================
# RBAC DECORATOR
# ============================================
def require_role(allowed_roles):
    """
    Decorator to enforce RBAC on endpoints.
    Usage: @require_role(['squadron_commander', 'regional_commander'])
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization', '').replace('Bearer ', '')
            if not token:
                return jsonify({'error': 'No token provided'}), 401

            try:
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
                g.current_user = payload

                if payload['user_role'] not in allowed_roles:
                    log_action(payload['user_id'], 'ACCESS_DENIED', None, None, {
                        'endpoint': request.endpoint,
                        'required_roles': allowed_roles
                    })
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
@app.route('/api/auth/login', methods=['POST'])
def auth_login():
    """
    Authenticate via username (env-based admin) or email (database users).
    """
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
                response = jsonify({'token': token, 'user': {'username': username, 'role': ENV_ADMIN['role']}})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        except Exception:
            pass

    log_action(None, 'LOGIN_FAILED', 'auth', None, {'username': username, 'ip_address': ip_address})
    response = jsonify({'error': 'Invalid credentials'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 401
```
