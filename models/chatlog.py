#!/usr/bin/python3
"""contains Chatlog class"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey


class Chatlog(BaseModel, Base):
    """Chatlog class"""
    __tablename__ = 'Chatlogs'

    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    chat_id = Column(String(60), ForeignKey('chats.id'), nullable=False)
