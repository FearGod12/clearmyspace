#!/usr/bin/python3
"""Unittest for DBStorage featuring Category"""

from models.engine.db_storage import DBStorage
from unittest import TestCase

from models.category import Category


class Test_DBStorage(TestCase):
    """Contains Extensive tests for DBStorage Class"""

    def test_db_storage_reload(self):
        """
        Tests reload() method, being one of the first point
        of contact within the storage engine.
        """
        s = DBStorage()

        with self.assertRaises(AttributeError):
            s.all(Category)

        s.reload()
        self.assertIsInstance(s.all(Category), dict)

    def test_db_storage_new_and_save_method(self):
        """ Tests DBStorage.new() and DBStorage.save() """
        s = DBStorage()
        s.reload()

        c = Category(name='Test Category')
        self.assertIsNone(s.get(Category, c.id))
        s.new(c)
        s.save()
        self.assertIsNotNone(s.get(Category, c.id))
        self.assertEqual(s.get(Category, c.id), c)
        s.delete(c)

    def test_db_storage_delete_method(self):
        """ Tests DBStorage.delete() """
        s = DBStorage()
        s.reload()

        c = Category(name='Test Category')
        self.assertIsNone(s.get(Category, c.id))
        s.new(c)
        s.save()
        self.assertIsNotNone(s.get(Category, c.id))
        self.assertEqual(s.get(Category, c.id), c)
        s.delete(c)
        self.assertIsNone(s.get(Category, c.id))

    def test_db_storage_all_method(self):
        """ Tests DBStorage.all() """
        s = DBStorage()
        s.reload()

        count = len(s.all())
        c = Category(name='Test Category')
        s.new(c)
        s.save()
        self.assertEqual(count + 1, len(s.all()))
        s.delete(c)

        count = len(s.all(Category))
        c = Category(name='Test Category')
        s.new(c)
        s.save()
        self.assertEqual(count + 1, len(s.all(Category)))
        s.delete(c)

    def test_db_storage_close(self):
        """ Tests DBStorage.close() """
        from sqlalchemy.exc import InvalidRequestError
        s = DBStorage()
        s.reload()

        c = Category(name='Test Category')
        s.new(c)
        s.save()

        with self.assertRaises(InvalidRequestError):
            c.name = 'Just In name changed'
            c.save()

        s.close()
        c.save()
        c.delete()

    def test_db_storage_get(self):
        """ Tests DBStorage.get() """
        s = DBStorage()
        s.reload()

        c = Category(name='Test Category')
        self.assertIsNone(s.get(Category, c.id))

        s.new(c)
        s.save()
        self.assertIsNotNone(s.get(Category, c.id))
        s.delete(c)
