#!/usr/bin/python3
"""Test BaseModel"""

from unittest import TestCase
from datetime import datetime

from models.base_model import BaseModel
from models import storage


class TestBaseModel(TestCase):
    """TestCase class for BaseModel class"""

    def test_base_attributes_exists(self):
        """
        Test for if base attributes exists from the basemodel;
        attributes such as: id, created_at, updated_at, delete,
        and save.
        """
        base = BaseModel()
        attributes = ['id', 'created_at', 'updated_at', 'delete',
                      'save']
        for attribute in attributes:
            self.assertTrue(hasattr(base, attribute))

    def test_base_model_id_is_unique(self):
        """
        Test for if BaseModel id generation is unique;
        testing this by generating 1000 unique objs and comparing
        their ids.
        """
        objs = []

        for i in range(0, 1000):
            base = BaseModel()
            objs.append(base.id)

        objs_set = set(objs)
        self.assertEqual(len(objs_set), len(objs))

    def test_datetime_attributes(self):
        """
        Test for if datetime attributes `created_at` and `updated_at`
        for the following:
        + they are instance of datetime
        + have equal timestamp on create of a new instance
        + updated_at changed if obj.save() is called.
        """
        from sqlalchemy.orm.exc import UnmappedInstanceError

        base = BaseModel()

        self.assertIsInstance(base.created_at, datetime)
        self.assertIsInstance(base.updated_at, datetime)
        self.assertEqual(base.created_at.__str__(),
                         base.updated_at.__str__())
        try:
            # sqlalchemy.orm.exc.UnmappedInstanceError is expected
            base.save()
        except UnmappedInstanceError:
            pass
        self.assertNotEqual(base.created_at.__str__(),
                            base.updated_at.__str__())

    def test_instance_creation_using_kwargs(self):
        """
        Tests if object creation using **kwargs is possible; and
        it creates an exact copy of the object **kwargs represents.
        """
        base1 = BaseModel()
        base2 = BaseModel(**base1.__dict__)
        self.assertTrue(base1.__dict__ == base2.__dict__)
        self.assertFalse(base1 == base2)

    def test_base_model_save(self):
        """
        With the help of category model class, tests that BaseModel
        save method properly saves object instance from storage.
        """
        from models.category import Category

        c = Category(name='Test Category')
        self.assertIsNone(storage.get(Category, c.id))

        c.save()
        self.assertEqual(storage.get(Category, c.id), c)
        c.delete()

    def test_base_model_delete(self):
        """
        With the help of category model class, tests that BaseModel
        delete method properly deletes object instance from storage.
        """
        from models.category import Category

        c = Category(name='Test Category')
        self.assertIsNone(storage.get(Category, c.id))

        c.save()
        self.assertEqual(storage.get(Category, c.id), c)

        c.delete()
        self.assertIsNone(storage.get(Category, c.id))
