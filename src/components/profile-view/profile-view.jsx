import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Form, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      Username: "",
      Password: null,
      Email: null,
      Birthday: null,
      validated: null,
      FavoriteMovies: [],
      newUserName: null,
      newPassword: null,
      newBirthday: null,
      newEmail: null,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
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
      .get(`https://movie-api-1684.herokuapp.com/users/${username}`, {
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
    if (confirm("Do you really want to remove the movie from favorites?")) {
      return axios
        .delete(
          `https://movie-api-1684.herokuapp.com/users/${username}/movies/${movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          alert("Favorite has been removed");
        });
    }
  }

  handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios({
      method: "put",
      url: `https://movie-api-1684.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: this.state.newUsername
          ? this.state.newUsername
          : this.state.Username,
        Password: this.state.newPassword
          ? this.state.newPassword
          : this.state.Password,
        Email: this.state.newEmail ? this.state.newEmail : this.state.Email,
        Birthday: this.state.newBirthday
          ? this.state.newBirthday
          : this.state.Birthday,
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
        localStorage.setItem("user", response.data.Username);
        this.getUser(localStorage.getItem("token"));
        window.open(`/users/${response.data.Username}`, "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open("/", "_self");
  }

  render() {
    const { movies } = this.props;
    const { validated } = this.state;

    let favoritesToRender;
    if (this.state.FavoriteMovies) {
      const favorites = movies.filter(
        (movie) => this.state.FavoriteMovies.indexOf(movie._id) > -1
      );
      console.log(favorites);
      favoritesToRender = favorites.map((movie) => {
        console.log(movie, "!!movies");
        return (
          <div>
            <Link key={movie._id} to={`/movies/${movie._id}`}>
              <div>
                <Button variant="link">{movie.Title}</Button>
              </div>
            </Link>

            <Link to="/">
              <Button onClick={() => this.removeFavorite(movie._id)}>
                Remove Movie
              </Button>
            </Link>
          </div>
        );
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

            <Link to="/users/:username"></Link>

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
            <div>{favoritesToRender}</div>
          </Card.Body>
        </Card>

        <Card.Body className="update-card">
          <Form
            validated={validated}
            className="update-form"
            onSubmit={this.handleUpdate}
          >
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="New Username"
                name="newUsername"
                defaultValue={this.state.Username}
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="New Email"
                name="newEmail"
                defaultValue={this.state.Email}
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your old password or new password"
                name="newPassword"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
              <Form.Label className="form-label">Birthday</Form.Label>
              <Form.Control
                type="data"
                placeholder="New Birthday"
                name="newBirthday"
                defaultValue={this.state.Birthday}
                onChange={(e) => this.handleChange(e)}
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
