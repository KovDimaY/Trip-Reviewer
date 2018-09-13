import React from 'react';
import { Link } from 'react-router-dom';

import UserAvatar from './../UserAvatar';

import './styles.css';

const User = (props) => {
    const user = props.users.login;
    const redirect = `/user/edit-profile/${user.id}`;

    return (
        <div className="user_container">
            <UserAvatar filename={user.avatar} />
            <div className="data">
                <div><span>Name:</span> {user.name}</div>
                <div><span>Lastname:</span> {user.lastname}</div>
                <div><span>Email:</span> {user.email}</div>
            </div>
            <div className="text-center">
                <Link to={redirect} className="button-link">Edit Profile</Link>
            </div>
        </div>
    );
};

export default User;