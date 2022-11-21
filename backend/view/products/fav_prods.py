from application import app
from libs.JwtHandler import check_auth
from models.Favourites import Favourites
from flask import request, jsonify
from controller.products.FavouritesController import FavouritesController


@app.route("/api/products/favourites", methods=["GET", "POST", "DELETE"])
@check_auth()
def favourite_prod(user):
    if request.method == "GET":
        favourites_prods = Favourites.query.filter_by(user_id=user.cid)
        return jsonify([fav_prod.serialize() for fav_prod in favourites_prods])
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
