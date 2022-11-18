import bcrypt

from libs.CCommonFunctions import CCommonFunctions
from libs.constants import Constants
from libs.JwtHandler import JwtHandler
from libs.LogHandler import LogHandler
from models.User import User


class LoginController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("register_controller.log")

    def get_user_by_email(self, email):
        return User.query.filter_by(email=email).first()

    def login(self, email, password, expiration=None):
        dict_login = {
            "message": "",
            "code": Constants.NO_CONTENT,
            "user": None,
            "token": None,
        }
        user = self.get_user_by_email(email)
        if not user:
            dict_login["message"] = Constants.USER_NOT_FOUND
            dict_login["code"] = Constants.BAD_REQUEST
            return dict_login
        check_correct_password = bcrypt.checkpw(
            password.encode("utf-8"), user.password.encode("utf-8")
        )
        if not check_correct_password:
            dict_login["message"] = Constants.INVALID_PASSWORD
            dict_login["code"] = Constants.BAD_REQUEST
            return dict_login
        if expiration:
            encoded_token = JwtHandler.encode(
                email=user.email, cid=user.cid, no_expiration=True
            )
        else:
            encoded_token = JwtHandler.encode(
                email=user.email, cid=user.cid, no_expiration=False
            )
        if encoded_token:
            dict_login["message"] = Constants.LOGIN_SUCCESS
            dict_login["code"] = Constants.SUCCES_CODE
            dict_login["user"] = user.serialize()
            dict_login["token"] = encoded_token
        return dict_login
