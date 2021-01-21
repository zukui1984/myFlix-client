import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavoriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    if (confirm('Add this to the list?')) 
    return (
    axios({
        method: 'put',
        url: `https://movie-api-1684.herokuapp.com/users/${username}/movies/${movie._id}`,
        headers: { Authorization: `Bearer ${token}` }
    })
            .then((response) => {
                console.log(response);
        alert('You have successfully add this to your list');
    })
   )
  }

  render() {
    const { movie } = this.props;

    if(!movie) return null;

    return (

      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>

        <Button variant='success' className='favorite-btn' 
        onClick={() => this.addFavoriteMovie(movie)}>
        Add to Favorite List</Button>
      
        <Link to="/">
          <Button className="register-btn" variant="primary" type="button">
            Button
          </Button>
        </Link>

      </div>
    );
  }
}