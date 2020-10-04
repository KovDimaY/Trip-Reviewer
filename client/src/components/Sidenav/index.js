import React from 'react';
import PropTypes from 'prop-types';
import ReactSideNav from 'react-simple-sidenav';

import {
  home,
  userProfile,
  signup,
  login,
  userReviews,
  addTrip,
  logout,
} from '../../constants/navigation-items';
import SidenavItem from '../../containers/NavigationItem';

const order = [home, userProfile, signup, login, addTrip, userReviews, logout];

const Sidenav = props => (
  <ReactSideNav
    showNav={props.showNav}
    onHideNav={props.onHideNav}
    navStyle={{
      background: '#242424',
      maxWidth: '220px',
    }}
  >
    {order.map(item => (
      <div key={item} onClick={props.onHideNav}>
        <SidenavItem item={item} sidenav />
      </div>
    ))}
  </ReactSideNav>
);

Sidenav.propTypes = {
  showNav: PropTypes.bool.isRequired,
  onHideNav: PropTypes.func.isRequired,
};

export default Sidenav;
