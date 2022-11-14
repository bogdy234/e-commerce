import os
import psycopg2
import psycopg2.extras

from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())
class DbHandle:

    def __init__(self):
        self.connection = psycopg2.connect(
            host=os.environ.get("HOST_NAME"),
            database=os.environ.get("DB_NAME"),
            user=os.environ.get("USER_NAME"),
            password=os.environ.get("PASSWORD"),
            port = os.environ.get("PORT")
        )
        self.cursor = self.connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor)

    def get_cursor(self):
        return self.cursor

    def do_commit(self):
        self.connection.commit()

    def close_cursor(self):
        self.cursor.close()