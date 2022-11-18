from flask import jsonify, request

from application import app
from controller.users.LoginController import LoginController
from libs.JwtHandler import check_auth
from models.User import User


@app.route("/api/users/login/", methods=["POST"])
def login():
    if request.method == "POST":
        email = request.json["email"]
        password = request.json["password"]
        permanent_session = request.json["remember"]
        data_login = LoginController().login(email, password, permanent_session)
        return jsonify(data_login), data_login.get("code", 500)
