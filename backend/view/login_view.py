from application.app import app
from flask import jsonify

@app.route("/login")
def login():
    return jsonify({"Hello":"World"}), 200