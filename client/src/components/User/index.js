import React from 'react';
import { Link } from 'react-router-dom';

import UserAvatar from '../UserAvatar';
import { EDIT_PROFILE } from '../../constants/routes';

import './styles.css';

const User = (props) => {
  const user = props.users.login;
  const redirect = `${EDIT_PROFILE}/${user.id}`;

  return (
    <div className="user_container">
      <UserAvatar filename={user.avatar} />
      <div className="data">
        <div>
          <span>
            Name:
          </span>
          {' '}
          {user.name}
        </div>
        <div>
          <span>
            Lastname:
          </span>
          {' '}
          {user.lastname}
        </div>
        <div>
          <span>
            Email:
          </span>
          {' '}
          {user.email}
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
  users: React.PropTypes.object.isRequired,
};

export default User;
