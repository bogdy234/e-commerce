from flask import Flask

app = Flask(__name__)

SECRET_KEY = "fkjfsdlkhjsdkanhfasnhljfa"

app.secret_key = SECRET_KEY

from view.login_view import login