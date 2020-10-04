import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const NotFound = props => {
  const message = "It looks like you're lost...";

  return (
    <div className="not-found-container">
      <h1 className="title">404</h1>
      <div className="picture" />
      <h2 className="text">{message}</h2>
      <button className="button" onClick={() => props.history.push('/')}>
        Go Home
      </button>
    </div>
  );
};

NotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NotFound;
