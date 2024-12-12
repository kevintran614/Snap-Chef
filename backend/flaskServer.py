from flask import Flask, request, jsonify
from flask_cors import CORS

import generateRecipe as gr
import computerVision as cv

from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route('/health-check', methods=['GET'])
def health_check():
    return {"msg": "good"}, 200

@app.route('/generate-ingredients-from-image', methods=['POST'])
def generate_ingredients_from_image():
    ner = cv.ComputerVision()
    uploaded_image = request.files["image"]
    image = Image.open(uploaded_image)
    detected_objects = ner.detr(image)
    detected_ingredients = ner.ner(detected_objects)

    return jsonify({'detected_ingredients': detected_ingredients})

@app.route('/generate-recipe-from-text', methods=['POST'])
def generate_recipe_from_text():
    detr = gr.GenerateRecipe()
    data = request.get_json()
    ingredients = data.get('ingredients', '')
    generatedRecipe = detr.generation_function(ingredients)

    return jsonify({'recipes': generatedRecipe})

if __name__ == "__main__":
    app.run(debug=True)