import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

class EditUserProfile extends PureComponent {
    state = {
        formdata: {
            _id: '',
            name: 'Test1',
            latname: 'Test2',
            email: 'Test3',
            oldPassword: 'Test4',
            newPassword: 'Test5',
            repeatPassword: 'Test6'
        }
    };

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
            name, latname, email,
            oldPassword, newPassword,
            repeatPassword
        } = this.state.formdata;

        return (
            <div className="edit-user-profile-container">
                <div className="avatar">
                    <img alt="avatar" src="/images/avatar.png"/>
                </div>
                <form>
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
                                name="latname"
                                placeholder="Enter latname"
                                value={latname}
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

export default EditUserProfile;