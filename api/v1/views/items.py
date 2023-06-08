#!/usr/bin/python3
"""API routes for Items"""

from datetime import datetime
from api.v1.views import app_views
from flask import jsonify, abort, request, send_file
from models import storage
from models.item import Item
from flask import session
from os.path import join
from werkzeug.utils import secure_filename
import os


@app_views.route('/items', methods=['GET'], strict_slashes=False)
def get_items():
    """Returns all items in storage"""
    items = storage.all(Item)
    base_url = request.host_url.rstrip('/')
    for item in items.values():
        item.images = "{}/{}".format(base_url, item.images)
    return jsonify([item.to_dict() for item in items.values()])


@app_views.route('/items', methods=['POST'], strict_slashes=False)
def create_item():
    """Creates Item"""
    if 'images' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    name = request.form.get('name')
    description = request.form.get('description')
    price = request.form.get('price')
    user_id = request.form.get('user_id')
    category_id = request.form.get('category_id')
    if not all([name, description, price, category_id]):
        return jsonify({'error': 'Missing data'}), 400

    item = Item(name=name, description=description, price=price,
                user_id=user_id, category_id=category_id)
    files = request.files.getlist('images')
    for file in files:
        if file.filename == '':
            continue
        filename = secure_filename(file.filename)
        ext = '.' + filename.rsplit('.', 1)[1].lower()
        # todo: validate image format
        current_time = datetime.now().strftime("%Y%m%d%H%M%S")
        image_name = f'{current_time}_{item.id}{ext}'
        image_path = join('data/images', f'{image_name}')
        os.makedirs(os.path.dirname(image_path), exist_ok=True)
        file.save(image_path)
        item.images = image_path
    item.save()
    return jsonify(item.to_dict()), 201


@app_views.route('/data/images/<path:filename>')
def serve_static(filename):
    static_folder = '/home/vagrant/clearmyspace/api/v1/data/images'
    try:
        return send_file(f'{static_folder}/{filename}', mimetype='image/png')
    except FileNotFoundError:
        abort(404)


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
    if len(data) != 0:
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
