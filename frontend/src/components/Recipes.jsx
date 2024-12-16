import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();

  const generatedRecipes = JSON.parse(sessionStorage.getItem("recipes"));
  const recipes = generatedRecipes.recipesmetadata.recipes;

  const capitalizeTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="App">
      <Card border="primary" className="text-center">
        <Card.Img src="https://img.freepik.com/free-vector/watercolor-international-chefs-day-illustration_23-2149670979.jpg?t=st=1734302447~exp=1734306047~hmac=1c1134d3dff562b3237033c65922407dc3b6afbeacb328fd92f5eb830fe81ca8&w=740"></Card.Img>
        <Card.Header>Snap Chef has generated your recipes!</Card.Header>
        <Card.Body>
          <Card.Title>Generated Recipes</Card.Title>
          <Card.Text>Here are your generated recipes:</Card.Text>

          {recipes.map((recipe, index) => (
            <div key={index}>
              <Card border="primary" className="text-center recipe-card">
                <Card.Header>{`Recipe #${index + 1}: ${capitalizeTitle(
                  recipe.title
                )}`}</Card.Header>
                <Card.Body>
                  <Card.Title>{capitalizeTitle(recipe.title)}</Card.Title>

                  <Card.Text>
                    Ingredients: {recipe.ingredients.join(", ")}
                  </Card.Text>

                  <Card.Text>
                    <ul style={{ paddingLeft: "20px", textAlign: "left" }}>
                      {recipe.directions.map((direction, idx) => (
                        <li key={idx}>{`${idx + 1}. ${direction}`}</li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>
          ))}

          <br />

          <Button onClick={() => navigate("/")}>Generate New Recipes</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Recipes;
