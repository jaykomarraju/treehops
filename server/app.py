from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import uuid

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("tree-hops-firebase-adminsdk-v8ors-003ce7b52a.json")
initialize_app(cred)

db = firestore.client()

# Flask routes
@app.route('/')
def index():
    return "Welcome to Tree Hops!"

@app.route('/api/nominations', methods=['POST'])
def send_nomination():
    """
    Endpoint for sending a nomination
    """
    try:
        nomination_data = request.json['data']
        db.collection('nominations').add(nomination_data)
        # Send email/notification to the nominated user (not implemented)
        return jsonify({"success": True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
