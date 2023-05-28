#!/usr/bin/python
'''ApI routes for State'''

from models import storage
from api.v1.views import app_views
from models.state import State
from flask import jsonify, abort, request


@app_views.route('/states', methods=['Get'], strict_slashes=False)
def get_states():
    '''returns a list of all State instances in storage'''
    states = storage.all(State)
    return jsonify([state.to_dict() for state in states.values()])


@app_views.route('/states/<state_id>', methods=['GET'],
                 strict_slashes=False)
def get_state(state_id):
    '''returns a state instance with the specified id'''
    state = storage.get(State, state_id)
    if state is None:
        abort(404)

    return jsonify(state.to_dict())


@app_views.route('/states', methods=['POST'], strict_slashes=False)
def create_state():
    '''creates a new State instance and saves it in storage'''
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a json'}), 400

    attrs = ['name', 'country_id']
    for attr in attrs:
        if attr not in data:
            return jsonify({'error': 'Missing data: ' + attr}), 400
    state = State(**data)
    state.save()
    return jsonify(state.to_dict()), 201


@app_views.route('/states/<state_id>', methods=['PUT'],
                 strict_slashes=False)
def update_state(state_id):
    '''Updates the State instance with the matching id'''
    state = storage.get(State, state_id)
    if state is None:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a json'}), 400

    if 'id' in data:
        del data['id']

    if len(data) != 0:
        for key, value in data.items():
            setattr(state, key, value)
        state.save()
    return jsonify(state.to_dict()), 200


@app_views.route('/states/<state_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_state(state_id):
    '''deletes a state instance whose id matches the state_ id'''
    state = storage.get(State, state_id)
    if state is None:
        abort(404)
    storage.delete(state)
    storage.save()
    return ({}), 200
