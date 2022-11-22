from libs.LogHandler import LogHandler
from models.Products import Product
from libs.constants import Constants
from models.User import User
from models.Comments import Comments


class CommentsController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("comments_controller.log")

    def check_arguments(self, **kwargs):
        list_args = [
            kwargs.get("user_id"),
            kwargs.get("product_id"),
            kwargs.get("title"),
            kwargs.get("description"),
            kwargs.get("rating"),
        ]
        return all(list_args)

    def check_product_if_exist(self, product_id):
        return Product.query.get(product_id)

    def check_if_user_exist(self, user_id):
        return User.query.get(user_id)

    def check_if_comment_exist(self, comment_id):
        return Comments.query.get(comment_id)

    def check_if_comment_apartain_to_user(self, comment_id, user_id):
        return Comments.query.filter_by(user_id=user_id, id=comment_id).all()

    def add_comment(self, **kwargs):
        dict_comments = {
            "message": Constants.DEFAULT_ADD_COMMENT_PRODUCT,
            "code": Constants.NO_CONTENT,
            "comment": None,
        }
        valid_arguments = self.check_arguments(**kwargs)
        if not valid_arguments:
            dict_comments["message"] = Constants.INVALID_ARGUMENTS
            dict_comments["code"] = Constants.INTERNAL_SERVER_ERROR
            return dict_comments
        if not self.check_product_if_exist(kwargs.get("product_id")):
            dict_comments["message"] = Constants.PRODUCT_NOT_FOUND
            dict_comments["code"] = Constants.NOT_FOUND_CODE
            return dict_comments
        if not self.check_if_user_exist(kwargs.get("user_id")):
            dict_comments["message"] = Constants.USER_NOT_FOUND
            dict_comments["code"] = Constants.NOT_FOUND_CODE
            return dict_comments
        if not 0 < kwargs.get("rating") <= 5:
            dict_comments["message"] = Constants.INVALID_COMMENT_RATING
            dict_comments["code"] = Constants.BAD_REQUEST
            return dict_comments
        comment = Comments(**kwargs)
        comment_saved = comment.save()
        if comment_saved:
            dict_comments["message"] = Constants.COMMENT_SAVED
            dict_comments["code"] = Constants.SUCCES_CODE
            dict_comments["comment"] = comment.serialize()
            return dict_comments
        return dict_comments

    def delete_comment(self, comment_id, user_id, admin=False):
        dict_delete = {
            "message": Constants.DEFAULT_DELETE_COMMENT_PRODUCT,
            "code": Constants.NO_CONTENT,
        }
        if not self.check_if_comment_exist(comment_id):
            dict_delete["message"] = Constants.COMMENT_NOT_FOUND
            dict_delete["code"] = Constants.NOT_FOUND_CODE
            return dict_delete
        if not admin:
            user_comment = self.check_if_comment_apartain_to_user(comment_id, user_id)
            if not user_comment:
                dict_delete["message"] = Constants.COMMENT_NOT_FOR_THIS_USER
                dict_delete["code"] = Constants.UNAUTHORIZED
                return dict_delete
        comment = Comments.query.get(comment_id)
        data_deleted = comment.delete()
        if data_deleted:
            dict_delete["message"] = Constants.COMMENT_DELETED
            dict_delete["code"] = Constants.SUCCES_CODE
            return dict_delete
        return dict_delete

    def get_comment_by_prod_id(self, product_id):
        if not self.check_product_if_exist(product_id):
            return {
                "message": Constants.PRODUCT_NOT_FOUND,
                "code": Constants.NOT_FOUND_CODE,
            }
        return [
            comment.serialize()
            for comment in Comments.query.filter_by(product_id=product_id).all()
        ]
