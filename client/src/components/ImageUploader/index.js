import React, { Component } from 'react';
import { firebase } from './../../firebase';

import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


class ImageUploader extends Component {
    state = {
        error: null
    };

    componentWillMount() {
        firebase.auth().signInAnonymously().catch(this.handleAuthError);
    }

    componentWillUnmount() {
        firebase.auth().signOut();
    }

    handleAuthError = (error) => {
        this.setState({ error });
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

    render(){
        return(
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