from libs.CCommonFunctions import CCommonFunctions
from libs.constants import Constants
from libs.constants import Category
from libs.LogHandler import LogHandler
from models.Products import Product
from decimal import Decimal


class ProductController:
    def __init__(self) -> None:
        self.log_msg = LogHandler("product_controller.log")

    def check_arguments(self, **kwargs):
        list_args = [
            kwargs.get("title"),
            kwargs.get("price"),
            kwargs.get("quantity"),
            kwargs.get("discount"),
            kwargs.get("description"),
            kwargs.get("imgUrl"),
            kwargs.get("category"),
        ]
        return all(list_args)

    def add(self, **kwargs):
        dict_products = {
            "message": Constants.DEFAULT_PRODUCT_MESSAGE,
            "code": Constants.NO_CONTENT,
            "product": None,
        }
        list_categories = [category.value for category in Category]
        valid_arguments = self.check_arguments(**kwargs)
        if not valid_arguments:
            dict_products["message"] = Constants.INVALID_ARGUMENTS
            dict_products["code"] = Constants.INTERNAL_SERVER_ERROR
            return dict_products
        if kwargs.get("category") not in list_categories:
            dict_products["message"] = Constants.INVALID_CATEGORY.format(
                list_categories
            )
            dict_products["code"] = Constants.BAD_REQUEST
            return dict_products
        if kwargs.get("discount") > Decimal(100):
            dict_products["message"] = Constants.INVALID_DISCOUNT
            dict_products["code"] = Constants.BAD_REQUEST
            return dict_products
        product = Product(
            kwargs.get("title"),
            kwargs.get("price"),
            kwargs.get("quantity"),
            kwargs.get("discount"),
            kwargs.get("description"),
            kwargs.get("imgUrl"),
            kwargs.get("category").upper(),
        )
        data_saved = product.save()
        if data_saved:
            dict_products["message"] = Constants.SUCCES_PRODUCT
            dict_products["code"] = Constants.SUCCES_CODE
            dict_products["product"] = product.serialize()
            return dict_products
        return dict_products

    def update(self, **kwargs):
        dict_products = {
            "message": Constants.DEFAULT_PRODUCT_MESSAGE,
            "code": Constants.NO_CONTENT,
            "product": None,
        }
        list_categories = [category.value for category in Category]
        product = Product.query.get(kwargs.get("product_id"))
        if not product:
            dict_products["message"] = Constants.PRODUCT_NOT_FOUND
            dict_products["code"] = Constants.NOT_FOUND_CODE
            return dict_products
        if kwargs.get("title"):
            product.title = kwargs.get("title")
        if kwargs.get("price"):
            product.price = kwargs.get("price")
        if kwargs.get("quantity"):
            product.quantity = kwargs.get("quantity")
        if kwargs.get("discount"):
            if kwargs.get("discount") > Decimal(100):
                dict_products["message"] = Constants.INVALID_DISCOUNT
                dict_products["code"] = Constants.BAD_REQUEST
                return dict_products
            product.discount = kwargs.get("discount")
        if kwargs.get("description"):
            product.description = kwargs.get("description")
        if kwargs.get("imgUrl"):
            product.imgUrl = kwargs.get("imgUrl")
        if kwargs.get("category"):
            if kwargs.get("category") not in list_categories:
                dict_products["message"] = Constants.INVALID_CATEGORY.format(
                    list_categories
                )
                dict_products["code"] = Constants.BAD_REQUEST
                return dict_products
            product.category = kwargs.get("category").upper()
        data_saved = product.save()
        if data_saved:
            dict_products["message"] = Constants.PRODUCT_UPDATED
            dict_products["code"] = Constants.SUCCES_CODE
            dict_products["product"] = product.serialize()
            return dict_products
        return dict_products