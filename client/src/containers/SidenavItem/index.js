import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import './styles.css';

const SidenavItem = ({ item, users }) => {
    const element = (
        <Link to={item.link} className={item.type}>
            <FontAwesome name={item.icon}/>
            {item.text}
        </Link>
    );

    const showItem = () => {
        if (users.login) {
            if (users.login.isAuth) {
                return !item.exclude 
                    ? element
                    : null;
            }
            return !item.restricted 
                ? element
                : null;
        } 
        return null;
    };
        
    return (
        <div>
            {showItem()}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(SidenavItem)