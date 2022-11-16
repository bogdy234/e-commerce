import os

from dotenv import find_dotenv, load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

load_dotenv(find_dotenv())

app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY")

# our database uri
host = os.environ.get("HOST_NAME")
database = os.environ.get("DB_NAME")
user = os.environ.get("USER_NAME")
password = os.environ.get("PASSWORD")
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"postgresql://{user}:{password}@{host}/{database}"
db = SQLAlchemy(app)

from models.Role import Role
# Models
from models.User import User
# Views
from view.users.login_view import login
from view.users.register_view import register
