import React, { Component } from 'react';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { firebase } from '../../firebase';


class ImageUploader extends Component {
  componentWillMount() {
    firebase.auth().signInAnonymously().catch(this.handleAuthError);
  }

  componentWillUnmount() {
    firebase.auth().signOut();
  }

  handleAuthError = (error) => {
    console.log(error);
  }

  handleUploadStart = () => {
    this.props.onUploadStarts();
  }

  handleUploadError = (error) => {
    console.log(error);
    this.props.onUploadError(error);
  }

  handleProgress = (progress) => {
    this.props.onUploadProgress(progress);
  }

  handleUploadSuccess = (filename) => {
    this.props.onUploadSuccess(filename);
  }

  render() {
    return (
      <CustomUploadButton
        hidden
        accept="image/*"
        name="avatar"
        filename={this.props.filename}
        storageRef={firebase.storage().ref('avatars')}
        onUploadStart={this.handleUploadStart}
        onUploadError={this.handleUploadError}
        onUploadSuccess={this.handleUploadSuccess}
        onProgress={this.handleProgress}
        className={this.props.className}
      >
              Update avatar
      </CustomUploadButton>
    );
  }
}

export default ImageUploader;
