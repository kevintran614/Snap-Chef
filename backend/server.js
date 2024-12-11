const express = require("express");
const app = express();
const cors = require("cors");
// const { api_key } = require("./config.js");
// const pool = require("./db");

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

    res.status(200).json(generatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Could not reach Python Server" });
  }
});

app.listen(port, () => {
  console.log(`Express Server listening on Port ${port}`);
});
