import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header/index';

const Layout = props => (
  <div>
    <Header />
    <div>
      {props.children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
