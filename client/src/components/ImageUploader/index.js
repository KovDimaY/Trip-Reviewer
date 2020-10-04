import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { firebase } from '../../firebase';

class ImageUploader extends Component {
  componentWillMount() {
    firebase.auth().signInAnonymously().catch(this.handleAuthError);
  }

  componentWillUnmount() {
    firebase.auth().signOut();
  }

  handleAuthError = error => {
    console.log(error); // eslint-disable-line no-console
  };

  handleUploadStart = () => {
    this.props.onUploadStarts();
  };

  handleUploadError = error => {
    console.log(error); // eslint-disable-line no-console
    this.props.onUploadError(error);
  };

  handleProgress = progress => {
    this.props.onUploadProgress(progress);
  };

  handleUploadSuccess = filename => {
    this.props.onUploadSuccess(filename);
  };

  render() {
    return (
      <CustomUploadButton
        hidden
        accept="image/*"
        name="avatar"
        filename={this.props.filename}
        metadata={{ cacheControl: 'max-age=86400' }}
        storageRef={firebase.storage().ref('avatars')}
        onUploadStart={this.handleUploadStart}
        onUploadError={this.handleUploadError}
        onUploadSuccess={this.handleUploadSuccess}
        onProgress={this.handleProgress}
        className={this.props.className}
      >
        {this.props.children}
      </CustomUploadButton>
    );
  }
}

ImageUploader.propTypes = {
  children: PropTypes.node.isRequired,
  filename: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onUploadStarts: PropTypes.func.isRequired,
  onUploadError: PropTypes.func.isRequired,
  onUploadProgress: PropTypes.func.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
};

export default ImageUploader;
