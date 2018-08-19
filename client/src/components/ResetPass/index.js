import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetPassword } from '../../actions';

class ResetPass extends Component {
    state = {
        email: ''
    }

    handleInputEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users.login.isAuth) {
            this.props.history.push('/user');
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(resetPassword(this.state));
    }

    render() {
        const { users } = this.props;

        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>

                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter your mail"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <button type="submit">Reset</button>

                    <div className="error">
                    {
                        users.reset 
                            ? <div>{users.reset.message}</div>
                            : null
                    }
                    </div>

                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps)(ResetPass);