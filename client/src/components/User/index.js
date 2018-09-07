import React from 'react';
import { Link } from 'react-router-dom';

const User = (props) => {
    const user = props.user.login;
    const url = `/user/edit-profile/${user.id}`;

    return (
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png"/>
            </div>
            <div className="nfo">
                <div><span>Name:</span> {user.name}</div>
                <div><span>Lastname:</span> {user.lastname}</div>
                <div><span>Email:</span> {user.email}</div>
                <div><span>Password:</span> * * * * * * </div>
            </div>
            <div className="text-center">
                <Link to={url} className="button-link">Edit Profile</Link>
            </div>
        </div>
    );
};

export default User;