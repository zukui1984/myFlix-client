import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button} from "react-bootstrap";
import PropTypes from "prop-types";

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;
    if (!director) return null;

    return (
      <Container>

        <div className="director-view">
        <Card className="director-card">
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>Born: {director.Birthday}</Card.Text>
            <Card.Text>Bio: {director.Bio}</Card.Text>
          </Card.Body>

          <Link to={'/'}>
            <Button variant='link' className='button-back'>
             Return
            </Button>
          </Link>

        </Card>
        </div>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
  })
};
