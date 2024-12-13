const express = require("express");
const multer = require("multer");
const FormData = require("form-data");
const cors = require("cors");
const pool = require("./db");

// port
const port = 5001;

// middleware
const app = express();
const upload = multer();
app.use(express.json());
app.use(cors());

// routes
app.get("/health-check", async (req, res) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "error hitting route" });
  }
});

app.post(
  "/generate-recipe-from-image",
  upload.single("image"),
  async (req, res) => {
    try {
      const image = req.file;

      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      console.log("Image Details: ", {
        filename: image.originalname,
        mimetype: image.mimetype,
        size: image.size,
      });

      const form = new FormData();
      form.append("image", image.buffer, {
        filename: image.originalname,
        contentType: image.mimetype,
      });

      const get_ingredients_url =
        "http://127.0.0.1:5000/generate-ingredients-from-image";

      const get_ingredients_response = await fetch(get_ingredients_url, {
        method: "POST",
        body: form,
        headers: form.getHeaders(),
      });

      console.log("here1");
      const detectedIngredients = await get_ingredients_response.json();
      console.log("here2");

      // const get_recipes_url = "http://localhost:5001/generate-recipe-from-text";

      // const get_recipes_response = await fetch(get_recipes_url, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     ingredients: detectedIngredients,
      //   }),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8",
      //   },
      // });

      // recipes = await get_recipes_response.json();
      res.status(200).json("yes");
    } catch (error) {
      res.status(500).json({ error: "Error generating recipes for image" });
    }
  }
);

app.post("/generate-recipe-from-text", async (req, res) => {
  try {
    const { ingredients } = req.body;

    const queryStartTime = Date.now();

    const checkIngredients = await pool.query(
      "SELECT * FROM recipes WHERE ingredients = ($1)",
      [ingredients]
    );

    if (checkIngredients.rows.length > 0) {
      const queryEndTime = Date.now();
      console.log(`(Caching) query took ${queryEndTime - queryStartTime}ms`);
      return res.status(200).json(checkIngredients.rows[0]);
    }

    const url = "http://127.0.0.1:5000/generate-recipe-from-text";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredients,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const generatedRecipe = await response.json();

    const insertGeneratedRecipe = await pool.query(
      "INSERT INTO recipes (ingredients, recipesMetadata) VALUES($1, $2) RETURNING *",
      [ingredients, generatedRecipe]
    );

    const queryEndTime = Date.now();
    console.log(`(Non-caching) query took ${queryEndTime - queryStartTime}ms`);

    res.status(200).json(insertGeneratedRecipe.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not reach Python Server" });
  }
});

app.listen(port, () => {
  console.log(`Express Server listening on Port ${port}`);
});
