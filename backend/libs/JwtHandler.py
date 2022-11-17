import jwt
from application import SECRET_KEY
from datetime import datetime, timedelta, timezone
from libs.constants import Constants


class JwtHandler:

    def __init__(self) -> None:
        pass

    @staticmethod
    def encode(**kwargs):
        if kwargs['no_expiration']:
            kwargs['expiration'] = datetime.timestamp(datetime.now(tz=timezone.utc) + timedelta(hours=10e4))
        else:
            kwargs['expiration'] = datetime.timestamp(datetime.now(tz=timezone.utc) + timedelta(minutes=30))
        return jwt.encode(kwargs, SECRET_KEY, algorithm="HS256")

    @staticmethod
    def decode(token):
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

    @staticmethod
    def check_valability(token) -> bool:
        decoded_token = JwtHandler.decode(token=token)
        if not decoded_token['expiration']:
            return Constants.INVALID_JWT_TOKEN,False
        if decoded_token['expiration'] < datetime.timestamp(datetime.now()):
            return Constants.EXPIRED_JWT_TOKEN,False
        return Constants.VALID_JWT_TOKEN,True