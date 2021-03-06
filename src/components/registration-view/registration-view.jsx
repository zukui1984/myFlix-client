import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import "./registration-view.scss";
import { Link } from 'react-router-dom';
import axios from 'axios';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [movies, setMovies] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('https://movie-api-1684.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
  .then(response => {
     const data = response.data;
     console.log(data);
     window.open('/', '_self'); 
  })
  .catch((e) => {
    console.log('error registering the user')
   })
 };

  return (
    <Form className="registration-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
        type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>      

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMovies">
        <Form.Label>Movies</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Movie Title"
          value={movies}
          onChange={(e) => setMovies(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        className="login-button"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Register
      </Button>

      <Link to='/'>
      <Button className='register-btn' variant='primary' 
      type='button'>Back</Button>        
       </Link> 

    </Form>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
  }),  
};

 