from application import db
from models.User import User


class Comments(db.Model):

    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.cid"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.pid"))
    user = db.relationship(User, backref="request")
    title = db.Column(db.String(256), nullable=False)
    description = db.Column(db.String(4096), nullable=False)
    rating = db.Column(db.Numeric())

    def __init__(self, user_id, product_id, title, description, rating) -> None:
        self.user_id = user_id
        self.product_id = product_id
        self.title = title
        self.description = description
        self.rating = rating

    def __repr__(self) -> str:
        return f"Comment id: {self.id}/ Prod_name: {self.title}"

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
            "comment_id": self.id,
            "user": self.user.serialize_without_address(),
            "product_id": self.product_id,
            "title": self.title,
            "description": self.description,
            "rating": int(self.rating),
        }
