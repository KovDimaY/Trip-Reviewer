import React from 'react';
import PropTypes from 'prop-types';

import { ADD_TRIP } from '../../../constants/routes';

import './styles.css';

const EmptyViewAddTrip = ({ message, buttonText }) => (
  <div className="empty-view-container">
    <p className="message">{message}</p>
    <a className="button" href={ADD_TRIP}>
      {buttonText}
    </a>
  </div>
);

EmptyViewAddTrip.propTypes = {
  message: PropTypes.string,
  buttonText: PropTypes.string,
};

EmptyViewAddTrip.defaultProps = {
  message: 'There is no any story yet.',
  buttonText: 'Add a story',
};

export default EmptyViewAddTrip;
