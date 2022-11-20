import enum


class Constants:
    DEFAULT_REGISTER_MESSAGE = "Error on register. Please try again!"
    DUPLICATE_EMAIL_REGISTER = (
        "This email it's already used. Please try again with anothe email!"
    )
    PASSWORD_NOT_MATCH = "Password must be the same as confirm password!"
    SUCCES_CODE = 200
    NOT_FOUND_CODE = 404
    CONFLICT_CODE = 409
    NO_CONTENT = 204
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    UNAUTHORIZED_MESSAGE = "Auth required! Please log in!"
    REGISTRATION_SUCCESS = "Your account was created!"
    DEFAULT_R0MANIA_VAT = 19
    DEFUALT_USER_GROUP = 1  # BASIC_USER
    INVALID_EMAIL_PATTERN = "Please use a valid email address!"
    USER_NOT_FOUND = "Password or email wrong! Please try again!"
    INVALID_JWT_TOKEN = "The JWT token it's invalid!"
    EXPIRED_JWT_TOKEN = "The JWT token has expired!"
    VALID_JWT_TOKEN = "Valid token!"
    INVALID_PASSWORD = "Invalid password. Please try again!"
    LOGIN_SUCCESS = "Log in success!"
    BAD_REQUEST_MESSAGE = "Bad request, missing params: {}"


class Category(enum.Enum):

    ELECTRONICS = "electronics"
    GAMING = "gaming"
    FASHION = "fashion"


class Title(enum.Enum):

    MR = "MR"
    MS = "MS"
