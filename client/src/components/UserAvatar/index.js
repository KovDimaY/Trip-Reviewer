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
    this.oldFilename = '';
    this.updateImage(this.props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    this.updateImage(nextProps);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateImage(props) {
    const { filename } = props;

    if (filename && filename !== this.oldFilename) {
      firebase
        .storage()
        .ref('avatars')
        .child(filename)
        .getDownloadURL()
        .then(this.handleGetUrlSuccess);

      this.oldFilename = filename;
    } else if (!filename) {
      this.setState({ src: '/images/avatar.png', isLoading: false });
    }
  }

  handleGetUrlSuccess = url => {
    if (this._isMounted) {
      this.setState({ src: url, isLoading: false });
    }
  };

  renderWithLoading() {
    const { isLoading, src } = this.state;

    if (isLoading) {
      return <Loader className="user-avatar-spinner" color="grey" size="16px" margin="4px" />;
    }
    return (
      <div className="avatar-picture fit-parent">
        <img className="fit-parent" alt="avatar" src={src} />
      </div>
    );
  }

  render() {
    return <div className="user-avatar-container fit-parent">{this.renderWithLoading()}</div>;
  }
}

export default UserAvatar;
