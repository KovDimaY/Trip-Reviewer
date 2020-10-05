import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserAvatar from '../../components/UserAvatar';
import { getUsers, userRegister } from '../../actions';
import { HOME } from '../../constants/routes';

import './styles.css';

class Register extends PureComponent {
  state = {
    formData: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
    hideError: {
      name: false,
      lastname: false,
      email: false,
      password: false,
    },
  };

  componentWillMount() {
    this.props.dispatch(getUsers());
  }

  componentWillReceiveProps(nextProps) {
    const { login } = nextProps.users;

    if (login.isAuth) {
      this.props.history.push(HOME);
    } else {
      this.setState({
        hideError: {
          name: false,
          lastname: false,
          email: false,
          password: false,
        },
      });
    }
  }

  getErrorClass(fieldName) {
    return this.formFieldHasError(fieldName) ? 'field-error' : '';
  }

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

  submitForm = event => {
    event.preventDefault();

    this.props.dispatch(userRegister(this.state.formData));
  };

  formFieldHasError(fieldName) {
    const { register } = this.props.users;
    const { hideError } = this.state;
    const errors = register && register.error && register.error.errors;

    return errors && errors[fieldName] && !hideError[fieldName];
  }

  renderError(fieldName) {
    if (this.formFieldHasError(fieldName)) {
      const error = this.props.users.register.error.errors[fieldName];

      return <div className="error">{error.message}</div>;
    }
    return null;
  }

  renderForm() {
    const { name, lastname, email, password } = this.state.formData;

    return (
      <div className="form-container">
        <form onSubmit={this.submitForm}>
          <h2 className="form-title">Sing Up</h2>

          <div className="form_element">
            <input
              type="text"
              className={this.getErrorClass('name')}
              placeholder="Enter name"
              value={name}
              name="name"
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('name')}

          <div className="form_element">
            <input
              type="text"
              className={this.getErrorClass('lastname')}
              placeholder="Enter Lastname"
              value={lastname}
              name="lastname"
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('lastname')}

          <div className="form_element">
            <input
              type="email"
              className={this.getErrorClass('email')}
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('email')}

          <div className="form_element">
            <input
              type="password"
              className={this.getErrorClass('password')}
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={this.handleInput}
            />
          </div>
          {this.renderError('password')}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }

  renderUsers() {
    const { users } = this.props.users;

    if (users && users.length) {
      return (
        <div className="user-list-container">
          <h2 className="users-title">Existing Users:</h2>
          <div className="existing-users limited-width">
            {users.map(user => (
              <div key={user._id} className="user-container">
                <div className="user-avatar">
                  <UserAvatar filename={user.avatar} />
                </div>
                <div className="user-names">
                  <p title={user.name}>{user.name}</p>
                  <p title={user.lastname}>{user.lastname}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="register-container">
        {this.renderForm()}
        {this.renderUsers()}
      </div>
    );
  }
}

Register.propTypes = {
  users: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(Register);
