import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItem = ({ item, users }) => {
    const element = (
        <div className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
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