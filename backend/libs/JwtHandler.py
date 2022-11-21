from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from flask import jsonify, request

from application import SECRET_KEY
from libs.constants import Constants
from models.User import User


def check_auth(func=None, admin=False):
    @wraps(func)
    def check_auth_function(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            auth_token = request.headers.get("Authorization")
            if auth_token:
                auth_token = auth_token.split("Bearer")[1].strip()
                token_valability, token_status = JwtHandler.check_valability(auth_token)
                if not token_status:
                    return (
                        jsonify(
                            {"message": token_valability, "code": Constants.BAD_REQUEST}
                        ),
                        Constants.BAD_REQUEST,
                    )
                decoded_token = JwtHandler.decode(auth_token)
                user = User.query.get(decoded_token.get("cid"))
                if user:
                    if admin:
                        if user.role.rid != Constants.ADMIN_ROLE:
                            return (
                                jsonify(
                                    {
                                        "message": Constants.REQUIRED_ADMIN_ROLE,
                                        "code": Constants.UNAUTHORIZED,
                                    }
                                ),
                                Constants.UNAUTHORIZED,
                            )
                    return function(user, *args, **kwargs)
                return {
                    jsonify(
                        {
                            "message": Constants.USER_NOT_FOUND,
                            "code": Constants.NOT_FOUND_CODE,
                        }
                    ),
                    Constants.NOT_FOUND_CODE,
                }
            else:
                return (
                    jsonify(
                        {
                            "message": Constants.UNAUTHORIZED_MESSAGE,
                            "code": Constants.UNAUTHORIZED,
                        }
                    ),
                    Constants.UNAUTHORIZED,
                )

        return wrapper

    return check_auth_function


class JwtHandler:
    def __init__(self) -> None:
        pass

    @staticmethod
    def encode(**kwargs):
        if kwargs["no_expiration"]:
            kwargs["expiration"] = datetime.timestamp(
                datetime.now(tz=timezone.utc) + timedelta(hours=10e4)
            )
        else:
            kwargs["expiration"] = datetime.timestamp(
                datetime.now(tz=timezone.utc) + timedelta(seconds=45)
            )
        return jwt.encode(kwargs, SECRET_KEY, algorithm="HS256")

    @staticmethod
    def decode(token):
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

    @staticmethod
    def check_valability(token) -> bool:
        try:
            decoded_token = JwtHandler.decode(token=token)
        except:
            return Constants.INVALID_JWT_TOKEN, False
        if not decoded_token["expiration"]:
            return Constants.INVALID_JWT_TOKEN, False
        if decoded_token["expiration"] < datetime.timestamp(datetime.now()):
            return Constants.EXPIRED_JWT_TOKEN, False
        return Constants.VALID_JWT_TOKEN, True
