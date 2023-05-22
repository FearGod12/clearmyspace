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
    listings = relationship("Item", backref="seller",
                            cascade="all, delete, delete-orphan")
    chatlogs = relationship("Chatlog")

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
