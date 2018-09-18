import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getUsers, userRegister } from '../../actions';

import './styles.css';

class Register extends PureComponent {
    state = {
        formData: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        hideError: {
            name: false,
            lastname: false,
            email: false,
            password: false
        }
    };

    componentWillMount() {
        this.props.dispatch(getUsers());
    }

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
        const { login } = nextProps.users;
        if (login.isAuth) {
            this.props.history.push('/user');
        }
        this.setState({
            hideError: {
                name: false,
                lastname: false,
                email: false,
                password: false
            }
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        this.props.dispatch(
            userRegister(this.state.formData)
        );
    }

    getErrorClass(param) {
        const { register } = this.props.users;
        const { hideError } = this.state;
        const errors = register && register.error && register.error.errors;

        if (errors && errors[param] && !hideError[param]) {
            return 'field-error';
        }
        return '';
    }

    renderError(param) {
        const { register } = this.props.users;
        const { hideError } = this.state;
        const errors = register && register.error && register.error.errors;

        if (errors && errors[param] && !hideError[param]) {
            return <div className="error">{errors[param].message}</div>;
        }
    }

    renderUsersTable = ({ users }) => (
        users 
        ? users.map(item => 
            (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                </tr>
            ))
        : null
    )

    render() {
        const { users } = this.props;
        const {
            name, lastname,
            email, password
        } = this.state.formData;

        console.log(this.props)

        return (
            <div className="register-container">
                <form onSubmit={this.submitForm}>
                    <h2>Sing Up</h2>
                    
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
                    { this.renderError('name') }

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
                    { this.renderError('lastname') }

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
                    { this.renderError('email') }

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
                    { this.renderError('password') }

                    <button type="submit">Sign Up</button>

                </form>
                <div className="current_users">
                    <h3>Current users:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUsersTable(users)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        users: state.users
    }
}

export default connect(mapStateToProps)(Register)