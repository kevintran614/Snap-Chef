import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Home = () => {
  return (
    <div className="App">
      <Card border="primary" className="text-center">
        <Card.Img src="https://img.freepik.com/free-vector/hand-drawn-toast-cartoon-illustration_52683-127439.jpg?t=st=1734300872~exp=1734304472~hmac=48ee466df3f29f837a710266e448c880b1b9c65c00b1b2a022204e6e2ad1d87c&w=740"></Card.Img>
        <Card.Header>Welcome to Snap Chef!</Card.Header>
        <Card.Body>
          <Card.Title>Snap Chef</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter your groceries here:</Form.Label>
              <Form.Control type="email" placeholder="Grocieries" />
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
    </div>
  );
};

export default Home;
