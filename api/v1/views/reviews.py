#!/usr/bin/python3
"""API routes for Reviews"""

from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.review import Review
from models.user import User


@app_views.route('/users/<user_id>/reviews', methods=['GET'],
                 strict_slashes=False)
def get_user_reviews(user_id):
    """Returns a list of Reviews for a matching user_id"""
    reviews = storage.get(User, user_id, attr='reviews')
    if reviews is None:
        abort(404)

    return jsonify([review.to_dict() for review in reviews])


@app_views.route('/users/<user_id>/reviews/<review_id>', methods=['GET'],
                 strict_slashes=False)
def get_review(user_id, review_id):
    """Return a User Review with a matching review_id"""
    user_reviews = storage.get(User, user_id, attr='reviews')
    if user_reviews is None:
        abort(404)

    review = storage.get(Review, review_id)
    if review is None:
        abort(404)

    if review not in user_reviews:
        abort(404)

    return jsonify(review.to_dict())


@app_views.route('/users/<user_id>/authored_reviews', methods=['GET'],
                 strict_slashes=False)
def get_user_authored_reviews(user_id):
    """Returns a list of Reviews authored by a matching user_id"""
    authored_reviews = storage.get(User, user_id, attr='authored_reviews')
    if authored_reviews is None:
        abort(404)

    return jsonify([review.to_dict() for review in authored_reviews])


@app_views.route('/users/<user_id>/authored_reviews/<review_id>',
                 methods=['GET'], strict_slashes=False)
def get_user_authored_review(user_id, review_id):
    """Return a User authored review with a matching review_id"""
    user_authored_reviews = storage.get(User, user_id,
                                        attr='authored_reviews')
    if user_authored_reviews is None:
        abort(404)

    review = storage.get(Review, review_id)
    if review is None:
        abort(404)

    if review not in user_authored_reviews:
        abort(404)

    return jsonify(review.to_dict())


@app_views.route('/users/<user_id>/reviews', methods=['POST'],
                 strict_slashes=False)
def create_review(user_id):
    """Create a review for this user"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400

    attrs = ['rating', 'author_id']
    for attr in attrs:
        if attr not in data:
            return jsonify({'error': 'Missing data: ' + attr}), 400
    data.update({'user_id': user_id})
    review = Review(**data)
    review.save()
    return jsonify(review.to_dict()), 201


@app_views.route('/users/<user_id>/reviews/<review_id>',
                 methods=['PUT'], strict_slashes=False)
def update_review(user_id, review_id):
    """Update User review with a matching review_id"""
    user_reviews = storage.get(User, user_id, attr='reviews')
    if user_reviews is None:
        abort(404)

    review = storage.get(Review, review_id)
    if review is None:
        abort(404)

    if review not in user_reviews:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Not a JSON'}), 400

    attrs = ['rating', 'author_id']
    for attr in attrs:
        if attr not in data:
            return jsonify({'error': 'Missing data: ' + attr}), 400

    author = storage.get(User, data.get('author_id'))
    if review not in author.authored_reviews:
        return jsonify({'error': 'Bad request'}), 400

    setattr(review, 'body', data.get('body', None))
    setattr(review, 'rating', data.get('rating', None))
    review.save()
    return jsonify(review.to_dict())


@app_views.route('/users/<user_id>/authored_reviews/<review_id>',
                 methods=['DELETE'], strict_slashes=False)
def delete_review(user_id, review_id):
    """Delete a User authored review with a matching id"""
    user_authored_reviews = storage.get(User, user_id,
                                        attr='authored_reviews')
    if user_authored_reviews is None:
        abort(404)

    review = storage.get(Review, review_id)
    if review is None:
        abort(404)

    if review not in user_authored_reviews:
        abort(404)

    storage.delete(review)
    storage.save()
    return jsonify({}), 200
