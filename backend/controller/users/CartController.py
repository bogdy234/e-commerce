from libs.constants import Constants
from libs.LogHandler import LogHandler
from models.User import User
from models.Cart import Cart
from models.Products import Product


class CartController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("cart_controller.log")

    def get_cart(self, user_id):
        cart_obejcts = [
            cart_user.serialize()
            for cart_user in Cart.query.filter_by(user_id=user_id, ordered=False)
        ]
        total_cart_amount_with_discount = 0
        total_cart_amount_without_discount = 0
        for data_cart in cart_obejcts:
            total_cart_amount_with_discount += (
                data_cart["product"]["price_with_discount"]
                * data_cart["product_quantity"]
            )
            total_cart_amount_without_discount += (
                data_cart["product"]["price"] * data_cart["product_quantity"]
            )

        return {
            "total_amount": total_cart_amount_without_discount,
            "total_amount_with_discount": total_cart_amount_with_discount,
            "cart": cart_obejcts,
        }

    def check_if_product_exist(self, product_id):
        return Product.query.get(product_id)

    def check_if_user_exist(self, user_id):
        return User.query.get(user_id)

    def check_if_cart_product_exist(self, cart_id):
        return Cart.query.get(cart_id)

    def check_if_product_already_in_cart(self, product_id, user_id):
        return Cart.query.filter_by(
            product_id=product_id, user_id=user_id, ordered=False
        ).first()

    def add_product_to_cart(self, user_id, product_id, quantity):
        dict_cart = {
            "message": Constants.DEFAULT_CART_MESSAGE,
            "code": Constants.NO_CONTENT,
            "cart": None,
        }
        product_exist = self.check_if_product_exist(product_id)
        if not product_exist:
            dict_cart["message"] = Constants.PRODUCT_NOT_FOUND
            dict_cart["code"] = Constants.NOT_FOUND_CODE
            return dict_cart
        if product_exist.quantity <= 0:
            dict_cart["message"] = Constants.PRODUCT_NOT_IN_STOCK
            dict_cart["code"] = Constants.NOT_FOUND_CODE
            return dict_cart
        if quantity > product_exist.quantity:
            dict_cart["message"] = Constants.TO_MUCH_PRODUCTS
            dict_cart["code"] = Constants.NOT_FOUND_CODE
            return dict_cart
        if not self.check_if_user_exist(user_id):
            dict_cart["message"] = Constants.USER_NOT_FOUND
            dict_cart["code"] = Constants.NOT_FOUND_CODE
            return dict_cart
        product_already_in_cart = self.check_if_product_already_in_cart(
            product_id, user_id
        )
        if product_already_in_cart:
            product_already_in_cart.product_quantity += quantity
            if product_already_in_cart.product_quantity > product_exist.quantity:
                dict_cart["message"] = Constants.TO_MUCH_PRODUCTS
                dict_cart["code"] = Constants.NOT_FOUND_CODE
                return dict_cart
            data_saved = product_already_in_cart.save()
            if data_saved:
                dict_cart["message"] = Constants.UPDATE_PRODUCT_QUANTITY_CART
                dict_cart["code"] = Constants.SUCCES_CODE
                return dict_cart
        cart_product = Cart(
            user_id=user_id, product_id=product_id, product_quantity=quantity
        )
        cart_saved = cart_product.save()
        if cart_saved:
            dict_cart["message"] = Constants.PRODUCT_ADDED_TO_CARD
            dict_cart["code"] = Constants.SUCCES_CODE
            dict_cart["cart"] = cart_product.serialize()
            return dict_cart
        return dict_cart

    def update_specific_quantity(
        self,
        cart_prod_id,
        quantity,
    ):
        dict_update_quantity = {
            "message": Constants.DEFAULT_CART_MESSAGE,
            "code": Constants.NO_CONTENT,
        }
        cart_product = self.check_if_cart_product_exist(cart_prod_id)
        if not cart_product:
            dict_update_quantity["message"] = Constants.CART_ID_NOT_FOUND
            dict_update_quantity["code"] = Constants.NOT_FOUND_CODE
            return dict_update_quantity
        if quantity <= 1:
            dict_update_quantity["message"] = Constants.INVALID_QUANTITY
            dict_update_quantity["code"] = Constants.BAD_REQUEST
            return dict_update_quantity
        cart_product.product_quantity = quantity
        data_update = cart_product.save()
        if data_update:
            dict_update_quantity["message"] = Constants.UPDATE_PRODUCT_QUANTITY_CART
            dict_update_quantity["code"] = Constants.SUCCES_CODE
            return dict_update_quantity
        return dict_update_quantity

    def delete_cart_id(self, cart_id):
        dict_delete_quantity = {
            "message": Constants.DEFAULT_CART_MESSAGE,
            "code": Constants.NO_CONTENT,
        }
        cart_product = self.check_if_cart_product_exist(cart_id)
        if not cart_product:
            dict_delete_quantity["message"] = Constants.CART_ID_NOT_FOUND
            dict_delete_quantity["code"] = Constants.NOT_FOUND_CODE
            return dict_delete_quantity
        data_deleted = cart_product.delete()
        if data_deleted:
            dict_delete_quantity["message"] = Constants.PRODUCT_DELETED_FROM_CART
            dict_delete_quantity["code"] = Constants.SUCCES_CODE
            return dict_delete_quantity
        return dict_delete_quantity
