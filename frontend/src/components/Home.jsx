import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Home = () => {
  return (
    <Card border="primary" className="text-center">
      <Card.Img src="https://thumbs.dreamstime.com/b/cartoon-family-cooking-together-kitchen-chef-ai-cartoon-family-cooking-together-kitchen-chef-337451164.jpg"></Card.Img>
      <Card.Header>
        Have groceries in your refrigerator or pantry and don't know what to
        make with them? Snap-Chef is the answer!
      </Card.Header>
      <Card.Body>
        <Card.Title>Snap Chef</Card.Title>
        <Card.Text>Enter your groceries</Card.Text>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Home;
