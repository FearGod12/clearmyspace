#!/usr/bin/python
'''ApI routes for City'''

from models import storage
from api.v1.views import app_views
from models.city import City
from flask import jsonify, abort, request


@app_views.route('/cities', methods=['Get'], strict_slashes=False)
def get_cities():
    '''returns a list of all City instances in storage'''
    cities = storage.all(City)
    return jsonify([city.to_dict() for city in cities.values()])


@app_views.route('/cities/<city_id>', methods=['GET'],
                 strict_slashes=False)
def get_city(city_id):
    '''returns a city instance with the specified id'''
    city = storage.get(City, city_id)
    if city is None:
        abort(404)

    return jsonify(city.to_dict())


@app_views.route('/cities', methods=['POST'], strict_slashes=False)
def create_city():
    '''creates a new City instance and saves it in storage'''
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a json'}), 400

    attrs = ['name', 'state_id']
    for attr in attrs:
        if attr not in data:
            return jsonify({'error': 'Missing data ' + attr}), 400
    city = City(**data)
    city.save()
    return jsonify(city.to_dict()), 201


@app_views.route('/cities/<city_id>', methods=['PUT'],
                 strict_slashes=False)
def update_city(city_id):
    '''Updates the City instance with the matching id'''
    city = storage.get(City, city_id)
    if city is None:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a json'}), 400

    if 'id' in data:
        del data['id']

    for key, value in data.items():
        setattr(city, key, value)
    city.save()
    return jsonify(city.to_dict()), 200


@app_views.route('/cities/<city_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_city(city_id):
    '''deletes a city instance whose id matches the city_ id'''
    city = storage.get(City, city_id)
    if city is None:
        abort(404)
    storage.delete(city)
    storage.save()
    return ({}), 200
