import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

import './styles.css';

class StarsRating extends PureComponent {
  static getLabel(rating) {
    switch (rating) {
      case 1:
        return 'Hated it!';
      case 2:
        return 'Disliked it!';
      case 3:
        return 'It was ok.';
      case 4:
        return 'Liked it!';
      case 5:
        return 'Loved it!';
      default:
        return 'Rate your trip:';
    }
  }

  state = {
    hower: null,
  };

  handleRating = rating => {
    this.props.onChange(rating);
  };

  handleHower = hower => {
    this.setState({ hower });
  };

  render() {
    const { hower } = this.state;
    const { rating, error } = this.props;

    const emptySymbol = (
      <i className={`far fa-star star-empty${error && !hower ? ' error-empty' : ''}`} />
    );
    const fullSymbol = (
      <i className={`fas fa-star star-full${error && !hower ? ' error-full' : ''}`} />
    );

    return (
      <div className="stars-rating-container">
        <label className={`rating-label${error && !hower ? ' error-label' : ''}`}>
          {StarsRating.getLabel(hower || rating)}
        </label>
        <Rating
          initialRating={rating}
          emptySymbol={emptySymbol}
          fullSymbol={fullSymbol}
          onChange={this.handleRating}
          onHover={this.handleHower}
        />
      </div>
    );
  }
}

StarsRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

StarsRating.defaultProps = {
  error: false,
};

export default StarsRating;
