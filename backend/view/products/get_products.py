from application import app
from flask import jsonify, request
from models.Products import Product
from libs.constants import Constants


@app.route("/api/products", methods=["GET"])
def get_products():
    if request.method == "GET":
        return jsonify([product.serialize() for product in Product.query.all()])


@app.route("/api/products/<int:product_id>")
def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if not product:
        return (
            jsonify(
                {
                    "message": Constants.PRODUCT_NOT_FOUND,
                    "code": Constants.NOT_FOUND_CODE,
                }
            ),
            Constants.NOT_FOUND_CODE,
        )
    return jsonify(product.serialize())
