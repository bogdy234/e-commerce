from libs.LogHandler import LogHandler
from libs.constants import Constants
from repository.UserRepository import UserRepository
from repository.ProductRepository import ProductRepository


class FavouritesController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("product_controller.log")

    def add_favourite_product(self, user_id, product_id):
        dict_favourites = {
            "message": Constants.DEFAULT_FAVOURITE_PRODUCT,
            "code": Constants.NO_CONTENT,
            "fav_product": None,
        }
        fav_prod_exist = UserRepository.check_fav_prod(user_id, product_id)
        if fav_prod_exist:
            dict_favourites["message"] = Constants.FAVOURITE_PRODUCT_ALREADY_EXIST
            dict_favourites["code"] = Constants.CONFLICT_CODE
            return dict_favourites
        product_exist = ProductRepository.get_product_by_id(product_id)
        if not product_exist:
            dict_favourites["message"] = Constants.PRODUCT_NOT_FOUND
            dict_favourites["code"] = Constants.NOT_FOUND_CODE
            return dict_favourites
        fav_prod = UserRepository.add_favourites(user_id=user_id, product_id=product_id)
        data_saved = UserRepository.save(fav_prod)
        if data_saved:
            dict_favourites["message"] = Constants.FAVOURITE_PRODUCT_SAVED
            dict_favourites["code"] = Constants.SUCCES_CODE
            dict_favourites["fav_product"] = fav_prod.serialize()
            return dict_favourites
        return dict_favourites

    def delete_favourite_product(self, favourite_id, user_id):
        dict_delete_fav = {
            "message": Constants.DEFAULT_DELETE_FAVOURITE_PRODUCT,
            "code": Constants.NO_CONTENT,
        }
        user_favourite = UserRepository.check_user_favourite(favourite_id, user_id)
        if not user_favourite:
            dict_delete_fav["message"] = Constants.FAVOURITE_PRODUCT_NOT_YOURS
            dict_delete_fav["code"] = Constants.CONFLICT_CODE
            return dict_delete_fav
        data_delete = UserRepository.delete(user_favourite)
        if data_delete:
            dict_delete_fav["message"] = Constants.FAVOURITE_PRODUCT_DELETED
            dict_delete_fav["code"] = Constants.SUCCES_CODE
            return dict_delete_fav
        return dict_delete_fav

    def get_favourites_products(self, user_id):
        return [
            fav_prod.serialize()
            for fav_prod in UserRepository.get_user_favourite_prods(user_id=user_id)
        ]
