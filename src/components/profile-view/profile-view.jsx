import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Form, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();

    (this.Username = null),
      (this.Password = null),
      (this.Email = null),
      (this.Birthday = null);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      validated: null,
      movies: [],
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

    axios
      .get("https://movie-api-1684.herokuapp.com/users/${username}", {
        headers: { Authorization: "Bearer ${token}" },
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

  handleRemoveUser(e) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete("https://movie-api-1684.herokuapp.com/users/${username}", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Delete this option?");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
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
      url: "https://movie-api-1684.herokuapp.com/users/${username}",
      headers: { Authorization: "Bearer ${token}" },
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
        window.open("/users/${username}", "_self");
      })
      .catch((e) => {
        console.log("error");
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

  removeFavorite(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        "https://movie-api-1684.herokuapp.com/users/${username}/Favorites/${movie}",
        {
          headers: { Authorization: "Bearer ${token}" },
        }
      )
      .then(() => {
        alert("Movie successfully removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onClick } = this.props;
    const { validated } = this.state;
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return (
      // Opening Part
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

            <Button
              onClick={() => this.handleRemoveUser()}
              variant="closing"
              className="delete-button"
            >
              Delete account
            </Button>

            <Link to={"/"}>
              <Button className="delete-button" variant="info">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>

        <Card className="favorite-movies">
          Favorite Movies
          <Card.Body>
            <Card.Img variant="top" src={movie.ImagePath} />

            <Link to={"/movies/${movies._id"}>
              <Button variant="link" className="fav-movie">
                Movie Information
              </Button>
            </Link>

            <Link to="/">
              <Button onClick={() => this.removeFavorite(movie._id)}>
                Remove Movie
              </Button>
            </Link>
          </Card.Body>
        </Card>

        <Card.Body className="update-card">
          <Form
            noValidate
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
              <Form.Control.Check type="invalid">
                Please enter correct characters
              </Form.Control.Check>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="New Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Check type="invalid">
                Please enter valid email address
              </Form.Control.Check>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Check type="invalid">
                Please enter valid password
              </Form.Control.Check>
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
              <Form.Label className="form-label">Birthday</Form.Label>
              <Form.Control
                type="data"
                placeholder="New Birthday"
                onChange={(e) => setBirthday(e.target.value)}
              />
              <Form.Control.Check type="invalid">
                Please enter valid birthday
              </Form.Control.Check>
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