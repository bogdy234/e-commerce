from application import app
from flask import jsonify, request
from controller.products.ProductController import ProductController
from libs.JwtHandler import check_auth


@app.route("/api/products/<int:product_id>", methods=["PUT", "DELETE"])
@check_auth(admin=True)
def update_product(user, product_id):
    if request.method == "PUT":
        title = request.json.get("title")
        price = request.json.get("price")
        quantity = request.json.get("quantity")
        discount = request.json.get("discount")
        description = request.json.get("description")
        imgUrl = request.json.get("imgUrl")
        category = request.json.get("category")
        data_update = ProductController().update(
            product_id=product_id,
            title=title,
            price=price,
            quantity=quantity,
            discount=discount,
            description=description,
            imgUrl=imgUrl,
            category=category,
        )
        return jsonify(data_update), data_update.get("code", 500)
    if request.method == "DELETE":
        data_delete = ProductController().delete(product_id)
        return jsonify(data_delete), data_delete.get("code", 500)
