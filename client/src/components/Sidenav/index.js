import React from 'react';
import ReactSideNav from 'react-simple-sidenav';

import { items } from './items';
import SidenavItem from '../../containers/SidenavItem/index';

const Sidenav = props => (
  <ReactSideNav
    showNav={props.showNav}
    onHideNav={props.onHideNav}
    navStyle={{
      background: '#242424',
      maxWidth: '220px',
    }}
  >
    {
      items.map(item => (
        <div key={item.id} onClick={props.onHideNav}>
          <SidenavItem item={item} />
        </div>
      ))
    }
  </ReactSideNav>
);

Sidenav.propTypes = {
  showNav: React.PropTypes.bool.isRequired,
  onHideNav: React.PropTypes.func.isRequired,
};

export default Sidenav;
