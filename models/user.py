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
    email = Column(String(256), nullable=False)
    password = Column(String(256), nullable=True)
    address = Column(String(256), nullable=True)
    state_id = Column(String(60), ForeignKey('states.id'), nullable=False)
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    country_id = Column(String(60), ForeignKey('countries.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Users"""
        if 'password' in kwargs:
            password = kwargs['password']
            m = hashlib.md5()
            m.update(str.encode(password))
            kwargs['password'] = m.hexdigest()
        super().__init__(*args, **kwargs)
