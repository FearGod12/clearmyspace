#!/usr/bin/python3
"""Models for Clear My Space Project"""

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
