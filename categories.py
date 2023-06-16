#!/usr/bin/python3
"""Create Categories"""

from models import storage
from models.category import Category

categories = ['Electronics', 'Clothing and Fashion', 'Home and Kitchen',
              'Health and Beauty', 'Sports and Fitness',
              'Books and Stationery', 'Toys and Games',
              'Automotive and Tools', 'Jewelry and Accessories',
              'Baby and Kids', 'Pet Supplies', 'Furniture and Decor',
              'Outdoor and Garden', 'Groceries and Food', 'Art and Craft',
              'Music and Instruments', 'Office Supplies',
              'Travel and Luggage', 'Gifts and Souvenirs', 'Miscellaneous']

for name in categories:
    category = Category(name=name)
    category.save()
