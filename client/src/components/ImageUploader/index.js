import React, { Component } from 'react';
import { firebase } from './../../firebase';

import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


class ImageUploader extends Component {
    state = {
        isUploading: false,
        progress: 0,
    };

    componentWillMount() {
        firebase.auth().signInAnonymously().catch((error) => {
            console.log(error);
        });
    }

    componentWillUnmount() {
        firebase.auth().signOut();
    }

    handleUploadStart = () => {
        this.setState({ isUploading: true, progress: 0 });
    }

    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.log(error);
    }

    handleProgress = (progress) => {
        this.setState({ progress });
    }

    handleUploadSuccess = (filename) => {
        this.setState({
            progress: 100,
            isUploading: false
        });

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
                style={{ textAlign: 'center', display: 'block', backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}
            >
                Select your awesome avatar
            </CustomUploadButton>
        );
    }
}

export default ImageUploader;