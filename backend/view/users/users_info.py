from flask import jsonify, request

from application import app
from libs.JwtHandler import check_auth
from models.Products import Product
from models.Comments import Comments
from models.Favourites import Favourites


@app.route("/api/users/me", methods=["GET"])
@check_auth()
def user_me(user):
    return jsonify(user.serialize())


@app.route("/prod", methods=["POST", "GET"])
@check_auth()
def add_prod_comment(user):
    if request.method == "POST":
        c1 = Comments(user.cid, 4, "adsads", "dadsa", 4)
        c1.save()
        return "dssd"
    if request.method == "GET":
        c1 = Comments.query.filter_by(product_id=1).all()
        return jsonify({"comments": [comment.serialize() for comment in c1]})


@app.route("/products", methods=["GET", "POST"])
def products_info():
    if request.method == "POST":
        p1 = Product(
            title="testproduct",
            price=25.5,
            quantity=100,
            discount=0,
            description="dasasdasdads",
            imgUrl="/static/test.png",
            category="ELECTRONICS",
        )
        data = p1.save()
        print(data)
        return "ads"
    if request.method == "GET":
        print(Product.query.all()[0].serialize())
        return jsonify(
            {"products": [product.serialize() for product in Product.query.all()]}
        )


@app.route("/fav", methods=["GET"])
@check_auth()
def fav_prod(user):
    f1 = Favourites.query.filter_by(user_id=user.cid)
    return jsonify({"prods": [fav.serialize() for fav in f1]})
