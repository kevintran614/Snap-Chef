import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Card border="primary" className="text-center">
        <Card.Img src="https://img.freepik.com/free-vector/watercolor-international-chefs-day-illustration_23-2149670979.jpg?t=st=1734302447~exp=1734306047~hmac=1c1134d3dff562b3237033c65922407dc3b6afbeacb328fd92f5eb830fe81ca8&w=740"></Card.Img>
        <Card.Header>Snap Chef has generated your recipes!</Card.Header>
        <Card.Body>
          <Card.Title>Generated Recipes</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter your groceries here:</Form.Label>
              <Form.Control type="text" placeholder="Grocieries" />
              <Form.Text className="text-muted">
                Have groceries in your refrigerator or pantry and don't know
                what to make with them? Snap-Chef is the answer!{" "}
              </Form.Text>
            </Form.Group>
            <Button onClick={() => navigate("/")}>Generate New Recipes</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Recipes;
