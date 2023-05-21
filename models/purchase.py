#!/usr/bin/python3
"""contains Purchase class"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey
import uuid


class Purchase(BaseModel, Base):
    """Purchase class"""
    __tablename__ = 'purchases'

    reference_id = Column(String(60), default=lambda: str(uuid.uuid4()))
    buyer_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    item_id = Column(String(60), ForeignKey('items.id'), nullable=False)
