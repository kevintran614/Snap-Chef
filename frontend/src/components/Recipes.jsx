import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();

  const generatedRecipes = JSON.parse(sessionStorage.getItem("recipes"));
  const ingredients = generatedRecipes.ingredients;
  const recipes = generatedRecipes.recipesmetadata.recipes; // This should be an array of recipes

  console.log("Ingredients:", ingredients);
  console.log("Recipes:", recipes);

  return (
    <div className="App">
      <Card border="primary" className="text-center">
        <Card.Img src="https://img.freepik.com/free-vector/watercolor-international-chefs-day-illustration_23-2149670979.jpg?t=st=1734302447~exp=1734306047~hmac=1c1134d3dff562b3237033c65922407dc3b6afbeacb328fd92f5eb830fe81ca8&w=740"></Card.Img>
        <Card.Header>Snap Chef has generated your recipes!</Card.Header>
        <Card.Body>
          <Card.Title>Generated Recipes</Card.Title>
          <Card.Text>Here are your generated recipes:</Card.Text>

          {recipes.map((recipe, index) => (
            <>
              <Card border="primary" className="text-center" key={index}>
                <Card.Header>Recipe #{index + 1}</Card.Header>
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>
                    Ingredients: {recipe.ingredients.join(", ")}
                  </Card.Text>
                  <Card.Text>{recipe.directions.join(", ")}</Card.Text>
                </Card.Body>
              </Card>
              <br />
            </>
          ))}

          <br />

          <Button onClick={() => navigate("/")}>Generate New Recipes</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Recipes;
