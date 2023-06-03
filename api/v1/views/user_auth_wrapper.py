#!/usr/bin/python3
"""User Auth Wrapper"""
from flask import session, jsonify
from functools import wraps


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        def denied():
            return jsonify({'error': 'Login Required!'}), 401

        attrs = ['username', 'email', 'id']
        for attr in attrs:
            if session.get(attr) is None:
                return denied()
        return f(*args, **kwargs)
    return decorated_function
