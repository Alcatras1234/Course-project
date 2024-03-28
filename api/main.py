import marshmallow
from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import MySQLdb
from sqlalchemy import text


app = Flask(__name__)
api = Api()
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root_CP:root_CP@localhost/flask_for_cp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
app.app_context().push()
ma = Marshmallow(app)

class Articles(db.Model):
    user_id = db.Column(db.Text())
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text())

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'name')
article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route("/api/checkId/<uuid:user_id>", methods=['GET'])
def check_user(user_id):
    user = Articles.query.filter_by(user_id=str(user_id)).first()
    if user is None:
        return 'не нашел', 404
    else:
        return 'нашел', 200

@app.route("/api/get", methods=['GET'])
def get_data():
    all_article = Articles.query.all()
    results = articles_schema.dump(all_article)
    return jsonify(results)

@app.route('/api/get/<uuid:user_id>', methods=['GET'])
def data_id(usr_id):
    article = Articles.query.filter_by(user_id=str(usr_id)).first()

    if article is None:
        return jsonify({'message': 'Article not found'}), 404

    results = articles_schema.dump(article)
    return jsonify(results)

@cross_origin()
@app.route("/api/add/<uuid:user_id>", methods=['POST'])
def add_article(user_id):
    user = Articles.query.filter_by(user_id=str(user_id)).first()
    if user is None:
        usr_id = request.json['user_id']
        name = request.json['name']


        articles = Articles(name, usr_id)
        db.session.add(articles)
        db.session.commit()
        return article_schema.jsonify(articles), 200
    else:
        return 'Уже есть такой пользователь', 200


@app.route('/api/update/<uuid:user_id>', methods=['PUT'])
def update_article(user_id):
    article = Articles.query.filter_by(user_id=str(user_id)).first()

    if article is None:
        return jsonify({'message': 'Article not found'}), 404

    name = request.json.get('name')
    userid = request.json.get('user_id')

    if name is not None:
        article.name = name
    if userid is not None:
        article.user_id = userid

    db.session.commit()

    return article_schema.jsonify(article)

if __name__ == "__main__":
    app.run(debug=True, port=3001, host="localhost")  # ошибки и все такое будет в терминале
