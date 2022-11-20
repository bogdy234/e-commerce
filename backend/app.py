from application import app, db
from libs.CCommonFunctions import CCommonFunctions
import time
import traceback

if __name__ == "__main__":
    with app.app_context():
        connected_to_db = False
        while not connected_to_db:
            try:
                db.create_all()
                CCommonFunctions.add_default_roles()
                connected_to_db = True
            except:
                print(traceback.format_exc())
                print("Trying to connect to db...")
                time.sleep(0.5)

    app.run(debug=True, host="0.0.0.0")
