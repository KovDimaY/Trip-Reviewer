import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import data from '../../constants/navigation-items';

import Wrapper from './Wrapper';
import Label from './Label';
import Icon from './Icon';

const WIDTH_LIMIT = 1024;

const SidenavItem = ({ item, users, sidenav }) => {
  const element = (
    <Wrapper to={data[item].link} sidenav={sidenav} limit={WIDTH_LIMIT}>
      <Icon name={data[item].icon} />
      <Label sidenav={sidenav} limit={WIDTH_LIMIT}>{data[item].text}</Label>
    </Wrapper>
  );

  const showItem = () => {
    if (users.login) {
      if (users.login.isAuth) {
        return !data[item].exclude
          ? element
          : null;
      }
      return !data[item].restricted
        ? element
        : null;
    }
    return null;
  };

  return (
    <React.Fragment>
      {showItem()}
    </React.Fragment>
  );
};

SidenavItem.propTypes = {
  users: PropTypes.object.isRequired,
  item: PropTypes.string.isRequired,
  sidenav: PropTypes.bool,
};

SidenavItem.defaultProps = {
  sidenav: false,
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(SidenavItem);
