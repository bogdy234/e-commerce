import bcrypt

from libs.CCommonFunctions import CCommonFunctions
from libs.constants import Constants
from libs.LogHandler import LogHandler
from repository.UserRepository import UserRepository


class RegisterController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("register_controller.log")

    def register(self, **kwargs) -> dict:
        dic_register = {
            "message": Constants.DEFAULT_REGISTER_MESSAGE,
            "code": Constants.NO_CONTENT,
            "user": None,
        }
        if UserRepository.check_duplicate_email(kwargs.get("email")):
            dic_register["message"] = Constants.DUPLICATE_EMAIL_REGISTER
            dic_register["code"] = Constants.CONFLICT_CODE
            return dic_register
        if not CCommonFunctions.check_valid_email(kwargs.get("email")):
            dic_register["message"] = Constants.INVALID_EMAIL_PATTERN
            dic_register["code"] = Constants.BAD_REQUEST
            return dic_register
        if kwargs.get("password") != kwargs.get("confirm_password"):
            dic_register["message"] = Constants.PASSWORD_NOT_MATCH
            dic_register["code"] = Constants.BAD_REQUEST
            return dic_register
        message_password, status_password = CCommonFunctions.validate_password(
            kwargs.get("password")
        )
        if not status_password:
            dic_register["message"] = message_password
            dic_register["code"] = Constants.BAD_REQUEST
            return dic_register
        user_register = UserRepository.add_user(
            first_name=kwargs.get("first_name"),
            last_name=kwargs.get("last_name"),
            email=kwargs.get("email"),
            role_id=Constants.DEFUALT_USER_GROUP,
            password=bcrypt.hashpw(
                kwargs.get("password").encode("utf-8"), bcrypt.gensalt()
            ).decode("utf-8"),
            vat=Constants.DEFAULT_R0MANIA_VAT,
        )
        user_saved = UserRepository.save(user_register)
        if user_saved:
            dic_register["message"] = Constants.REGISTRATION_SUCCESS
            dic_register["code"] = Constants.SUCCES_CODE
            dic_register["user"] = user_register.serialize()
        return dic_register
