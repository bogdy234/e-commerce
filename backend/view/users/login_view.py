from flask import jsonify, request

from application import app
from controller.users.LoginController import LoginController


@app.route("/api/users/login", methods=["POST"])
def login():
    if request.method == "POST":
        email = request.json["email"]
        password = request.json["password"]
        permanent_session = request.json["remember"]
        data_login = LoginController().login(email, password, permanent_session)
        return jsonify(data_login), data_login.get("code", 500)
