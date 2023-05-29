#!/usr/bin/python3
"""API routes for Categories"""

from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.category import Category


@app_views.route('/categories', methods=['GET'], strict_slashes=False)
def get_categories():
    """Returns a list of all Category in Storage"""
    categories = storage.all(Category)
    return jsonify([category.to_dict() for category in categories.values()])


@app_views.route('categories', methods=['POST'],
                 strict_slashes=False)
def create_category():
    """Create a new Category in Storage"""
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400

    if 'name' not in data:
        return jsonify({'error': 'Missing data: name'}), 400
    category = Category(**data)
    category.save()
    return jsonify(category.to_dict()), 201


@app_views.route('/categories/<category_id>', methods=['GET'],
                 strict_slashes=False)
def get_category(category_id):
    """Return a Category with a matching category_id"""
    category = storage.get(Category, category_id)
    if category is None:
        abort(404)

    return jsonify(category.to_dict())


@app_views.route('categories/<category_id>', methods=['PUT'],
                 strict_slashes=False)
def update_category(category_id):
    """Updates Category with a matching category_id"""
    category = storage.get(Category, category_id)
    if category is None:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonfy({'error': 'Not a JSON'}), 400

    if 'id' in data:
        data.pop('id')

    if len(data) != 0:
        for key, value in data.items():
            setattr(category, key, value)
        category.save()
    return jsonify(category.to_dict())


@app_views.route('categories/<category_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_category(category_id):
    """Deletes Category with a matching category_id"""
    category = storage.get(Category, category_id)
    if category is None:
        abort(404)

    storage.delete(category)
    storage.save()
    return jsonify({})


@app_views.route('categories/<category_id>/items', methods=['GET'],
                 strict_slashes=False)
def get_category_items(category_id):
    """Return a list of Item of the Category with a matching
    category_id"""
    category = storage.get(Category, category_id)
    if category is None:
        abort(404)

    return jsonify([item.to_dict() for item in category.items])
