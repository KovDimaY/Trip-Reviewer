import React from 'react';

import Header from '../components/Header/index';

const Layout = props => (
  <div>
    <Header />
    <div>
      {props.children}
    </div>
  </div>
);

export default Layout;
