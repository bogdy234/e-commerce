from application import app
from libs.JwtHandler import check_auth
from controller.users.CartController import CartController
from flask import jsonify, request


@app.route("/api/users/cart", methods=["GET", "POST", "DELETE", "PUT"])
@check_auth()
def cart(user):
    if request.method == "GET":
        data_cart = CartController().get_cart(user.cid)
        return jsonify(data_cart)
    if request.method == "POST":
        product_id = request.json.get("product_id")
        quantity = request.json.get("quantity")
        data_cart = CartController().add_product_to_cart(
            user_id=user.cid, product_id=product_id, quantity=quantity
        )
        return jsonify(data_cart), data_cart.get("code", 500)
    if request.method == "PUT":
        cart_id = request.json.get("cart_id")
        new_quantity = request.json.get("new_quantity")
        data_update = CartController().update_specific_quantity(
            cart_prod_id=cart_id, quantity=new_quantity
        )
        return jsonify(data_update), data_update.get("code", 500)
    if request.method == "DELETE":
        cart_id = request.json.get("cart_id")
        data_delete = CartController().delete_cart_id(cart_id)
        return jsonify(data_delete), data_delete.get("code", 500)
