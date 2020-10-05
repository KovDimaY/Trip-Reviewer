import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import NavigationItem from '../../containers/NavigationItem';
import SideNav from '../Sidenav';
import {
  home,
  userProfile,
  signup,
  login,
  userReviews,
  addTrip,
  logout,
} from '../../constants/navigation-items';

import './styles.css';

class Header extends Component {
  state = {
    showNav: false,
  };

  handleHideNav = () => {
    window.removeEventListener('resize', this.handleHideNav);
    this.setState({ showNav: false });
  };

  handleOpenNav = () => {
    window.addEventListener('resize', this.handleHideNav);
    this.setState({ showNav: true });
  };

  render() {
    return (
      <header className="header-container">
        <div className="only-mobile">
          <div className="open-nav">
            <FontAwesome
              name="bars"
              onClick={this.handleOpenNav}
              style={{
                color: '#ffffff',
                padding: '10px',
                cursor: 'pointer',
              }}
            />
          </div>
          <SideNav showNav={this.state.showNav} onHideNav={this.handleHideNav} />
        </div>

        <div className="only-desktop">
          <div className="left-side">
            <NavigationItem item={home} />
            <NavigationItem item={userReviews} />
            <NavigationItem item={addTrip} />
          </div>

          <div className="right-side">
            <NavigationItem item={userProfile} />
            <NavigationItem item={login} />
            <NavigationItem item={signup} />
            <NavigationItem item={logout} />
          </div>
        </div>

        <Link to="/" className="logo">
          Travel Stories
        </Link>
      </header>
    );
  }
}

export default Header;
