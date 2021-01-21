import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://movie-api-1684.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(function (e) {
          console.log("no such user");
        });
  };

  return (
    <Form className="login-form">
      <Form.Label>Username</Form.Label>
      <Form.Group controlId="formBasicUsername">
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Save login" />
      </Form.Group>

      <Form.Row>
        <Button
          className="login-button"
          variant="primary"
          type="button"
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Link to="/register">
          <Button className="register-btn" variant="primary" type="button">
            New User Register
          </Button>
        </Link>

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
