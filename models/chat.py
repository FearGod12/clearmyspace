#!/usr/bin/python
""" holds class Chat"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Text


class Chat(BaseModel, Base):
    """Representation of Chat"""
    __tablename__ = 'chats'
    text = Column(Text, nullable=False)
