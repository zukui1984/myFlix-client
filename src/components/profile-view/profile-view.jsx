import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Form, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      validated: null,
      movie: [],
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios.get(`https://movie-api-1684.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   removeFavorite(movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
       if (confirm("Do you really want to delete the user?")) {
    return(
    axios.delete(`https://movie-api-1684.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
          alert('Account has been deleted');
      })
    )
    }
  }

  
  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    } 

    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    

    axios({
      method: "put",
      url: `https://movie-api-1684.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        alert("Saved Changes");
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch((e) => {
        console.log(response);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  onLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open("/", "_self");
  }

 
  render() {
    const { movie } = this.props;
    const { validated } = this.state;
  
    let favoritesToRender;
    if (this.state.FavoriteMovies) {
      const favorites = this.props.movies.filter(
        movie => this.state.FavoriteMovies.indexOf(movie._id) > -1);
      console.log(favorites)
      favoritesToRender = favorites.map(m => {
        console.log(m, '!!m')
        return (
        <Link key={m._id} to={`/movies/${m._id}`}>
        <div>
        <Button variant="link">{m.Title}</Button>
        </div>
        </Link>);
      });
    }

    return (
      <Container>
        <Card className="profile-view">
          <Card.Body>
            <Card.Text className="profile-text">
              Username: {this.state.Username}
            </Card.Text>
            <Card.Text className="profile-text">
              Email: {this.state.Email}
            </Card.Text>
            <Card.Text className="profile-text">
              Birthday: {this.state.Birthday}
            </Card.Text>

        <Link to='/users/:username'>
            <Button variant='success' className='update-button'>
            Update Profile</Button>
        </Link>

            <Button
              onClick={() => this.handleRemoveUser(movie)}
              variant="closing"
              className="delete-button"
            >
              Delete account
            </Button>
            
            <Link to="/">
              <Button className="back-button" variant="info">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>

        <Card className="favorite-movies">
          Favorite Movies
          <Card.Body>

          {/* <Card.Img variant='top' src={movie.ImagePath} /> */}

         
           <Link to="/">
              <Button onClick={() => this.removeFavorite(movie._id)}>
                Remove Movie
              </Button>
            </Link>   

            </Card.Body>
        </Card>

        <Card.Body className="update-card">
          <Form
            validated={validated}
            className="update-form"
            onSubmit={(e) =>
              this.handleUpdate(
                e,
                this.Username,
                this.Password,
                this.Email,
                this.Birthday
              )
            }
          >
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="New Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="New Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
              <Form.Label className="form-label">Birthday</Form.Label>
              <Form.Control
                type="data"
                placeholder="New Birthday"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button className="update-button" type="submit">
              Update info
            </Button>

          </Form>
        </Card.Body>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf,
  }),
};
