import React, { PureComponent } from 'react';
import Loader from './../Loaders/PulseLoader';

import { firebase } from './../../firebase';
import './styles.css';

class UserAvatar extends PureComponent {
    state = {
        src: '',
        isLoading: true
    };
    
    componentWillMount() {
        const { filename } = this.props;

        if (filename) {
            firebase.storage().ref('avatars')
                .child(filename).getDownloadURL()
                .then( url => this.setState({ src: url, isLoading: false }) );
        } else {
            this.setState({ src: '/images/avatar.png', isLoading: false })
        }
    }

    renderWithLoading() {
        const { isLoading, src } = this.state;

        if (isLoading) {
            return <Loader className="user-avatar-spinner" color="grey" size="16px" margin="4px"/>;
        }
        return (
            <div className="avatar-picture">
                <img alt="avatar" src={src} />
            </div>
        );
    }

    render() {
        return (
            <div className="user-avatar-container">
                { this.renderWithLoading() }
            </div>
        );
    }
};

export default UserAvatar;