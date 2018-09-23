import React, { PureComponent } from 'react';
import Loader from '../Loaders/PulseLoader';

import { firebase } from '../../firebase';
import './styles.css';

class UserAvatar extends PureComponent {
    state = {
      src: '',
      isLoading: true,
    };

    componentWillMount() {
      this.updateImage(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.updateImage(nextProps);
    }

    updateImage(props) {
      const { filename } = props;

      if (filename) {
        firebase.storage().ref('avatars')
          .child(filename).getDownloadURL()
          .then(this.handleGetUrlSuccess);
      } else {
        this.setState({ src: '/images/avatar.png', isLoading: false });
      }
    }

    handleGetUrlSuccess = (url) => {
      this.setState({ src: url, isLoading: false });
    }

    renderWithLoading() {
      const { isLoading, src } = this.state;

      if (isLoading) {
        return <Loader className="user-avatar-spinner" color="grey" size="16px" margin="4px" />;
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
}

export default UserAvatar;
