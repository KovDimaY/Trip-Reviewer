import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header/index';
import Footer from '../components/Footer/index';

const Layout = props => (
  <div>
    <Header />
    <div style={{ minHeight: '95vh' }}>{props.children}</div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
