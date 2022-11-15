from application.app import app
from flask import jsonify
from models.User import Users
@app.route("/login")
def login():
    u1 = Users(first_name="Test123",last_name="Teasda")
    u1.save()
    user = Users.query.filter_by(cid=1).first()
    print(user.serialize())
    return jsonify({"Hello":user.serialize()}), 200
