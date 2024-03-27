from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

app = Flask(__name__)
api = Api()
CORS(app)


courses = {"name": "Player1"}

dataPlayers = {
        "name": "Player"
    }


@app.route("/api/data", methods=['GET'])
def get_data():
    return jsonify(dataPlayers)

# @app.route('/api/post_username/<str>', methods=['POST'])
# def post_username():
#     parser = reqparse.RequestParser()
#     parser.add_argument("name", type=str)
#     courses["name"] = parser.parse_args()
#     return jsonify(courses)

if __name__ == "__main__":
    app.run(debug=True, port=3001, host="localhost")  # ошибки и все такое будет в терминале
