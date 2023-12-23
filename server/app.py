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

@app.route('/api/users', methods=['POST'])
def create_user():
    """
    Create a new user in Firestore
    """
    try:
        user_id = request.json.get('id', str(uuid.uuid4()))  # Generate a unique ID if not provided
        user_data = request.json['data']
        db.collection('users').document(user_id).set(user_data)
        return jsonify({"success": True, "user_id": user_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/plants', methods=['POST'])
def upload_plant():
    """
    Endpoint for uploading plant information
    """
    try:
        user_id = request.json['user_id']
        plant_data = request.json['data']
        plant_id = str(uuid.uuid4())  # Generate a unique plant ID
        db.collection('plants').document(plant_id).set(plant_data)
        db.collection('users').document(user_id).update({"plants": firestore.ArrayUnion([plant_id])})
        # Update global progress here (not implemented)
        return jsonify({"success": True, "plant_id": plant_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

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

@app.route('/api/progress', methods=['GET'])
def check_progress():
    """
    Endpoint for checking user and global progress
    """
    try:
        user_id = request.args.get('user_id')
        user_data = db.collection('users').document(user_id).get()
        global_progress = db.collection('globalProgress').document('progress').get()
        return jsonify({"user_progress": user_data.to_dict(), "global_progress": global_progress.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
