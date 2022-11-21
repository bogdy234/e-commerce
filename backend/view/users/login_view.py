from flask import jsonify, request, make_response

from application import app, production
from controller.users.LoginController import LoginController


@app.route("/api/users/login", methods=["POST"])
def login():
    if request.method == "POST":
        email = request.json["email"]
        password = request.json["password"]
        permanent_session = request.json["remember"]
        data_login = LoginController().login(email, password, permanent_session)
        resp = make_response(jsonify(data_login), data_login.get("code", 500))
        if data_login.get("token"):
            resp.set_cookie(
                "jwt",
                data_login.get("token"),
                secure=False if not production else True,
                domain="0.0.0.0",
                httponly=True,
            )
        return resp
