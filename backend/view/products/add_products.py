from application import app
from flask import jsonify, request
from controller.products.ProductController import ProductController
from libs.JwtHandler import check_auth


@app.route("/api/products/add", methods=["POST"])
@check_auth(admin=True)
def add_product(user):
    if request.method == "POST":
        title = request.json.get("title")
        price = request.json.get("price")
        quantity = request.json.get("quantity")
        discount = request.json.get("discount")
        description = request.json.get("description")
        imgUrl = request.json.get("imgUrl")
        category = request.json.get("category")
        data_add = ProductController().add(
            title=title,
            price=price,
            quantity=quantity,
            discount=discount,
            description=description,
            imgUrl=imgUrl,
            category=category,
        )
        return jsonify(data_add), data_add.get("code", 500)
