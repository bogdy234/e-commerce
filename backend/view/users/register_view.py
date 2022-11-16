from flask import jsonify, request

from application import app
from controller.users.RegisterController import RegisterController


@app.route("/api/users/register/", methods=["POST"])
def register():
    if request.method == "POST":
        first_name = request.json["first_name"]
        last_name = request.json["last_name"]
        email = request.json["email"]
        password = request.json["password"]
        confirm_password = request.json["confirm_password"]
        data_register = RegisterController().register(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            confirm_password=confirm_password,
        )
        return jsonify(data_register), data_register.get("code", 500)
