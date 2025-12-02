import os
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import bcrypt
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret')
ADMIN_HASH = os.getenv('ADMIN_PASSWORD_HASH')

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        resp = app.make_default_options_response()
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return resp

@app.after_request
def add_cors(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/api/login', methods=['POST', 'OPTIONS'])
@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def login():
    data = request.get_json() or {}
    username = data.get('username', data.get('email', '')).lower().strip()
    password = data.get('password', '')
    
    if username == 'admin' and ADMIN_HASH:
        if bcrypt.checkpw(password.encode(), ADMIN_HASH.encode()):
            token = jwt.encode({
                'user_id': 0,
                'username': 'admin',
                'role': 'admin',
                'user_role': 'admin',
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm='HS256')
            return jsonify({'token': token, 'user': {'username': 'admin', 'role': 'admin', 'user_role': 'admin'}})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/', methods=['GET'])
def root():
    return jsonify({'service': 'SFCC API'})

if __name__ == '__main__':
    print(f"[START] Admin configured: {bool(ADMIN_HASH)}")
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
