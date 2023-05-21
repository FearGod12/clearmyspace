#!/usr/bin/python3
"""contains State class"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class State(BaseModel, Base):
    """Representation of State class"""
    __tablename__ = 'states'

    name = Column(String(255), nullable=False)
    cities = relationship("City", backref="state",
                          cascade="all, delete, delete-orphan")
    country_id = Column(String(60), ForeignKey('countries.id'), nullable=False)
