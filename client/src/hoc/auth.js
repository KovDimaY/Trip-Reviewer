import React, { Component } from 'react';
import { connect } from 'react-redux';

import { auth } from './../actions';
import * as routes from './../constants/routes';

export default function(ComposedClass, reload) {
    class AuthenticationCheck extends Component {
        state = {
            loading: true
        };

        componentWillMount() {
            this.props.dispatch(auth());
        }

        componentWillReceiveProps(nextProps) {
            this.setState({ loading: false });

            if (!nextProps.users.login.isAuth) {
                if (reload) {
                    this.props.history.push(routes.LOGIN);
                }
            } else {
                if (reload === false) {
                    this.props.history.push(routes.USER_PROFILE);
                }
            }
        }

        render() {
            if (this.state.loading) {
                return <div className="loader">Loading...</div>;
            }
            return <ComposedClass {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            users: state.users
        };
    };

    return connect(mapStateToProps)(AuthenticationCheck);
}