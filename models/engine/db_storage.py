#!/usr/bin/python3
"""SQLAlchemy Storage Engine"""
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from os import getenv

from models.base_model import Base, BaseModel

# importing and grouping of models' classes
from models.category import Category
from models.chat import Chat
from models.chatlog import Chatlog
from models.city import City
from models.country import Country
from models.item import Item
from models.purchase import Purchase
from models.review import Review
from models.state import State
from models.user import User

classes = [Category, Chat, Chatlog, City, Country, Item, Purchase,
           Review, State, User]


class DBStorage:
    """DBStorage class"""
    __engine = None
    __session = None

    def __init__(self):
        """DBStorage class constructor"""
        CMS_MYSQL_USER = getenv('CMS_MYSQL_USER')
        CMS_MYSQL_PWD = getenv('CMS_MYSQL_PWD')
        CMS_MYSQL_HOST = getenv('CMS_MYSQL_HOST')
        CMS_MYSQL_DB = getenv('CMS_MYSQL_DB')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(CMS_MYSQL_USER,
                                             CMS_MYSQL_PWD,
                                             CMS_MYSQL_HOST,
                                             CMS_MYSQL_DB))

    def reload(self):
        """(Re)load data from MySQL database"""
        Base.metadata.create_all(self.__engine)
        factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(factory)

    def new(self, obj):
        """Add `obj` to the current database session"""
        self.__session.add(obj)

    def save(self):
        """Save/commit all changes of the current db session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete `obj` from database"""
        if obj is not None:
            self.__session.delete(obj)

    def rollback(self):
        '''rolls back the current Sqlalchemy session
        after a failed flush occured
        just for testing purposes'''
        self.__session.rollback()

    def all(self, cls=None):
        """
        query-> SELECT * FROM cls.__tablename__
        [Returns a dictionary (key:obj) object for easy indexing]
        """
        objs_dict = {}
        if cls is None:
            for item in classes:
                objs = self.__session.query(item).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    objs_dict[key] = obj
        else:
            objs = self.__session.query(cls).all()
            for obj in objs:
                key = obj.__class__.__name__ + '.' + obj.id
                objs_dict[key] = obj

        return objs_dict

    def close(self):
        """close the current db session"""
        self.__session.remove()

    def get(self, cls, id, attr=None):
        """
        Returns a `obj` of `cls` with a matching `id`,
        or None if not exists.
        """
        if cls not in classes:
            return None
        if attr is not None:
            obj = self.all(cls).get(cls.__name__ + '.' + id, None)
            if obj is None:
                return obj
            return getattr(obj, attr, None)
        return self.all(cls).get(cls.__name__ + '.' + id, None)

    def match(self, cls, match={}, all=False):
        """
        Returns a `obj` of `cls` with a matching list
        of attributes
        """
        if cls not in classes or len(match) == 0:
            return None
        results = []
        for key, value in match.items():
            if all is False:
                obj = self.__session.query(cls).filter(
                    getattr(cls, key) == value).first()
                if obj is not None:
                    return obj
            else:
                obj = self.__session.query(cls).filter(
                    getattr(cls, key) == value).all()
                if obj is not None:
                    results.extend(obj)
                    obj = results[:]
        return obj
