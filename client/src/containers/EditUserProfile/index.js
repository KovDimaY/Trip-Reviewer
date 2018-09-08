import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser } from '../../actions';
import './styles.css';

class EditUserProfile extends PureComponent {
    state = {
        formdata: {
            _id: this.props.users.login.id,
            name: this.props.users.login.name,
            lastname: this.props.users.login.lastname,
            email: this.props.users.login.email,
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        }
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.result && nextProps.result.success) {
            nextProps.history.push('/user');
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(updateUser(this.state.formdata));
    }

    handleInput = (event) => {
        const newFormdata = {
            ...this.state.formdata
        };
        const { value, name } = event.target;

        newFormdata[name] = value;

        this.setState({
            formdata: newFormdata
        });
    }

    render() {
        const {
            name, lastname, email,
            oldPassword, newPassword,
            repeatPassword
        } = this.state.formdata;
        const { result } = this.props;

        return (
            <div className="edit-user-profile-container">
                <div className="avatar">
                    <img alt="avatar" src="/images/avatar.png"/>
                </div>
                <form onSubmit={this.submitForm}>
                    <div className="info">
                        <div className="form_element">
                            <span>Name:</span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={this.handleInput}
                            />
                        </div>

                        <div className="form_element">
                            <span>Lastname:</span>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Enter lastname"
                                value={lastname}
                                onChange={this.handleInput}
                            />
                        </div>
                    </div>

                    <hr />
                    <p className="danger-zone">Danger zone</p>

                    <div className="info danger">
                        <div className="form_element current-password">
                            <span>Current Password:</span>
                            <input
                                type="password"
                                name="oldPassword"
                                placeholder="Enter your current password"
                                value={oldPassword}
                                onChange={this.handleInput}
                            />
                        </div>

                        <div className="form_element">
                            <span>New Password:</span>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={this.handleInput}
                            />
                        </div>

                        <div className="form_element">
                            <span>Repeat New Password:</span>
                            <input
                                type="password"
                                name="repeatPassword"
                                placeholder="Repeat your new password"
                                value={repeatPassword}
                                onChange={this.handleInput}
                            />
                        </div>

                        <div className="form_element">
                            <span>Email:</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter new email"
                                value={email}
                                onChange={this.handleInput}
                            />
                        </div>
                    </div>

                    <div className="error">
                    {
                        result && result.message 
                            ? <div>{this.props.result.message }</div>
                            : null
                    }
                    </div>

                    <div className="text-center">
                        <button type="submit" className="button-link">Submit changes</button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/user" className="button-link calcel">Cancel</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        result: state.users.userUpdate
    }
}

export default connect(mapStateToProps)(EditUserProfile);