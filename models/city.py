#!/usr/bin/python3
"""contains City class"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class City(BaseModel, Base):
    """Representation of city class"""
    __tablename__ = 'cities'

    name = Column(String(255), nullable=False)
    state_id = Column(String(60), ForeignKey('states.id'), nullable=False)
