#!/usr/bin/python
""" holds class Review"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Review(BaseModel, Base):
    """Representation of Review """
    __tablename__ = 'reviews'
    rating = Column(Integer, nullable=False)
    author_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    text = Column(String(1024), nullable=False)
