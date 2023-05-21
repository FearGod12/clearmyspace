#!/usr/bin/python3
"""contains Item class"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship


class Item(BaseModel, Base):
    """Representaion of Item class"""
    __tablename__ = 'items'

    name = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=False)
    price = Column(Integer, nullable=False)
    images = Column(String(256), nullable=True)
    listed = Column(Boolean, nullable=False, default=True)
    seller_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    category_id = Column(String(60), ForeignKey('categories.id'),
                         nullable=False)
