import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TRIPS } from '../../constants/routes';

import './styles.css';

const TripItem = ({
  _id, title, country, expences, duration, rating,
}) => (
  <Link to={`${TRIPS}/${_id}`} className="trip-item-container">
    <div className="header">
      <h2>{title}</h2>
    </div>
    <div className="items">
      <div className="country">
        {country}
      </div>

      <div className="bubble">
        <strong>Expences:</strong>
        {` $${expences}`}
      </div>

      <div className="bubble">
        <strong>Duration:</strong>
        {duration === 1 ? ' 1 day' : ` ${duration} days`}
      </div>

      <div className="bubble rating">
        <strong>Rating:</strong>
        {` ${rating} / 5`}
      </div>

    </div>
  </Link>
);

TripItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  expences: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,

};

export default TripItem;
