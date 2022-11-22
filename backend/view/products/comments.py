from application import app
from flask import jsonify, request
from libs.JwtHandler import check_auth
from models.Comments import Comments
from libs.constants import Constants
from controller.products.CommentsController import CommentsController


@app.route("/api/products/comments/<int:product_id>", methods=["GET"])
def get_comments_by_product_id(product_id):
    return jsonify(
        [
            comment.serialize()
            for comment in Comments.query.filter_by(product_id=product_id)
        ]
    )


@app.route("/api/products/comments", methods=["POST", "PUT", "DELETE"])
@check_auth()
def comments_handle(user):
    if request.method == "POST":
        product_id = request.json.get("product_id")
        title = request.json.get("title")
        rating = request.json.get("rating")
        description = request.json.get("description")
        data_comment = CommentsController().add_comment(
            user_id=user.cid,
            product_id=product_id,
            title=title,
            rating=rating,
            description=description,
        )
        return jsonify(data_comment), data_comment.get("code", 500)
    if request.method == "PUT":
        pass
    if request.method == "DELETE":
        if user.role_id == Constants.ADMIN_ROLE:
            # Can delete all the comments
            pass
        # Start delete only for your comment
        pass
