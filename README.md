# Snap-Chef

Welcome to Snap-Chef! This is a full-stack machine learning application utilizing React, Bootstrap, Node,js, PostgreSQL, and AWS S3 Bucket that leverages Hugging Face's computer vision and named entity recognition models to identify ingredients from user-uploaded images or text and generate recipes with detailed instructions. Have groceries in your refrigerator or pantry and don't know what to make with them? Snap-Chef is the answer!

1. Image Demo:
<ul>
  <li>
    <img src="images/home.png" alt="Home Page" />
    <p>Home Page</p>
  </li>
  <li>
    <img src="images/search.png" alt="Search Page" />
    <p>Search Recipes from Text</p>
  </li>
  <li>
    <img src="images/recipe_1.png" alt="Profile Page" />
    <p>Generated Recipes from Text</p>
  </li>
  <li>
    <img src="images/image_search.png" alt="Search Page" />
    <p>Search Recipes from Image</p>
  </li>
  <li>
    <img src="images/image_recipe.png" alt="Profile Page" />
    <p>Generated Recipes from Image</p>
  </li>
  <li>
    <img src="images/recipe_2.png" alt="Profile Page" />
    <p>Additional Example Output</p>
  </li>
</ul>

2. Download dependencies first:<br>

   - cd backend<br>
   - pip3 install flask flask-cors (python backend)<br>
   - pip3 install flax transformers torch torchvision (python backend)<br>

   <br>

   - npm init -y (express backend)<br>
   - npm i express axios cors pg multer form-data (express backend)<br>
   - npm install --save-dev nodemon (express backend)<br>

   <br>

   - cd frontend<br>
   - npm install react-bootstrap bootstrap react-router-dom<br>

3. To run the server:<br>
   - cd backend > python3 flaskSever.py<br>
   - cd backend > npm run dev<br>
