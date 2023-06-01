#!/usr/bin/python3
"""basemodel from which all other classes will inherit"""

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from uuid import uuid4

import models

Base = declarative_base()


class BaseModel:
    """Sample BaseModel"""
    id = Column(String(60), primary_key=True)
    created_at = Column(DateTime, default=lambda: datetime.utcnow(),
                        nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.utcnow(),
                        nullable=False)

    def __init__(self, *args, **kwargs):
        """Class constructor"""
        setattr(self, 'id', str(uuid4()))
        setattr(self, 'created_at', datetime.utcnow())
        setattr(self, 'updated_at', getattr(self, 'created_at'))

        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)
            for time in ['created_at', 'updated_at']:
                __pstr = "%Y-%m-%d %H:%M:%S.%f"
                if kwargs.get(time, None) and type(getattr(self, time)) is str:
                    setattr(self, time,
                            datetime.strptime(kwargs[time], __pstr))
                elif type(getattr(self, time)) is datetime:
                    pass
                else:
                    setattr(self, time, datetime.utcnow())

    def save(self):
        """Create and save `obj` to storage"""
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def delete(self):
        """Delete `obj` from storgae"""
        models.storage.delete(self)
        models.storage.save()

    def to_dict(self):
        """Returns a dictionary representation of an obj"""
        obj = {}
        attr = ['_sa_instance_state', 'password']
        __pstr = "%Y-%m-%d %H:%M:%S.%f"
        obj.update(self.__dict__)
        for item in attr:
            if obj.get(item):
                obj.pop(item)
        for item in ['created_at', 'updated_at']:
            if obj.get(item):
                obj.update({item: str(obj.get(item).strftime(__pstr))})
        return obj
