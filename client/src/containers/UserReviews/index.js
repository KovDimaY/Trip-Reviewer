import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-js';

import { getUserReviews } from '../../actions';
import { EDIT_POST } from '../../constants/routes';

import './styles.css';

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
          <td className="post-title">
            <Link to={`${EDIT_POST}/${item._id}`}>
              {item.title}
            </Link>
          </td>
          <td className="only-wide-screen">{item.country}</td>
          <td>{moment(item.createAt).format('MM/DD/YY')}</td>
        </tr>
      ))
      : null
  )

  render() {
    const { users } = this.props;

    return (
      <div className="user-posts-container">
        <h2>Your reviews</h2>
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="only-wide-screen">Country</th>
              <th>Date</th>
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
