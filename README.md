# Snap-Chef

Welcome to Snap-Chef! This is a full-stack application leveraging React, Bootstrap, Node,js, PostgreSQL, and AWS S3 Bucket that leverages computer vision and natural language processing to identify ingredients from user-uploaded images or text and recommend recipes with detailed instructions. Have groceries in your refrigerator or pantry and don't know what to make with them? Snap-Chef is the answer!

1. Image Demo (WIP):

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
