import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Root from './hoc/root';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Root>,
  document.getElementById('root')
);
