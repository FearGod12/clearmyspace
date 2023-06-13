#!/usr/bin/python3
"""API routes for Users"""

from api.v1.views import app_views
from flask import jsonify, abort, request, session
from models import storage
from models.user import User
from api.v1.views.user_auth_wrapper import login_required


@app_views.route('/users', methods=['GET'], strict_slashes=False)
@login_required
def get_users():
    """Return all list of users in storage:
    This route will be removed in production, and only will be
    made available in testing."""
    users = storage.all(User)
    return jsonify([user.to_dict() for user in users.values()])


@app_views.route('/users/<user_id>', methods=['GET'],
                 strict_slashes=False)
def get_user(user_id):
    """Return User with a matching user_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    return jsonify(user.to_dict())


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def create_user():
    """Create a new User in storage"""
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400

    attrs = ['username', 'firstname', 'lastname', 'email', 'password']
    for attr in attrs:
        if attr not in data:
            return jsonify({'error': 'Missing data: ' + attr}), 400
    user = User(**data)
    user.save()
    return jsonify(user.to_dict()), 201


@app_views.route('/users/<user_id>', methods=['PUT'],
                 strict_slashes=False)
def update_user(user_id):
    """Update User with a matching user_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400
    if 'id' in data:
        data.pop('id')

    for key, value in data.items():
        setattr(user, key, value)
    user.save()
    return jsonify(user.to_dict()), 200


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id):
    """Deletes User with a matching user_id:
    This route will be removed in production, and only will be
    made available in testing."""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    storage.delete(user)
    storage.save()
    return jsonify({}), 200


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def user_login():
    """Validates user login and creates a session if exists"""
    from hashlib import md5
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400

    email = data.get('email', None)
    username = data.get('username', None)
    password = data.get('password', None)

    if password is None:
        abort(404)

    if email is not None:
        user = storage.match(User, match={'email': email})
    if username is not None:
        user = storage.match(User, match={'username': username})
    if user is None:
        abort(404)

    if user.password == md5(password.encode()).hexdigest():
        session['id'] = user.id
        session['email'] = user.email
        session['username'] = user.username
        return jsonify(user.to_dict())
    abort(404)


@app_views.route('/logout', methods=['POST'], strict_slashes=False)
def logout():
    """Clears active user's session"""
    session.clear()
    return jsonify({}), 200


@app_views.route('/@me', methods=['GET'], strict_slashes=False)
@login_required
def current_user():
    """Returns info about the current logged in user"""
    user = storage.get(User, session.get('id', None))
    if user is None:
        abort(404)
    return jsonify(user.to_dict())


@app_views.route('/users/<user_id>/items', methods=['GET'],
                 strict_slashes=False)
def get_user_items(user_id):
    """Return a list Item of a matching User"""
    items = storage.get(User, user_id, attr='listings')
    if items is None:
        abort(404)
    return jsonify([item.to_dict() for item in items])
