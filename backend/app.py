from application import app, db
from libs.CCommonFunctions import CCommonFunctions

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        CCommonFunctions.add_default_roles()
    app.run(debug=True, host="0.0.0.0")
