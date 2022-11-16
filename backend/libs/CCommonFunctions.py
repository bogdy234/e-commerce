import re

from models.Role import Role


class CCommonFunctions:
    @staticmethod
    def validate_password(password : str) -> tuple:
        if len(password) < 8:
            return "Password length must be greater than 8", False
        elif len(password) > 18:
            return "Password length must be less than 18", False
        elif re.search("[0-9]", password) is None:
            return "Password must contain a number", False
        elif re.search("[A-Z]", password) is None:
            return "Password must contain a capital letter", False
        elif re.search("[a-z]", password) is None:
            return "Password must contain a lower letter", False
        else:
            return "Password is valid", True

    @staticmethod
    def add_default_roles() -> None:

        BASIC_USER = Role("BASIC_USER")
        ADMIN = Role("ADMIN")
        if (
            not Role.query.filter_by(role_name="BASIC_USER").first()
            and not Role.query.filter_by(role_name="BASIC_USER").first()
        ):
            BASIC_USER.save()
            ADMIN.save()

    @staticmethod
    def check_valid_email(email_address):
        regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
        return re.fullmatch(regex, email_address)
