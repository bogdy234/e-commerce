from application import db
from libs.constants import Title


class Address(db.Model):
    __tablename__ = "address"
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(20))
    birth_date = db.Column(db.Date)
    city = db.Column(db.String(128))
    county = db.Column(db.String(128))
    full_address = db.Column(db.String(1024))
    title = db.Column(db.Enum(Title))
    country = db.Column(db.String(128))
    postalcode = db.Column(db.String(16))
    user_id = db.Column(db.Integer, db.ForeignKey("users.cid"), unique=True)

    def __init__(
        self,
        user_id,
        phone_number=None,
        birth_date=None,
        city=None,
        county=None,
        full_address=None,
        title=None,
        country=None,
        postalcode=None,
    ) -> None:
        self.user_id = user_id
        self.phone_number = phone_number
        self.birth_date = birth_date
        self.city = city
        self.county = county
        self.full_address = full_address
        self.title = title
        self.country = country
        self.postalcode = postalcode

    def __str__(self) -> str:
        return f"User id: {self.user_id}/ id = {self.id}"

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
            "address_id": self.id,
            "phone_number": self.phone_number,
            "birth_date": self.birth_date,
            "city": self.city,
            "county": self.county,
            "full_address": self.full_address,
            "title": self.title.value if self.title else None,
            "country": self.country,
            "postalcode": self.postalcode,
        }
