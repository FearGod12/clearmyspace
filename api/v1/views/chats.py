#!/usr/bin/python3
"""API routes for Chats"""

from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.chat import Chat
from models.user import User


@app_views.route('/users/<user_id>/chats', methods=['GET'],
                 strict_slashes=False)
def get_chats(user_id):
    """Returns a list of Chats of a User with a matching user_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    # Todo: customized one-request-get-all-related-data
    chats = [chatlog.chat.to_dict() for chatlog in user.chatlogs]
    return jsonify(chats)


@app_views.route('/users/<user_id>/chats/<chat_id>', methods=['GET'],
                 strict_slashes=False)
def get_chat(user_id, chat_id):
    """Return Chat with a matching chat_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    user_chats = [chatlog.chat for chatlog in user.chatlogs]

    chat = storage.get(Chat, chat_id)
    if chat is None:
        abort(404)
    if chat not in user_chats:
        abort(404)

    return jsonify(chat.to_dict())
