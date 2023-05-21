#!/usr/bin/python
""" holds class Chat"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class Chat(BaseModel, Base):
    """Representation of Chat"""
    __tablename__ = 'chats'
    text = Column(String(1024), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Review"""
        super().__init__(*args, **kwargs)
