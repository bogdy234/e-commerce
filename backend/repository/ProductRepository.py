from models.Comments import Comments
from models.Products import Product


class ProductRepository:
    @staticmethod
    def get_all():
        return Product.query.all()

    @staticmethod
    def add_product(**kwargs):
        return Product(**kwargs)

    def add_comment(**kwargs):
        return Comments(**kwargs)

    @staticmethod
    def get_product_by_id(product_id):
        return Product.query.get(product_id)

    @staticmethod
    def save(data):
        return data.save()

    @staticmethod
    def delete(data):
        return data.delete()

    @staticmethod
    def check_if_comment_exist(comment_id):
        return Comments.query.get(comment_id)

    @staticmethod
    def check_if_comment_apartain_to_user(comment_id, user_id):
        return Comments.query.filter_by(user_id=user_id, id=comment_id).all()

    @staticmethod
    def check_if_user_already_added_comment(product_id, user_id):
        return Comments.query.filter_by(user_id=user_id, product_id=product_id).first()

    @staticmethod
    def get_comment_by_prod_id(product_id):
        return Comments.query.filter_by(product_id=product_id).all()

    @staticmethod
    def get_comments_by_user(user_id):
        return Comments.query.filter_by(user_id=user_id)
