import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Nav from '../Sidenav/index';

class Header extends Component {
    state = {
      showNav: false,
    }

    handleHideNav = () => {
      this.setState({ showNav: false });
    }

    handleOpenNav = () => {
      this.setState({ showNav: true });
    }

    render() {
      return (
        <header>
          <div className="open_nav">
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
          <Nav
            showNav={this.state.showNav}
            onHideNav={this.handleHideNav}
          />

          <Link to="/" className="logo">
                    Travel Stories
          </Link>
        </header>
      );
    }
}

export default Header;
