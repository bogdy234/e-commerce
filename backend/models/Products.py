from application import db
from libs.constants import Category
from models.Comments import Comments
from decimal import Decimal


class Product(db.Model):
    __tablename__ = "products"
    pid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Numeric(), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    discount = db.Column(db.Numeric(), nullable=False)
    description = db.Column(db.String(4096), nullable=False)
    imgUrl = db.Column(db.String(256), nullable=False)
    comments = db.relationship(Comments, backref="request", cascade="all, delete")
    category = db.Column(db.Enum(Category, nullable=False))

    def __init__(
        self, title, price, quantity, discount, description, imgUrl, category
    ) -> None:
        self.title = title
        self.price = price
        self.quantity = quantity
        self.discount = discount
        self.description = description
        self.imgUrl = imgUrl
        self.category = category

    def __repr__(self) -> str:
        return f"Prod id: {self.pid}/ Prod_name: {self.title}"

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except:
            import traceback

            print(traceback.format_exc())
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except:
            return False

    def calculate_discount_price(self, actual_price, discount):
        return (
            actual_price
            - round(Decimal(float((discount / 100)) * float(actual_price)), 2)
            if discount > 0
            else actual_price
        )

    def serialize(self):
        return {
            "pid": self.pid,
            "title": self.title,
            "price": self.price,
            "price_with_discount": self.calculate_discount_price(
                self.price, self.discount
            ),
            "quantity": self.quantity,
            "discount": self.discount,
            "description": self.description,
            "imgUrl": self.imgUrl,
            "category": self.category.value,
            "comments": [comment.serialize() for comment in self.comments],
        }
