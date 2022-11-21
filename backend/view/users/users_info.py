from flask import jsonify

from application import app
from libs.JwtHandler import check_auth
from models.User import User


@app.route("/api/users/me", methods=["GET"])
@check_auth()
def user_me(user):
    return jsonify(user.serialize())


@app.route("/api/setadmin/<int:user_id>", methods=["GET"])
def set_admin(user_id):
    u1 = User.query.get(user_id)
    u1.role_id = 2
    u1.save()
    return jsonify({"user": u1.serialize()})


@app.route("/api/setuser/<int:user_id>", methods=["GET"])
def set_user(user_id):
    u1 = User.query.get(user_id)
    u1.role_id = 1
    u1.save()
    return jsonify({"user": u1.serialize()})
