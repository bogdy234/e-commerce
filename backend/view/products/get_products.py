from application import app
from flask import jsonify, request
from controller.products.ProductController import ProductController


@app.route("/api/products", methods=["GET"])
def get_products():
    if request.method == "GET":
        return jsonify(ProductController().get_all_products())


@app.route("/api/products/<int:product_id>")
def get_product_by_id(product_id):
    data_fetch = ProductController().get_product_by_id(product_id)
    return jsonify(data_fetch), data_fetch.get("code", 200)
