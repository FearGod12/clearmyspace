#!/usr/bin/python
""" holds class Review"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref


class Review(BaseModel, Base):
    """Representation of Review """
    __tablename__ = 'reviews'
    rating = Column(Integer, nullable=False)
    author_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    text = Column(String(1024), nullable=False)

    author = relationship('User', foreign_keys=[author_id],
                          backref=backref('authored_reviews',
                                          cascade='all, delete'))
    user = relationship('User', foreign_keys=[user_id],
                        backref=backref('reviews', cascade='all, delete'))
