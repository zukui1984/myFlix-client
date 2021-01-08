import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    props.onLoggedIn(user);
  };
  
  const startRegister = (e) => {
    e.preventDefault();
    props.startRegister();
  };


  return (
    <Form className="login-form">
      <Form.Label>Username</Form.Label>

      <Form.Group controlId="formBasicUsername">
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Form.Row>
        <Button
          className="login-button"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Button
          className="login-button"
          variant="primary"
          type="submit"
          onClick={startRegister}
        >
          Register
        </Button>
      </Form.Row>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
