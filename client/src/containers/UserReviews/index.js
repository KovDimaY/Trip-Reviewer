import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-js';

import { getUserReviews } from '../../actions';
import { EDIT_POST } from '../../constants/routes';

class UserPosts extends Component {
  componentWillMount() {
    const { login } = this.props.users;
    if (login && login.id) {
      this.props.dispatch(getUserReviews(login.id));
    }
  }

  showUserPosts = ({ userPosts }) => (
    userPosts
      ? userPosts.map(item => (
        <tr key={item._id}>
          <td>
            <Link to={`${EDIT_POST}/${item._id}`}>
              {item.title}
            </Link>
          </td>
          <td>
            {item.author}
          </td>
          <td>
            {moment(item.createAt).format('MM/DD/YY')}
          </td>
        </tr>
      ))
      : null
  )

  render() {
    const { users } = this.props;

    return (
      <div className="user_posts">
        <h4>
          Your reviews:
        </h4>
        <table>
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Author
              </th>
              <th>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {this.showUserPosts(users)}
          </tbody>
        </table>
      </div>
    );
  }
}

UserPosts.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(UserPosts);
