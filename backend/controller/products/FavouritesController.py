from libs.LogHandler import LogHandler
from models.Favourites import Favourites
from models.Products import Product
from libs.constants import Constants


class FavouritesController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("product_controller.log")

    def check_fav_prod(self, user_id, product_id):
        return Favourites.query.filter_by(
            user_id=user_id, product_id=product_id
        ).first()

    def check_if_product_exist(self, product_id):
        return Product.query.get(product_id)

    def add_favourite_product(self, user_id, product_id):
        dict_favourites = {
            "message": Constants.DEFAULT_FAVOURITE_PRODUCT,
            "code": Constants.NO_CONTENT,
            "fav_product": None,
        }
        fav_prod_exist = self.check_fav_prod(user_id, product_id)
        if fav_prod_exist:
            dict_favourites["message"] = Constants.FAVOURITE_PRODUCT_ALREADY_EXIST
            dict_favourites["code"] = Constants.CONFLICT_CODE
            return dict_favourites
        product_exist = self.check_if_product_exist(product_id)
        if not product_exist:
            dict_favourites["message"] = Constants.PRODUCT_NOT_FOUND
            dict_favourites["code"] = Constants.NOT_FOUND_CODE
            return dict_favourites
        fav_prod = Favourites(user_id=user_id, product_id=product_id)
        data_saved = fav_prod.save()
        if data_saved:
            dict_favourites["message"] = Constants.FAVOURITE_PRODUCT_SAVED
            dict_favourites["code"] = Constants.SUCCES_CODE
            dict_favourites["fav_product"] = fav_prod.serialize()
            return dict_favourites
        return dict_favourites

    def check_user_favourite(self, favourite_id, user_id):
        return Favourites.query.filter_by(id=favourite_id, user_id=user_id).first()

    def delete_favourite_product(self, favourite_id, user_id):
        dict_delete_fav = {
            "message": Constants.DEFAULT_DELETE_FAVOURITE_PRODUCT,
            "code": Constants.NO_CONTENT,
        }
        user_favourite = self.check_user_favourite(favourite_id, user_id)
        if not user_favourite:
            dict_delete_fav["message"] = Constants.FAVOURITE_PRODUCT_NOT_YOURS
            dict_delete_fav["code"] = Constants.CONFLICT_CODE
            return dict_delete_fav
        fav_prod_delete = Favourites.query.get(favourite_id)
        data_delete = fav_prod_delete.delete()
        if data_delete:
            dict_delete_fav["message"] = Constants.FAVOURITE_PRODUCT_DELETED
            dict_delete_fav["code"] = Constants.SUCCES_CODE
            return dict_delete_fav
        return dict_delete_fav

    def get_favourites_products(self, user):
        return [
            fav_prod.serialize()
            for fav_prod in Favourites.query.filter_by(user_id=user.cid)
        ]
