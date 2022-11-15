from application.app import db

class Users(db.Model):
    __tablename__ = "users"
    cid = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(256), nullable=False)
    last_name = db.Column(db.String(256), nullable=False)

    def __init__(self,first_name,last_name) -> None:
        self.first_name = first_name
        self.last_name = last_name
    
    def __repr__(self) -> str:
        return f"User : {self.cid} / {self.first_name}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            "cid" : self.cid,
            "first_name" : self.first_name,
            "last_name" : self.last_name
        }