#!/usr/bin/python3
"""contains the class Category"""

from models.test_base_model import Base, BaseModel
from sqlalchemy import Column, String


class Category(BaseModel, Base):
    """category class"""
    __tablename__ = 'categories'

    name = Column(String(255), nullable=False)
