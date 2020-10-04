import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetPassword } from '../../actions';

import './styles.css';

class ResetPass extends Component {
  state = {
    email: '',
  };

  handleInputEmail = event => {
    this.setState({ email: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();
    this.props.dispatch(resetPassword(this.state));
  };

  render() {
    const { users } = this.props;

    return (
      <div className="reset-password-container">
        <form onSubmit={this.submitForm}>
          <h2>Reset Password</h2>

          <div className="form-element">
            <input
              type="email"
              placeholder="Enter your mail"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>

          <button type="submit">Reset</button>

          <div className="error">{users.reset ? <div>{users.reset.message}</div> : null}</div>
        </form>
      </div>
    );
  }
}

ResetPass.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(ResetPass);
