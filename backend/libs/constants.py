import enum


class Constants:
    DEFAULT_REGISTER_MESSAGE = "Error on register. Please try again!"
    DEFAULT_PRODUCT_MESSAGE = "Error on adding new product. Please try again!"
    DEFAULT_FAVOURITE_PRODUCT = (
        "Error on adding the product to favourite. Please try again!"
    )
    DEFAULT_ADD_COMMENT_PRODUCT = (
        "Error on adding comment to product. Please try again!"
    )
    DEFAULT_DELETE_COMMENT_PRODUCT = (
        "Error on delete comment to product. Please try again!"
    )
    DEFAULT_DELETE_FAVOURITE_PRODUCT = (
        "Error on delete the product from favourite! Please try again!"
    )
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
    INTERNAL_SERVER_ERROR = 500
    UNAUTHORIZED_MESSAGE = "Auth required! Please log in!"
    REGISTRATION_SUCCESS = "Your account was created!"
    USER_NOT_FOUND = "User not found in database!"
    DEFAULT_R0MANIA_VAT = 19
    DEFUALT_USER_GROUP = 1  # BASIC_USER
    ADMIN_ROLE = 2  # ADMIN ROLE
    INVALID_EMAIL_PATTERN = "Please use a valid email address!"
    USER_NOT_FOUND = "Password or email wrong! Please try again!"
    INVALID_JWT_TOKEN = "The JWT token it's invalid!"
    BLACKLIST_TOKEN = "Token in blacklist, please try again to log in!"
    LOGOUT_SUCCESS = "Log-out with success!"
    EXPIRED_JWT_TOKEN = "The JWT token has expired!"
    VALID_JWT_TOKEN = "Valid token!"
    INVALID_PASSWORD = "Invalid password. Please try again!"
    LOGIN_SUCCESS = "Log in success!"
    BAD_REQUEST_MESSAGE = "Bad request, missing params: {}"
    INVALID_CATEGORY = (
        "You inserted a invalid category for the product. Category must be in: {}"
    )
    INVALID_DISCOUNT = "Discount must be in interval of 0-100"
    INVALID_ARGUMENTS = "Invalid request. Missing arguments!"
    SUCCES_PRODUCT = "Product was saved in our database!"
    PRODUCT_NOT_FOUND = "Product not found in database!"
    REQUIRED_ADMIN_ROLE = "To do this action you need admin role!"
    PRODUCT_UPDATED = "Product updated successful!"
    PRODUCT_DELETED = "Product with id : {} was deleted"
    FAVOURITE_PRODUCT_ALREADY_EXIST = (
        "This product it's already in your favourite list!"
    )
    FAVOURITE_PRODUCT_SAVED = "The product was saved in favourites!"
    FAVOURITE_PRODUCT_NOT_YOURS = "This product it's not in your favourite list!"
    FAVOURITE_PRODUCT_DELETED = "Your product from favourite was deleted!"
    BLACKLIST_TOKEN_FILE = "blacklist_tokens.json"
    INVALID_COMMENT_RATING = "Rating must be in interval of 0-5"
    COMMENT_SAVED = "Commend saved to the product!"
    COMMENT_NOT_FOUND = "Comment not found in the database!"
    COMMENT_NOT_FOR_THIS_USER = "You can't handle this comment, it's not your comment!"
    COMMENT_DELETED = "Comment was deleted!"
    INVALID_QUANTITY = "Quantity must by higher than 0"
    DEFAULT_CART_MESSAGE = "Error on adding product to cart! Please try again later!"
    UPDATE_PRODUCT_QUANTITY_CART = "Quantity of the product was updated in the cart!"
    PRODUCT_NOT_IN_STOCK = "You can't order this product. It's not in stock anymore!"
    TO_MUCH_PRODUCTS = "We don't have this amount of products in stock! Please try again with a lower amount!"
    PRODUCT_ADDED_TO_CARD = "Product was added in the cart!"
    CART_ID_NOT_FOUND = "This product not found in your cart"
    PRODUCT_DELETED_FROM_CART = "Product was deleted from your cart!"


class Category(enum.Enum):

    ELECTRONICS = "electronics"
    GAMING = "gaming"
    FASHION = "fashion"


class Title(enum.Enum):

    MR = "MR"
    MS = "MS"
