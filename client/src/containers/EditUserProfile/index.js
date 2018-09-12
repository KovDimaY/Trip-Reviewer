import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ImageUploader from './../../components/ImageUploader';
import { updateUser } from '../../actions';
import { firebase } from './../../firebase';

import './styles.css';

class EditUserProfile extends PureComponent {
    state = {
        formdata: {
            _id: this.props.users.login.id,
            name: this.props.users.login.name,
            lastname: this.props.users.login.lastname,
            email: this.props.users.login.email,
            avatar: this.props.users.login.avatar,
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        },
        currentAvatar: null,
        savedAvatar: null
    };

    componentWillMount() {
        const filename = this.props.users.login.avatar;

        if (filename) {
            firebase.storage().ref('avatars')
                .child(filename).getDownloadURL()
                .then( url => this.setState({ savedAvatar: url }) );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.result && nextProps.result.success) {
            nextProps.history.push('/user');
        }
    }

    getAvatarImage = () => {
        const { currentAvatar, savedAvatar } = this.state;

        if (currentAvatar) {
            return currentAvatar;
        } else if (savedAvatar) {
            return savedAvatar;
        }
        return '/images/avatar.png';
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

    onUploadSuccess = (filename) => {
        const newFormdata = {
            ...this.state.formdata
        };

        newFormdata.avatar = filename;

        firebase.storage().ref('avatars')
            .child(filename).getDownloadURL()
            .then( url => this.setState({ formdata: newFormdata, currentAvatar: url }) );

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
                    <img alt="avatar" src={this.getAvatarImage()}/>
                </div>
                <ImageUploader
                    filename={this.props.users.login.id}
                    onUploadSuccess={this.onUploadSuccess}
                    onUploadError={this.onUploadError}
                />
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