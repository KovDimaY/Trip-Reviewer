import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TRIPS } from '../../constants/routes';
import { TYPES } from '../Common/DetailsLabel/utils';
import DetailsLabel from '../Common/DetailsLabel';

import './styles.css';

const TripItem = ({ _id, title, country, expences, duration, rating }) => (
  <Link to={`${TRIPS}/${_id}`} className="trip-item-container">
    <div className="header">
      <h2>{title}</h2>
    </div>
    <div className="items">
      <div className="country">{country}</div>

      <DetailsLabel type={TYPES.expences} value={expences}>
        <strong>Expenses:</strong>
        {` $${expences}`}
      </DetailsLabel>

      <DetailsLabel type={TYPES.duration} value={duration}>
        <strong>Duration:</strong>
        {duration === 1 ? ' 1 day' : ` ${duration} days`}
      </DetailsLabel>

      <DetailsLabel type={TYPES.rating} value={rating}>
        <strong>Rating:</strong>
        {` ${rating} / 5`}
      </DetailsLabel>
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
