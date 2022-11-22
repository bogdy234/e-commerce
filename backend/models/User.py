from datetime import datetime

from application import db
from models.Role import Role
from models.Address import Address


class User(db.Model):
    __tablename__ = "users"
    cid = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(256), nullable=False)
    last_name = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(256), unique=True)
    role = db.relationship(Role, backref="request")
    role_id = db.Column(db.Integer, db.ForeignKey("roles.rid"))
    address = db.relationship(Address, backref="request", cascade="all, delete")
    password = db.Column(db.String(512), nullable=False)
    registered_date = db.Column(db.DateTime, default=datetime.now())
    vat = db.Column(db.Numeric, default=19)

    def __init__(self, first_name, last_name, email, role_id, password, vat) -> None:
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.role_id = role_id
        self.password = password
        self.vat = vat

    def __repr__(self) -> str:
        return f"User : {self.cid} / {self.email}"

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except:
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except:
            return False

    def serialize(self):
        return {
            "cid": self.cid,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "address": [address.serialize() for address in self.address],
            "role": self.role.serialize(),
            "registered_date": self.registered_date,
            "vat": self.vat,
        }

    def serialize_without_address(self):
        return {
            "cid": self.cid,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "role": self.role.serialize(),
            "registered_date": self.registered_date,
            "vat": self.vat,
        }
