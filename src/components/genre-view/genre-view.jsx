import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Container, Card, Button} from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {genre} = this.props;

    if (!genre) return null;

    return(
      <div className="genre-view">
        <Container>
          <Card className="genre-card">
            <Card.Title className="genre-name">{genre.Name}</Card.Title>
            <Card.Text className="genre-description">{genre.Description}</Card.Text>
          <Link to={'/'}>
            <Button variant='link'>Go Back</Button>
          </Link>
          </Card>
        </Container>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};