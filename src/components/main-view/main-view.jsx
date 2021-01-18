import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }


  getMovies(token) {
    axios
      .get("https://movie-api-1684.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies : response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
  // props.onLoggedIn(data) - LoginView
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
	}

  render() {
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
      <Navbar>
  
       <ul>
          <li>
          <Link to="/register">Register</Link>
          </li>
  
        <li>
        <Link to="/directors">Directors</Link>
        </li>

	   </ul>
      </Navbar>

      <Route exact path="/"  render={() => 
            {if (!user) 
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} /> ;
      return movies.map(m => <MovieCard key={m._id} movie={m} />);
            }}/>
       <Route  path="/register" render={() => <RegistrationView />} />
       <Route path="/register" render={() => <LoginView />} /> 

       <Route path="/movies/:movieId" render={({match}) => 
       <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
    
  
         <Route path="/genres/:name" render={({match}) => {
             if (!movies) return <div className="main-view" />;
          return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }}/>
     
         <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
         return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              }}/> 

        <Route path="/users/:username" 	render={() => {
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
							if (movies.length === 0) return;
							return <ProfileView movies={movies} />
						}}/>
      </div>
    </Router>
    );
  }
}

MainView.propTypes = {
  movies: PropTypes.arrayOf({
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