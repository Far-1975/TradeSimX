from flask import Blueprint, request, jsonify
from functools import wraps
from .models import Database, User

auth = Blueprint('auth', __name__)
db = Database()
user_model = User(db)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        token = token.split(' ')[1] if ' ' in token else token
        payload = user_model.verify_token(token)
        if not payload:
            return jsonify({'message': 'Invalid token'}), 401

        # Get the user from database using the user_id from token payload
        user = user_model.get_user_by_id(payload['user_id'])
        if not user:
            return jsonify({'message': 'User not found'}), 404

        return f(user, *args, **kwargs)
    return decorated

@auth.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        required = ['email', 'password']
        if not all(k in data for k in required):
            return jsonify({'message': 'Missing required fields'}), 400

        user_id = user_model.create_user(
            data['email'],
            data['password']
        )
        return jsonify({
            'message': 'User created successfully',
            'user_id': user_id
        }), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400

    auth_result = user_model.authenticate(data['email'], data['password'])
    if not auth_result:
        return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify(auth_result), 200

@auth.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    try:
        return jsonify(current_user), 200
    except Exception as e:
        return jsonify({'message': f'Error retrieving profile: {str(e)}'}), 500

@auth.route('/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        success = user_model.update_user(current_user['_id'], data)
        if not success:
            return jsonify({'message': 'Update failed'}), 400
        
        # Get updated user data
        updated_user = user_model.get_user_by_id(current_user['_id'])
        return jsonify(updated_user), 200
    except Exception as e:
        return jsonify({'message': f'Error updating profile: {str(e)}'}), 500 