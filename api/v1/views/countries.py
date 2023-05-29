#!/usr/bin/python
'''ApI routes for Country'''

from models import storage
from api.v1.views import app_views
from models.country import Country
from flask import jsonify, abort, request


@app_views.route('/countries', methods=['Get'], strict_slashes=False)
def get_coutries():
    '''returns a list of all Country instances in storage'''
    countries = storage.all(Country)
    return jsonify([country.to_dict() for country in countries.values()])


@app_views.route('/countries/<country_id>', methods=['GET'],
                 strict_slashes=False)
def get_country(country_id):
    '''returns a country instance with the specified id'''
    country = storage.get(Country, country_id)
    if country is None:
        abort(404)
    return jsonify(country.to_dict())


@app_views.route('/countries/<country_id>/states', methods=['GET'],
                 strict_slashes=False)
def get_states_of_country(country_id):
    '''returns the states in a particular country'''
    states = storage.get(Country, country_id, attr="states")
    if states is None:
        abort(404)
    return jsonify([state.to_dict() for state in states])


@app_views.route('/countries', methods=['POST'], strict_slashes=False)
def create_country():
    '''creates a new Country instance and saves it in storage'''
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a json'}), 400

    attrs = ['name']
    for attr in attrs:
        if attr not in data:
            return jsonify({'error': 'Missing data: ' + attr}), 400
    country = Country(**data)
    country.save()
    return jsonify(country.to_dict()), 201


@app_views.route('/countries/<country_id>', methods=['PUT'],
                 strict_slashes=False)
def update_country(country_id):
    '''Updates the Country instance with the matching id'''
    country = storage.get(Country, country_id)
    if country is None:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a json'}), 400

    if 'id' in data:
        del data['id']

    if 'name' not in data:
        return jsonify({'error': 'Missing data: name'}), 400

    for key, value in data.items():
        setattr(country, key, value)
    country.save()
    return jsonify(country.to_dict()), 200


@app_views.route('/countries/<country_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_country(country_id):
    '''deletes a country instance whose id matches the countr_ id'''
    country = storage.get(Country, country_id)
    if country is None:
        abort(404)
    storage.delete(country)
    storage.save()
    return ({}), 200
