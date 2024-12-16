import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    if (ingredients) {
      setAlertMessage(`Generating recipes using: ${ingredients}...`);

      console.log(ingredients);

      const ingredientsPayload = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      try {
        const getRecipes = await fetch(
          "http://localhost:5001/generate-recipe-from-text",
          {
            method: "POST",
            body: JSON.stringify({
              ingredients: ingredientsPayload,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );

        const recipes = await getRecipes.json();
        console.log(`Generated recipes: ${JSON.stringify(recipes)}`);

        sessionStorage.setItem("recipes", JSON.stringify(recipes));
        navigate("/recipes");
      } catch (error) {
        console.error("Error fetching recipes from text:", error);
        setAlertMessage(
          "Failed to generate recipes from text. Please try again."
        );
      }
    } else if (image) {
      setAlertMessage("Generating recipes from the uploaded image...");

      try {
        const form = new FormData();
        form.append("image", image);

        const getRecipes = await fetch(
          "http://localhost:5001/generate-recipe-from-image",
          {
            method: "POST",
            body: form,
          }
        );

        const recipes = await getRecipes.json();
        console.log(`Generated recipes: ${JSON.stringify(recipes)}`);

        sessionStorage.setItem("recipes", JSON.stringify(recipes));
        navigate("/recipes");
      } catch (error) {
        console.error("Error fetching recipes from image:", error);
        setAlertMessage("Failed to generate recipes image. Please try again.");
      }
    } else {
      setAlertMessage("Please enter your ingredients.");
    }
  };

  return (
    <div className="App">
      <Card border="primary" className="text-center">
        <Card.Img src="https://img.freepik.com/free-vector/hand-drawn-toast-cartoon-illustration_52683-127439.jpg?t=st=1734300872~exp=1734304472~hmac=48ee466df3f29f837a710266e448c880b1b9c65c00b1b2a022204e6e2ad1d87c&w=740"></Card.Img>
        <Card.Header>Welcome to Snap Chef!</Card.Header>
        <Card.Body>
          <Card.Title>Snap Chef</Card.Title>

          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Enter your ingredients here:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />

              <br />
              <br />

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  Or, upload a picture of your refrigerator or pantry:
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <br />
              <Form.Text className="text-muted">
                Have groceries in your refrigerator or pantry and don't know
                what to make with them? Snap-Chef is the answer!{" "}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Generate Recipes
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <br />{" "}
      {alertMessage && (
        <Alert variant={alertMessage.includes("Please") ? "danger" : "info"}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default Home;
