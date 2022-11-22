from application import app
from flask import jsonify, request
from libs.JwtHandler import check_auth
from libs.constants import Constants
from controller.products.CommentsController import CommentsController


@app.route("/api/products/comments/<int:product_id>", methods=["GET"])
def get_comments_by_product_id(product_id):
    data_products = CommentsController().get_comment_by_prod_id(product_id)
    return (
        jsonify(data_products),
        data_products.get("code") if type(data_products) is dict else 200,
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
        admin = True if user.role.rid == Constants.ADMIN_ROLE else False
        comment_id = request.json.get("comment_id")
        data_delete = CommentsController().delete_comment(comment_id, user.cid, admin)
        return jsonify(data_delete), data_delete.get("code", 500)
