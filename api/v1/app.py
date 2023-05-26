#!/usr/bin/python3
"""API Back-end:::: ClearMySpace"""

from models import storage
from api.v1.views import app_views
from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(app_views)
app.url_map.strict_slashes = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(404)
def not_found(error):
    """404 Not Found"""
    return jsonify({"error": "Not found!"}), 404

@app.teardown_appcontext
def close_storage(exception=None):
    """Close any active SQLAlchemy sessions"""
    storage.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, threaded=True)
