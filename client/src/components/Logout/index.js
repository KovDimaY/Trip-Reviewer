import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './styles.css';

class Logout extends Component {
  componentWillMount() {
    axios.get('/api/logout').then(this.handleResponce);
  }

  handleResponce = () => {
    setTimeout(this.redirectToHome, 2000);
  };

  redirectToHome = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="logout-container">
        <h1>Sorry to see you go :(</h1>
      </div>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Logout;
