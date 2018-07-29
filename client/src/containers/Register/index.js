import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

class Register extends PureComponent {
    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
    }

    componentWillMount() {
        this.props.dispatch(getUsers());
    }

    handleInputEmail = (event) => {
        this.setState({ email: event.target.value });
    } 

    handleInputPassword= (event) => {
        this.setState({ password: event.target.value });
    }

    handleInputName = (event) => {
        this.setState({ name: event.target.value });
    }

    handleInputLastname = (event) => {
        this.setState({ lastname: event.target.value });
    } 

    componentWillReceiveProps(nextProps) {
        if (nextProps.users.login.isAuth) {
            this.props.history.push('/user');
        } else if (nextProps.users.register === false) {
            this.setState({ error: 'Error, try again' });
        } else {
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: ''
            });
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        this.setState({ error: '' });

        this.props.dispatch(
            userRegister({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                lastname: this.state.lastname
            })
        )
    }

    showUsers = ({ users }) => (
        users 
        ? users.map(item => 
            (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                </tr>
            ))
        : null
    )

    render() {
        const { users } = this.props;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Sing Up</h2>
                    
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Lastname"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>

                    <button type="submit">Sign Up</button>
                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
                <div className="current_users">
                    <h4>Current users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(users)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        users: state.users
    }
}

export default connect(mapStateToProps)(Register)