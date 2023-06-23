#!/usr/bin/python3
"""Models for Clear My Space Project"""
from dotenv import load_dotenv

load_dotenv()

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
