from application import db


class Role(db.Model):
    __tablename__ = "roles"
    rid = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(50), nullable=False)

    def __init__(self, role_name) -> None:
        self.role_name = role_name

    def __repr__(self) -> str:
        return f"Role : {self.rid} / {self.role_name}"

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
            "rid": self.rid,
            "role_name": self.role_name,
        }
