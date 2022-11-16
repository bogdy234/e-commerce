from flask import jsonify

from application import app
from models.User import User


@app.route("/login/<int:user_id>")
def login(user_id):
    u1 = User.query.get(user_id)

    return jsonify({"Hello": u1.serialize()}), 200
