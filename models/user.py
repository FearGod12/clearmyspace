#!/usr/bin/python3
"""contains User class"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
import hashlib


class User(BaseModel, Base):
    """Users class"""
    __tablename__ = 'users'

    username = Column(String(255), nullable=False)
    firstname = Column(String(255), nullable=False)
    lastname = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    address = Column(String(255), nullable=True)
    state_id = Column(String(60), ForeignKey('states.id'), nullable=True)
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=True)
    country_id = Column(String(60), ForeignKey('countries.id'), nullable=True)

    city = relationship("City")
    state = relationship("State")
    country = relationship("Country")
    listings = relationship("Item", backref="user_id",
                            cascade="all, delete, delete-orphan")
    # chatlogs = relationship("Chatlog")

    def __init__(self, *args, **kwargs):
        """initializes Users"""
        if 'password' in kwargs:
            password = kwargs['password']
            m = hashlib.md5()
            m.update(str.encode(password))
            kwargs['password'] = m.hexdigest()
        super().__init__(*args, **kwargs)

    @property
    def name(self):
        """A getter for firstname and lastname combined"""
        return "{} {}".format(self.firstname, self.lastname)

    def new_chat(self, recipient, message, attachments=[]):
        """Creates a new Chat object with `recipient` user obj"""
        from models.chat import Chat
        chat = Chat(body=self.make_message(message, attachments),
                    user_ids=[self.id, recipient.id])

    def update_chat(self, chat, message, attachements=[]):
        """Updates existing conversation with message"""
        from models.chat import Chat
        chat.body = self.make_message(message, attachements)

    def make_message(self, message, attachments):
        """Make a message representation object"""
        from uuid import uuid4
        from datetime import datetime

        obj = {}
        obj['id'] = str(uuid4())
        obj['user_id'] = self.id
        obj['created_at'] = str(datetime.utcnow())
        obj['body'] = message
        obj['attachments'] = attachments

        return obj
