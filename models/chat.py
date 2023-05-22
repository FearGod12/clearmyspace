#!/usr/bin/python
""" holds class Chat"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Text
from sqlalchemy.orm import relationship
from models.chatlog import Chatlog


class Chat(BaseModel, Base):
    """Representation of Chat"""
    __tablename__ = 'chats'
    body = Column(Text, nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Chat"""
        __user_ids = kwargs.pop('user_ids', [])
        super().__init__(*args, **kwargs)
        self.save()

        for user_id in __user_ids:
            log = Chatlog(user_id=user_id, chat_id=self.id)
            log.save()
