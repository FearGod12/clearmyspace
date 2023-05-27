#!/usr/bin/python3
"""API blueprint for ClearMySpace Project"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

# import all relavant routes defined within api.v1.views
from api.v1.views.status import *  # noqa
from api.v1.views.items import *  # noqa
from api.v1.views.users import *  # noqa
from api.v1.views.chats import *  # noqa
from api.v1.views.reviews import *  # noqa
from api.v1.views.countries import *
from api.v1.views.cities import *
