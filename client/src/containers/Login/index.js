import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions';
import { USER_PROFILE } from '../../constants/routes';

import './styles.css';

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    hideError: {
      email: false,
      password: false,
    },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.login.isAuth) {
      this.props.history.push(USER_PROFILE);
    }
    this.setState({
      hideError: {
        email: false,
        password: false,
      },
    });
  }

  getErrorClass(fieldName) {
    return this.formFieldHasError(fieldName) ? 'field-error' : '';
  }

  formFieldHasError(fieldName) {
    const { error } = this.props.users.login;
    const { hideError } = this.state;

    return error && error.field === fieldName && !hideError[fieldName];
  }

  submitForm = event => {
    event.preventDefault();
    this.props.dispatch(loginUser(this.state.formData));
  };

  handleInput = event => {
    const newFormData = { ...this.state.formData };
    const newHideError = { ...this.state.hideError };
    const { value, name } = event.target;

    newFormData[name] = value;
    newHideError[name] = true;

    this.setState({
      formData: newFormData,
      hideError: newHideError,
    });
  };

  renderError(fieldName) {
    if (this.formFieldHasError(fieldName)) {
      const { error } = this.props.users.login;

      return <div className="error">{error.message}</div>;
    }
    return null;
  }

  render() {
    const { error } = this.props.users.login;
    const { email, password } = this.state.formData;
    const disableButton = !(email || password);

    return (
      <div className="login-container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>

          <div className="form_element">
            <input
              type="email"
              name="email"
              className={this.getErrorClass('email')}
              placeholder="Enter your mail"
              value={email}
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('email')}

          <div className="form_element">
            <input
              type="password"
              name="password"
              className={this.getErrorClass('password')}
              placeholder="Enter your password"
              value={password}
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('password')}

          <button type="submit" disabled={disableButton}>
            Log in
          </button>
          <br />

          {error && error.message && (
            <a href="reset-password" className="reset-password">
              Forgot my password
            </a>
          )}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(Login);
