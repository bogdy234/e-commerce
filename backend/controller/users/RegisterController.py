import bcrypt

from libs.CCommonFunctions import CCommonFunctions
from libs.constants import Constants
from libs.LogHandler import LogHandler
from models.User import User


class RegisterController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("register_controller.log")

    def check_duplicate_email(self, email):
        if User.query.filter_by(email=email).first():
            return True
        return False

    def register(self, **kwargs):
        dic_register = {
            "message": Constants.DEFAULT_REGISTER_MESSAGE,
            "code": Constants.NO_CONTENT,
            "user": None,
        }
        if self.check_duplicate_email(kwargs.get("email")):
            dic_register["message"] = Constants.DUPLICATE_EMAIL_REGISTER
            dic_register["code"] = Constants.CONFLICT_CODE
            return dic_register
        if kwargs.get("password") != kwargs.get("confirm_password"):
            dic_register["message"] = Constants.PASSWORD_NOT_MATCH
            dic_register["code"] = Constants.CONFLICT_CODE
            return dic_register
        message_password, status_password = CCommonFunctions.validate_password(
            kwargs.get("password")
        )
        if not status_password:
            dic_register["message"] = message_password
            dic_register["code"] = Constants.CONFLICT_CODE
            return dic_register
        user_register = User(
            first_name=kwargs.get("first_name"),
            last_name=kwargs.get("last_name"),
            email=kwargs.get("email"),
            role_id=Constants.DEFUALT_USER_GROUP,
            password=bcrypt.hashpw(kwargs.get("password").encode(), bcrypt.gensalt()),
            vat=Constants.DEFAULT_R0MANIA_VAT,
        )
        user_saved = user_register.save()
        if user_saved:
            dic_register["message"] = Constants.REGISTRATION_SUCCESS
            dic_register["code"] = Constants.SUCCES_CODE
            dic_register["user"] = user_register.serialize()
        return dic_register
