#!/usr/bin/python
""" holds class Chat"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Text
from sqlalchemy.orm import relationship
from models.chatlog import Chatlog
import json


class Chat(BaseModel, Base):
    """Representation of Chat"""
    __tablename__ = 'chats'
    text = Column(Text, nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Chat"""
        __user_ids = kwargs.pop('user_ids', [])
        super().__init__(*args, **kwargs)
        self.save()

        for user_id in __user_ids:
            log = Chatlog(user_id=user_id, chat_id=self.id)
            log.save()

    @property
    def body(self):
        """Returns a json parsed form of body"""
        if self.text is None:
            return None
        return json.loads(self.text)

    @body.setter
    def body(self, value):
        """Creates a json conversation model for chat body"""
        chat = self.body
        if chat is None:
            chat = []
        chat.append(value)
        self.text = json.dumps(chat)
        self.save()

    def to_dict(self):
        """Returns a dictionary representation of Chat"""
        obj = {}
        attr = ['_sa_instance_state']
        obj.update(self.__dict__)
        for item in attr:
            if obj.get(item):
                obj.pop(item)
        for item in ['created_at', 'updated_at']:
            if obj.get(item):
                obj.update({item: str(obj.get(item))})
        obj.update({'text': json.loads(obj.get('text'))})
        return obj
