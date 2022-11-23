from libs.LogHandler import LogHandler
from libs.constants import Constants
from repository.UserRepository import UserRepository
from repository.ProductRepository import ProductRepository


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
        if not ProductRepository.get_product_by_id(kwargs.get("product_id")):
            dict_comments["message"] = Constants.PRODUCT_NOT_FOUND
            dict_comments["code"] = Constants.NOT_FOUND_CODE
            return dict_comments
        if ProductRepository.check_if_user_already_added_comment(
            kwargs.get("product_id"), kwargs.get("user_id")
        ):
            dict_comments["message"] = Constants.COMMENT_ALREADY_ADDED
            dict_comments["code"] = Constants.BAD_REQUEST
            return dict_comments
        if not UserRepository.check_if_user_exist(kwargs.get("user_id")):
            dict_comments["message"] = Constants.USER_NOT_FOUND
            dict_comments["code"] = Constants.NOT_FOUND_CODE
            return dict_comments
        if not 0 < kwargs.get("rating") <= 5:
            dict_comments["message"] = Constants.INVALID_COMMENT_RATING
            dict_comments["code"] = Constants.BAD_REQUEST
            return dict_comments
        comment = ProductRepository.add_comment(**kwargs)
        comment_saved = ProductRepository.save(comment)
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
        if not ProductRepository.check_if_comment_exist(comment_id):
            dict_delete["message"] = Constants.COMMENT_NOT_FOUND
            dict_delete["code"] = Constants.NOT_FOUND_CODE
            return dict_delete
        if not admin:
            user_comment = ProductRepository.check_if_comment_apartain_to_user(
                comment_id, user_id
            )
            if not user_comment:
                dict_delete["message"] = Constants.COMMENT_NOT_FOR_THIS_USER
                dict_delete["code"] = Constants.UNAUTHORIZED
                return dict_delete
        comment = ProductRepository.check_if_comment_exist(comment_id)
        data_deleted = ProductRepository.delete(comment)
        if data_deleted:
            dict_delete["message"] = Constants.COMMENT_DELETED
            dict_delete["code"] = Constants.SUCCES_CODE
            return dict_delete
        return dict_delete

    def get_comment_by_prod_id(self, product_id):
        if not ProductRepository.get_product_by_id(product_id):
            return {
                "message": Constants.PRODUCT_NOT_FOUND,
                "code": Constants.NOT_FOUND_CODE,
            }
        return [
            comment.serialize()
            for comment in ProductRepository.get_comment_by_prod_id(
                product_id=product_id
            )
        ]

    def update_comment(self, **kwargs):
        dict_update = {
            "message": Constants.DEFAULT_ADD_COMMENT_PRODUCT,
            "code": Constants.NO_CONTENT,
            "comment": None,
        }
        comment = ProductRepository.check_if_comment_exist(kwargs.get("comment_id"))
        user_comment = ProductRepository.check_if_comment_apartain_to_user(
            kwargs.get("comment_id"), kwargs.get("user_id")
        )
        if not user_comment:
            dict_update["message"] = Constants.COMMENT_NOT_FOR_THIS_USER
            dict_update["code"] = Constants.UNAUTHORIZED
            return dict_update
        if not comment:
            dict_update["message"] = Constants.COMMENT_NOT_FOUND
            dict_update["code"] = Constants.NOT_FOUND_CODE
            return dict_update
        if kwargs.get("title"):
            comment.title = kwargs.get("title")
        if kwargs.get("description"):
            comment.desciption = kwargs.get("description")
        if kwargs.get("rating"):
            if not 0 < kwargs.get("rating") <= 5:
                dict_update["message"] = Constants.INVALID_COMMENT_RATING
                dict_update["code"] = Constants.BAD_REQUEST
                return dict_update
            comment.rating = kwargs.get("rating")
        comment_saved = ProductRepository.save(comment)
        if comment_saved:
            dict_update["message"] = Constants.COMMENT_SAVED
            dict_update["code"] = Constants.SUCCES_CODE
            dict_update["comment"] = comment.serialize()
            return dict_update
        return dict_update

    def get_user_comments(self, user_id):
        return [
            comments.serialize()
            for comments in ProductRepository.get_comments_by_user(user_id=user_id)
        ]
