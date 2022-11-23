from application import app
from libs.JwtHandler import check_auth
from flask import request, jsonify
from controller.products.FavouritesController import FavouritesController


@app.route("/api/products/favourites", methods=["GET", "POST", "DELETE"])
@check_auth()
def favourite_prod(user):
    if request.method == "GET":
        return jsonify(FavouritesController().get_favourites_products(user_id=user.cid))
    if request.method == "POST":
        product_id = request.json.get("product_id")
        data_fav = FavouritesController().add_favourite_product(
            user_id=user.cid, product_id=product_id
        )
        return jsonify(data_fav), data_fav.get("code", 500)
    if request.method == "DELETE":
        favourite_id = request.json.get("favourite_id")
        data_fav_delete = FavouritesController().delete_favourite_product(
            favourite_id=favourite_id, user_id=user.cid
        )
        return jsonify(data_fav_delete), data_fav_delete.get("code", 500)
