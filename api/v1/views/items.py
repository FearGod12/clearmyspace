#!/usr/bin/python3
"""API routes for Items"""

from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.item import Item


@app_views.route('/items', methods=['GET'], strict_slashes=False)
def get_items():
    """Returns all items in storage"""
    items = storage.all(Item)
    return jsonify([item.to_dict() for item in items.values()])


@app_views.route('/items', methods=['POST'], strict_slashes=False)
def create_item():
    """Creates Item"""
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400

    attrs = ['name', 'description', 'price', 'user_id', 'category_id']
    for attr in attrs:
        if attr not in data:
            return jsonify({'error': 'Missing data: ' + attr}), 400

    item = Item(**data)
    item.save()
    return jsonify(item.to_dict()), 201


@app_views.route('/items/<item_id>', methods=['GET'],
                 strict_slashes=False)
def get_item(item_id):
    """Return a Item with a matching item_id"""
    item = storage.get(Item, item_id)
    if item is None:
        abort(404)
    return jsonify(item.to_dict())


@app_views.route('/items/<item_id>', methods=['PUT'],
                 strict_slashes=False)
def update_item(item_id):
    """Update Item with a matching item_id"""
    item = storage.get(Item, item_id)
    if item is None:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400
    if 'id' in data:
        data.pop('id')
    for key, value in data.items():
        setattr(item, key, value)
    item.save()
    return jsonify(item.to_dict())


@app_views.route('/items/<item_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_item(item_id):
    """Delete Item with a matching item_id"""
    item = storage.get(Item, item_id)
    if item is None:
        abort(404)

    storage.delete(item)
    storage.save()
    return jsonify({}), 200
