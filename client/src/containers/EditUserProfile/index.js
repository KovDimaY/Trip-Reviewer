import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import ImageUploader from '../../components/ImageUploader';
import UserAvatar from '../../components/UserAvatar';
import { updateUser } from '../../actions';
import { firebase } from '../../firebase';
import { USER_PROFILE } from '../../constants/routes';

import './styles.css';

class EditUserProfile extends PureComponent {
  state = {
    formData: {
      _id: this.props.users.login.id,
      name: this.props.users.login.name,
      lastname: this.props.users.login.lastname,
      email: this.props.users.login.email,
      avatar: this.props.users.login.avatar,
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    hideError: {
      name: false,
      lastname: false,
      email: false,
      avatar: false,
      oldPassword: false,
      newPassword: false,
      repeatPassword: false,
    },
    isUploading: false,
    progress: 0,
    uploadError: null,
  };

  componentWillMount() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        console.log(error); // eslint-disable-line no-console
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.result && nextProps.result.success) {
      nextProps.history.push(USER_PROFILE);
    } else {
      this.setState({
        hideError: {
          name: false,
          lastname: false,
          email: false,
          avatar: false,
          oldPassword: false,
          newPassword: false,
          repeatPassword: false,
        },
      });
    }
  }

  onUploadStarts = () => {
    this.setState({
      isUploading: true,
      progress: 0,
      uploadError: null,
    });
  };

  onUploadProgress = progress => {
    this.setState({ progress });
  };

  onUploadSuccess = filename => {
    const newFormData = { ...this.state.formData };

    newFormData.avatar = filename;

    this.setState({
      formData: newFormData,
      isUploading: false,
      progress: 100,
    });
  };

  onUploadError = error => {
    this.setState({ isUploading: false, uploadError: error });
  };

  getErrorClass(fieldName) {
    return this.formFieldHasError(fieldName) ? 'field-error' : '';
  }

  handleDeleteAvatar = () => {
    const newFormData = { ...this.state.formData };

    newFormData.avatar = null;

    this.setState({ formData: newFormData });
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

  submitForm = event => {
    event.preventDefault();
    this.props.dispatch(updateUser(this.state.formData));
  };

  formFieldHasError(fieldName) {
    const { result } = this.props;
    const { hideError } = this.state;
    const errors = result && result.error && result.error.errors;

    return errors && errors[fieldName] && !hideError[fieldName];
  }

  renderError(fieldName) {
    if (this.formFieldHasError(fieldName)) {
      const error = this.props.result.error.errors[fieldName];

      return <div className="error">{error.message}</div>;
    }
    return null;
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
        >
          Update
        </ImageUploader>
        <label className="avatar-button delete-user-avatar" onClick={this.handleDeleteAvatar}>
          Delete
        </label>
      </div>
    );
  }

  renderSoftInfoInputs() {
    const { name, lastname } = this.state.formData;

    return (
      <div className="info">
        <div className="form-element">
          <span className="title-label">Name:</span>
          <input
            type="text"
            className={this.getErrorClass('name')}
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleInput}
          />
        </div>
        {this.renderError('name')}

        <div className="form-element">
          <span className="title-label">Lastname:</span>
          <input
            type="text"
            className={this.getErrorClass('lastname')}
            name="lastname"
            placeholder="Enter lastname"
            value={lastname}
            onChange={this.handleInput}
          />
        </div>
        {this.renderError('lastname')}
      </div>
    );
  }

  renderDangerZoneInputs() {
    const { oldPassword, newPassword, repeatPassword, email } = this.state.formData;

    return (
      <div className="info danger">
        <div className="form-element">
          <span className="title-label">Current Password:</span>
          <input
            type="password"
            className={this.getErrorClass('oldPassword')}
            name="oldPassword"
            placeholder="Enter your current password"
            value={oldPassword}
            onChange={this.handleInput}
          />
        </div>
        {this.renderError('oldPassword')}

        <div className="form-element">
          <span className="title-label">New Password:</span>
          <input
            type="password"
            className={this.getErrorClass('newPassword')}
            name="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={this.handleInput}
          />
        </div>
        {this.renderError('newPassword')}

        <div className="form-element">
          <span className="title-label">Repeat New Password:</span>
          <input
            type="password"
            className={this.getErrorClass('repeatPassword')}
            name="repeatPassword"
            placeholder="Repeat your new password"
            value={repeatPassword}
            onChange={this.handleInput}
          />
        </div>
        {this.renderError('repeatPassword')}

        <div className="form-element">
          <span className="title-label">Email:</span>
          <input
            type="email"
            className={this.getErrorClass('email')}
            name="email"
            placeholder="Enter new email"
            value={email}
            onChange={this.handleInput}
          />
        </div>
        {this.renderError('email')}
      </div>
    );
  }

  renderDisclaimer() {
    if (this.state.uploadError) {
      return (
        <p className="disclamer-error">
          Upload was not successful.
          <br />
          The avatar image should be smaller than <b>1MB</b>.
        </p>
      );
    }
    return (
      <p className="disclamer">
        * To be sure that your avatar will be updated correctly <br />
        press <b>&quot;Submit changes&quot;</b> button at the bottom of the page
      </p>
    );
  }

  renderFormContent() {
    const { avatar } = this.state.formData;

    return (
      <div className="form-content-wrapper">
        <div className="left-column">
          <div className="avatar">
            <UserAvatar filename={avatar} />
          </div>

          {this.renderDisclaimer()}
          {this.renderAvatarControls()}
          {this.renderSoftInfoInputs()}
        </div>

        <div className="right-column">
          <p className="danger-zone">Danger zone</p>
          <p className="disclamer-danger">
            * To change anything from the &quot;Danger Zone&quot; you should enter your&nbsp;
            <b>current password</b>. If you do not enter your current password - nothing will be
            changed.
          </p>

          {this.renderDangerZoneInputs()}
          {this.renderError()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="edit-user-profile-container">
        <form onSubmit={this.submitForm}>
          {this.renderFormContent()}

          <div className="text-center">
            <button type="submit" className="button-link">
              Submit changes
            </button>
          </div>

          <div className="text-center">
            <Link to={USER_PROFILE} className="button-link calcel">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  users: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  result: PropTypes.object,
};

EditUserProfile.defaultProps = {
  result: undefined,
};

function mapStateToProps(state) {
  return {
    result: state.users.userUpdate,
  };
}

export default connect(mapStateToProps)(EditUserProfile);
