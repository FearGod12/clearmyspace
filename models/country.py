#!/usr/bin/python3
"""contains country class"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Country(BaseModel, Base):
    """Representation of country class"""
    __tablename__ = 'countries'

    name = Column(String(255), nullable=False)
    states = relationship("State", backref="country",
                          cascade="all, delete, delete-orphan")
