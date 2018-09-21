import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
    componentWillMount() {
        axios
        .get(`/api/logout`)
        .then(this.handleResponce);
    }

    handleResponce() {
        setTimeout(this.redirectToHome, 2000);
    }

    redirectToHome() {
        this.props.history.push('/');
    }

    render () {
        return (
            <div className="logout_container">
                <h1>
                    Sorry to see you go :(
                </h1>
            </div>
        );
    }
};

export default Logout;