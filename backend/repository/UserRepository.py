from models.User import User
from models.Favourites import Favourites
from models.Cart import Cart
from models.Address import Address


class UserRepository:
    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def check_duplicate_email(email: str) -> bool:
        if User.query.filter_by(email=email).first():
            return True
        return False

    @staticmethod
    def add_user(**kwargs):
        return User(**kwargs)

    @staticmethod
    def add_favourites(**kwargs):
        return Favourites(**kwargs)

    @staticmethod
    def add_cart(**kwargs):
        return Cart(**kwargs)

    @staticmethod
    def add_address(**kwargs):
        return Address(**kwargs)

    @staticmethod
    def check_fav_prod(user_id, product_id):
        return Favourites.query.filter_by(
            user_id=user_id, product_id=product_id
        ).first()

    @staticmethod
    def save(data):
        return data.save()

    @staticmethod
    def delete(data):
        return data.delete()

    @staticmethod
    def check_if_user_exist(user_id):
        return User.query.get(user_id)

    @staticmethod
    def check_if_cart_product_exist(cart_id):
        return Cart.query.get(cart_id)

    @staticmethod
    def check_if_product_already_in_cart(product_id, user_id):
        return Cart.query.filter_by(
            product_id=product_id, user_id=user_id, ordered=False
        ).first()

    @staticmethod
    def get_user_cart_items(user_id):
        return Cart.query.filter_by(user_id=user_id, ordered=False)

    @staticmethod
    def check_user_favourite(favourite_id, user_id):
        return Favourites.query.filter_by(id=favourite_id, user_id=user_id).first()

    @staticmethod
    def get_favourite_by_id(favourite_id):
        return Favourites.query.get(favourite_id)

    @staticmethod
    def get_user_favourite_prods(user_id):
        return Favourites.query.filter_by(user_id=user_id)
