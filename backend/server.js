const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// port
const port = 5001;

// middleware
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

app.post("/generate-recipe", async (req, res) => {
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

    const url = "http://127.0.0.1:5000/generate-recipe";

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
