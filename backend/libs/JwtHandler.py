from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
import json
import os
from flask import jsonify, request

from application import SECRET_KEY
from libs.constants import Constants
from models.User import User


def check_auth(admin=False):
    @wraps(admin)
    def check_auth_function(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            auth_token = request.headers.get("Authorization")
            if auth_token:
                auth_token = auth_token.split("Bearer")[1].strip()
                if JwtHandler.get_blacklist_token(auth_token):
                    return (
                        {
                            "message": Constants.BLACKLIST_TOKEN,
                            "code": Constants.UNAUTHORIZED,
                        }
                    ), Constants.UNAUTHORIZED
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

    @staticmethod
    def create_blacklist_file():
        if not os.path.exists(Constants.BLACKLIST_TOKEN_FILE):
            with open(Constants.BLACKLIST_TOKEN_FILE, "wt") as file:
                file.write("{}")

    @staticmethod
    def get_all_blacklist_tokens():
        JwtHandler.create_blacklist_file()
        with open(Constants.BLACKLIST_TOKEN_FILE) as blacklist_file:
            return json.load(blacklist_file)

    @staticmethod
    def get_blacklist_token(token):
        JwtHandler.create_blacklist_file()
        with open(Constants.BLACKLIST_TOKEN_FILE) as blacklist_file:
            tokens_blacklist = json.load(blacklist_file)
            return tokens_blacklist.get(token, False)

    @staticmethod
    def add_token_to_blacklist(token):
        tokens_blacklist = JwtHandler.get_all_blacklist_tokens()
        with open(Constants.BLACKLIST_TOKEN_FILE, "wt") as blacklist_file:
            tokens_blacklist[token] = "True"
            blacklist_file.write(json.dumps(tokens_blacklist))
        return {"message": Constants.LOGOUT_SUCCESS, "code": Constants.SUCCES_CODE}
