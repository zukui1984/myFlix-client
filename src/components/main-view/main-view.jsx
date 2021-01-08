import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';


import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: null,
      selectedMovie: null,
      user: null,
      register: null,
    };


  this.goBack = this.goBack.bind(this);
  this.onLoggedIn = this.onLoggedIn.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://movie-api-1684.herokuapp.com/movies")
      .then((response) => {
        // Assign the result to the state
        this.setState({ movies: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }
  goBack() {
    this.setState({ selectedMovie: null });
  }
  onLoggedIn(user) {
    this.setState({ user });
  }
  startRegister() {
    this.setState({ register : true });
  }
  endRegister() {
    this.setState({ register : null });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

   if (register) {
      return <RegistrationView endRegister={() => this.endRegister()} />;
    } 

    if (!user)
      return  <LoginView startRegister={() => this.startRegister()}
      onLoggedIn={(user) => this.onLoggedIn(user)}/>

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
      <Container>
      <Row className="justify-content-md-center">
        {selectedMovie ? (          
            <Col md={8}>
          <MovieView movie={selectedMovie} goBack={() => this.goBack()} />
          </Col>
        
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={(movie) => this.onMovieClick(movie)}
            />
          ))
        )}
        </Row>
      </Container>
      </div>
    );
  }
}

   MainView.propTypes = {

    movies : PropTypes.arrayOf({
      /* PropTypes.shape({ */
         Title: PropTypes.string.isRequired,
         Description: PropTypes.string.isRequired, 

    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    }),

    user: PropTypes.string,
  }; 
  
 

  