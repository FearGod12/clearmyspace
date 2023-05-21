#!/usr/bin/python3
"""Test Category object class"""

from models.test_base_model import Base, BaseModel
from sqlalchemy import Column, String


class Category(BaseModel, Base):
    """A test class for category clas"""
    __tablename__ = 'categories'

    name = Column(String(255), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes state"""
        super().__init__(*args, **kwargs)
