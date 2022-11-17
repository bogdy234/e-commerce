from flask import jsonify, request

from application import app
from libs.JwtHandler import check_auth


@app.route("/api/users/me", methods=["GET"])
@check_auth
def user_me(user):
    return jsonify(user.serialize())
