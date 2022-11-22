import os

from dotenv import find_dotenv, load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

load_dotenv(find_dotenv())

app = Flask(__name__)
CORS(app)
SECRET_KEY = os.environ.get("SECRET_KEY")
app.secret_key = SECRET_KEY

# our database uri
host = os.environ.get("HOST_NAME")
database = os.environ.get("DB_NAME")
user = os.environ.get("USER_NAME")
password = os.environ.get("PASSWORD")
production = True if os.environ.get("PRODUCTION") == "True" else False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"postgresql://{user}:{password}@{host}/{database}"
db = SQLAlchemy(app)


# Models
from models.User import User
from models.Role import Role
from models.Products import Product
from models.Comments import Comments

# Views
from view.users.login_view import login
from view.users.register_view import register
from view.users.users_info import user_me, set_admin, set_user
from view.products.get_products import get_products, get_product_by_id
from view.products.add_products import add_product
from view.products.update_products import update_product
from view.products.fav_prods import favourite_prod
from view.users.logout_view import logout
from view.products.comments import (
    get_comments_by_product_id,
    comments_handle,
    get_user_comments,
)
