from application import db
from models.Products import Product
from datetime import datetime


class Favourites(db.Model):
    __tablename__ = "favourites_prods"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.cid"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.pid"), nullable=False)
    products = db.relationship(Product, backref="favourites_prods")
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    def __init__(self, user_id, product_id) -> None:
        self.user_id = user_id
        self.product_id = product_id

    def __str__(self) -> str:
        return (
            f"Id: {self.id} / User id: {self.user_id} / Product_id : {self.product_id}"
        )

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
        return {"id": self.id, "product": self.products.serialize()}
