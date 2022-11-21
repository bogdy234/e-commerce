from application import app
from flask import jsonify, request
from controller.products.ProductController import ProductController
from libs.JwtHandler import check_auth
from models.Products import Product
from libs.constants import Constants


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
        data_deleted = product.delete()
        if data_deleted:
            return (
                jsonify(
                    {
                        "message": Constants.PRODUCT_DELETED.format(product_id),
                        "code": Constants.SUCCES_CODE,
                    }
                ),
                Constants.SUCCES_CODE,
            )
