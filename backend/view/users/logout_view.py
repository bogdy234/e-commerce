from application import app
from flask import jsonify, request
from libs.JwtHandler import JwtHandler


@app.route("/api/users/logout", methods=["POST"])
def logout():
    if request.method == "POST":
        token = request.headers.get("Authorization")
        if token:
            token = token.split(" ")[1]
            data = JwtHandler.add_token_to_blacklist(token=token)
            return jsonify(data), data.get("code", 500)
    return jsonify({"message": "Unknown error"}), 500
