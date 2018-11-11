import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UserAvatar from '../UserAvatar';
import { EDIT_PROFILE } from '../../constants/routes';

import './styles.css';

const User = (props) => {
  const user = props.users.login;
  const redirect = `${EDIT_PROFILE}/${user.id}`;
  const nationality = user.nationality ? user.nationality : 'Not specified';

  return (
    <div className="user-container">
      <div className="avatar">
        <UserAvatar filename={user.avatar} />
      </div>

      <div className="data">
        <div className="info-item" title={user.name}>
          <span className="info-title">Name:</span>
          {user.name}
        </div>
        <div className="info-item" title={user.lastname}>
          <span className="info-title">Lastname:</span>
          {user.lastname}
        </div>
        <div className="info-item" title={nationality}>
          <span className="info-title">Nationality:</span>
          {nationality}
        </div>
        <div className="info-item" title={user.email}>
          <span className="info-title">Email:</span>
          {user.email}
        </div>
      </div>

      <div className="text-center button-wrapper">
        <Link to={redirect} className="button-link">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

User.propTypes = {
  users: PropTypes.object.isRequired,
};

export default User;
