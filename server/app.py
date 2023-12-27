from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from PIL import Image
import requests
from transformers import CLIPProcessor, CLIPModel
from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
CORS(app)

# Initialize CLIP model
model = CLIPModel.from_pretrained("openai/clip-vit-large-patch14")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-large-patch14")

# Initialize Firebase Admin SDK
cred = credentials.Certificate("tree-hops-firebase-adminsdk-v8ors-003ce7b52a.json")
initialize_app(cred)

db = firestore.client()

# Flask route to check if the image is a plant
@app.route('/is_plant', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type'])
def is_plant():
    try:
        # Get the image URL from the request
        data = request.get_json()
        url = data['url']

        # Load the image
        image = Image.open(requests.get(url, stream=True).raw)

        # Process the image and text with CLIP
        inputs = processor(text=["This is a photo of a living plant, showing characteristics like leaves, stems, or flowers commonly found in botanical subjects.", "his photo does not depict a plant but may include objects, animals, landscapes, or people that are clearly distinguishable from botanical subjects."], images=image, return_tensors="pt", padding=True)
        outputs = model(**inputs)

       # Compute probabilities
        logits_per_image = outputs.logits_per_image
        probs = logits_per_image.softmax(dim=1)

        # Determine if it's a plant and convert the result to a Python boolean
        is_plant = probs[0][0].item() > probs[0][1].item()

        # Return the result
        return jsonify({'is_plant': is_plant})
    except Exception as e:
        return jsonify({'error': str(e)})

# Main route
@app.route('/')
def index():
    return "Welcome to Tree Hops!"

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)