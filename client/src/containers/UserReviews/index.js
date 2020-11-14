import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-js';

import EmptyView from '../../components/Common/EmptyViewAddTrip';
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

  renderUserPosts = userPosts =>
    userPosts.map(item => (
      <tr key={item._id}>
        <td className="post-title">
          <Link to={`${EDIT_POST}/${item._id}`}>{item.title}</Link>
        </td>
        <td className="only-wide-screen">{item.country}</td>
        <td>{moment(item.createdAt).format('MM/DD/YY')}</td>
      </tr>
    ));

  renderContent(userPosts) {
    if (userPosts && userPosts.length > 0) {
      return (
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="only-wide-screen">Country</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.renderUserPosts(userPosts)}</tbody>
        </table>
      );
    } else if (userPosts) {
      return <EmptyView message="You do not have any story yet." buttonText="Add my first story" />;
    }

    return null;
  }

  render() {
    const { userPosts } = this.props.users;

    return (
      <div className="user-posts-container limited-width">
        <h2>My stories</h2>
        {this.renderContent(userPosts)}
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
