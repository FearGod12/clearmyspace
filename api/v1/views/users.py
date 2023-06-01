#!/usr/bin/python3
"""API routes for Users"""

from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.user import User


@app_views.route('/users', methods=['GET'], strict_slashes=False)
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
