import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Form, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";
​
import "./profile-view.scss";
​
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
​
      this.state = {
        Username: '',
        Password: null,
        Email: null,
        Birthday: null,
        validated: null,
        FavoriteMovies: [],
        newUserName: null,
        newPassword: null,
        newBirthday: null,
        newEmail: null
      };
​
      this.handleUpdate = this.handleUpdate.bind(this);
  }
​
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
​
  getUser(token) {
    const username = localStorage.getItem("user");
​
    axios
      .get(`http://localhost:5000/users/${username}`, {
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
        console.log(error, '!!error');
      });
  }
​
  handleRemoveUser(user) {
   console.log(user)
​
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
​
    if (confirm('Please confirm that you want to delete your profile.')) {
      axios
        .delete(`http://localhost:5000/users/${user}`,
        {
          headers: {
            // 'Content-Type' : 'application/json',
            // 'Accept' : 'application/json',
            'Authorization': "Bearer " + token
          },
        })
        .then(() => {
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }
​
  handleUpdate(e) {
    e.preventDefault()
    // this.setState({
    //   validated: null,
    // });
​
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   this.setState({
    //     validated: true,
    //   });
    //   return;
    // }
​
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    console.log(this.state.newPassword, this.state.Password, '!!state')
    axios({
      method: "put",
      url: `http://localhost:5000/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: this.state.newUsername ? this.state.newUsername : this.state.Username,
        Password: this.state.newPassword ? this.state.newPassword : this.state.Password ,
        Email: this.state.newEmail ? this.state.newEmail : this.state.Email,
        Birthday: this.state.newBirthday ? this.state.newBirthday : this.state.Birthday,
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
        this.getUser(localStorage.getItem('token'));
​
        window.open(`/users/${response.data.Username}`, "_self");
      })
      .catch((e) => {
        console.log("error");
      });
  }
​
  onLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open("/", "_self");
  }
​
  removeFavorite(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
​
    axios.delete(
        "https://movie-api-1684.herokuapp.com/users/${username}/Movies/${movie}",
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
​
  handleChange(event) {
    this.setState( {[event.target.name]: event.target.value} )
    console.log(event.target.value, '!!aaa')
  }
​
  render() {
    const { validated } = this.state;
    console.log(validated, '!!validated')
    let favoritesToRender;
    if (this.state.FavoriteMovies) {
      const favorites = this.props.movies.filter(movie => this.state.FavoriteMovies.indexOf(movie._id) > -1);
      console.log(favorites)
      favoritesToRender = favorites.map(m => {
        console.log(m, '!!m')
        return (
          <div>
            <Link key={m._id} to={`/movies/${m._id}`}>
              <div><Button variant="link">{m.Title}</Button></div>
            </Link>
            <Link to="/">
              <Button onClick={() => this.removeFavorite(m._id)}>
                Remove Movie
              </Button>
            </Link>
          </div>
        );
      });
    }
​
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
​
            <Button
              onClick={() => this.handleRemoveUser(this.state.Username)}
              variant="closing"
              className="delete-button"
            >
              Delete account
            </Button>
​
            <Link to={"/"}>
              <Button className="delete-button" variant="info">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>
​
        <Card className="favorite-movies">
          Favorite Movies
          <Card.Body>
          {
            favoritesToRender
​
          }
          </Card.Body>
        </Card>
​
        <Card.Body className="update-card">
          <Form
            noValidate
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
​
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="New Email"
                name="newEmail"
                defaultValue={this.state.Email}
                onChange={(e) => this.handleChange(e)}
              />
​
            </Form.Group>
​
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                // placeholder="New Password"
                required
                placeholder="Enter old password or a new one"
                name="newPassword"
                defaultValue={this.state.Password}
                onChange={(e) => this.handleChange(e)}
              />
​
            </Form.Group>
​
            <Form.Group controlId="formBasicBirthday">
              <Form.Label className="form-label">Birthday</Form.Label>
              <Form.Control
                type="data"
                placeholder="New Birthday"
                name="newBirthday"
                defaultValue={this.state.Birthday}
                onChange={(e) => this.handleChange(e)}
              />
​
            </Form.Group>
​
            <Button className="update-button" type="submit">
              Update info
            </Button>
​
          </Form>
        </Card.Body>
      </Container>
    );
  }
}
​
ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf,
  }),
};