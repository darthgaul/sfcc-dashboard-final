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
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-change-in-prod')
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://localhost/sfcc_command_suite')

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
                    log_action(payload['user_id'], 'ACCESS_DENIED', details={
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
    
    # Check env-based admin first
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
                
                return jsonify({
                    'token': token,
                    'user': {'username': username, 'role': ENV_ADMIN['role']}
                })
        except Exception:
            pass
    
    log_action(None, 'LOGIN_FAILED', 'auth', None, {'username': username, 'ip_address': ip_address})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/login', methods=['POST'])
def login():
    """
    Authenticate user and issue JWT.
    Logs successful and failed attempts.
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT user_id, email, password_hash, user_role FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        # Log failed attempt (user_id=None if user doesn't exist)
        log_action(user['user_id'] if user else None, 'LOGIN_FAILED', details={'email': email})
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Generate JWT
    token = jwt.encode({
        'user_id': user['user_id'],
        'email': user['email'],
        'user_role': user['user_role'],
        'exp': datetime.utcnow() + timedelta(hours=8)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    
    # Log successful login
    log_action(user['user_id'], 'LOGIN_SUCCESS')
    
    return jsonify({
        'token': token,
        'user': {
            'user_id': user['user_id'],
            'email': user['email'],
            'role': user['user_role']
        }
    })

# ============================================
# P2: CONSENT SIGNING ENDPOINT (CCF 20-5)
# ============================================
@app.route('/api/consent/sign', methods=['POST'])
@require_role(['parent_guardian'])
def sign_consent():
    """
    Parent signs digital consent form (CCF 20-5).
    Captures youth protection data and media release choice.
    """
    data = request.get_json()
    user = g.current_user
    
    # Required field validation
    required_fields = [
        'cadet_id', 'emergency_contact_1_name', 'emergency_contact_1_phone', 'media_opt_in'
    ]
    for field in required_fields:
        if field not in data or data[field] is None:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    db = get_db()
    cur = db.cursor()
    
    cur.execute("""
        INSERT INTO consent_forms (
            cadet_id, parent_id, allergies, medications, pre_existing_conditions,
            emergency_contact_1_name, emergency_contact_1_phone,
            emergency_contact_2_name, emergency_contact_2_phone,
            media_opt_in, image_release_consent, ip_release_consent,
            consent_timestamp
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        RETURNING consent_id
    """, (
        data['cadet_id'],
        user['user_id'],
        data.get('allergies'),
        data.get('medications'),
        data.get('pre_existing_conditions'),
        data['emergency_contact_1_name'],
        data['emergency_contact_1_phone'],
        data.get('emergency_contact_2_name'),
        data.get('emergency_contact_2_phone'),
        data['media_opt_in'],
        data.get('image_release_consent'),
        data.get('ip_release_consent')
    ))
    
    consent_id = cur.fetchone()['consent_id']
    db.commit()
    cur.close()
    
    # Audit log
    log_action(user['user_id'], 'CONSENT_SIGNED', 'consent_forms', consent_id, {
        'cadet_id': data['cadet_id'],
        'media_opt_in': data['media_opt_in']
    })
    
    return jsonify({'success': True, 'consent_id': consent_id})

# ============================================
# AWE TRIGGER HOOKS (Placeholders)
# ============================================
# TODO: /api/awe/trigger-gate - Called by AWE when workflow gate needs evaluation
# TODO: /api/awe/remediation-check - Called when rubric_score < 2 detected
# TODO: /api/awe/board-packet-ready - Called to verify all gates passed before board submission

# ============================================
# HEALTH CHECK
# ============================================
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'version': '2.5.0'})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
