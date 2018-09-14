import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';

import ImageUploader from './../../components/ImageUploader';
import UserAvatar from './../../components/UserAvatar';
import { updateUser } from './../../actions';
import { firebase } from './../../firebase';

import './styles.css';
import "react-sweet-progress/lib/style.css";

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
        isUploading: false,
        progress: 0,
        uploadError: null
    };

    componentWillMount() {
        firebase.auth().signInAnonymously().catch((error) => {
            console.log(error);
        });
    }

    componentWillReceiveProps(nextProps) {
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

        this.setState({ formdata: newFormdata });
    }

    handleDeleteAvatar = () => {
        const newFormdata = {
            ...this.state.formdata
        };

        newFormdata.avatar = null;

        this.setState({ formdata: newFormdata });
    }

    onUploadStarts = () => {
        this.setState({
            isUploading: true,
            progress: 0,
            uploadError: null
        });
    }

    onUploadProgress = (progress) => {
        this.setState({ progress });
    }

    onUploadSuccess = (filename) => {
        const newFormdata = {
            ...this.state.formdata
        };

        newFormdata.avatar = filename;

        this.setState({
            formdata: newFormdata,
            isUploading: false,
            progress: 100
        });
    }

    onUploadError = (error) => {
        this.setState({ isUploading: false, uploadError: error });
    }

    renderAvatarControls() {
        const { isUploading, progress } = this.state;
        
        if (isUploading) {
            return (
                <div className="user-avatar-controls">
                    <Progress percent={progress} />
                </div>
            );
        }
        return (
            <div className="user-avatar-controls">
                <ImageUploader
                    filename={this.props.users.login.id}
                    onUploadStarts={this.onUploadStarts}
                    onUploadProgress={this.onUploadProgress}
                    onUploadSuccess={this.onUploadSuccess}
                    onUploadError={this.onUploadError}
                    className="avatar-button update-user-avatar"
                />
                <label className="avatar-button delete-user-avatar" onClick={this.handleDeleteAvatar}>Delete avatar</label>
            </div>
        );
    }

    renderSoftInfoInputs() {
        const { name, lastname } = this.state.formdata;

        return (
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
        );
    }

    renderDangerZoneInputs() {
        const {
            oldPassword, newPassword,
            repeatPassword, email
        } = this.state.formdata;

        return (
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
        );
    }

    renderDisclaimer() {
        if (this.state.uploadError) {
            return (
                <p className="disclamer-error">
                    Upload was not successful.<br/>
                    The avatar image should be smaller than <b>1MB</b>.
                </p>
            );
        }
        return (
            <p className="disclamer">
                * To be sure that your avatar will be updated correctly <br/>
                press <b>"Submit changes"</b> button at the bottom of the page
            </p>
        )
    }

    renderError() {
        const { result } = this.props;

        if (result && result.message) {
            return (
                <div className="error">
                    { this.props.result.message }
                </div>
            );
        }
    }

    render() {
        const { avatar } = this.state.formdata;

        return (
            <div className="edit-user-profile-container">
                <UserAvatar filename={avatar} />

                { this.renderDisclaimer() }
                { this.renderAvatarControls() }

                <form onSubmit={this.submitForm}>
                    { this.renderSoftInfoInputs() }

                    <hr />
                    <p className="danger-zone">Danger zone</p>

                    { this.renderDangerZoneInputs() }

                    { this.renderError() }

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