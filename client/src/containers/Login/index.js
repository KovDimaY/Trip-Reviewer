import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions';

import './styles.css';

class Login extends Component {
    state = {
        formData: {
            email: '',
            password: ''
        },
        hideError: {
            email: false,
            password: false
        }
    };

    handleInput = (event) => {
        const newFormData = { ...this.state.formData };
        const newHideError = { ...this.state.hideError };
        const { value, name } = event.target;

        newFormData[name] = value;
        newHideError[name] = true;

        this.setState({
            formData: newFormData,
            hideError: newHideError
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users.login.isAuth) {
            this.props.history.push('/user');
        }
        this.setState({
            hideError: {
                email: false,
                password: false
            }
        });
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(loginUser(this.state.formData));
    }

    getErrorClass(param) {
        const { error } = this.props.users.login;
        const { hideError } = this.state;

        if (error && error.field === param && !hideError[param]) {
            return 'field-error';
        }
        return '';
    }

    renderError(param) {
        const { error } = this.props.users.login;
        const { hideError } = this.state;

        if (error && error.field === param && !hideError[param]) {
            return <div className="error">{error.message}</div>;
        }
    }

    render() {
        const { error } = this.props.users.login;
        const { email, password } = this.state.formData;

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
                    { this.renderError('email') }

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
                    { this.renderError('password') }

                    <button type="submit">Log in</button><br/>

                    {
                        error && error.message && <a href="reset-password" className="reset-password">Forgot my password</a>
                    }

                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps)(Login);