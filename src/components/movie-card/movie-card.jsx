import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movie.Title},
        <Card className="movie-card" style={{ width: "16rem" }}>
          <Card.Img className="card-img" variant="top" src={movie.ImagePath} />
          <Card.Body className="card-body">
            <Card.Title className="card-title">{movie.Title}</Card.Title>
            <Card.Text className="card-text">{movie.Description}</Card.Text>
            <Button
              className="card-button"
              onClick={() => onClick(movie)}
              variant="link"
            >
              Open
            </Button>
          </Card.Body>
      </Card>
      </div>
    );
  }
}

 MovieCard.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}; 