import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UserAvatar from '../UserAvatar';
import { EDIT_PROFILE } from '../../constants/routes';

import './styles.css';

const User = (props) => {
  const user = props.users.login;
  const redirect = `${EDIT_PROFILE}/${user.id}`;

  return (
    <div className="user_container">
      <div className="avatar">
        <UserAvatar filename={user.avatar} />
      </div>

      <div className="data">
        <div>
          <span>Name:</span>{' '}{user.name}
        </div>
        <div>
          <span>Lastname:</span>{' '}{user.lastname}
        </div>
        <div>
          <span>Email:</span>{' '}{user.email}
        </div>
      </div>
      <div className="text-center">
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
