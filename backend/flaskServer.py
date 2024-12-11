from flask import Flask, request, jsonify
from flask_cors import CORS

import generateRecipe as gr

app = Flask(__name__)
CORS(app)

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    model = gr.GenerateRecipe()
    data = request.get_json()
    ingredients = data.get('ingredients', '')
    recipe = model.generation_function(ingredients)
    model.print_recipe()

    return jsonify({'recipe': recipe})


if __name__ == "__main__":
    app.run(debug=True)