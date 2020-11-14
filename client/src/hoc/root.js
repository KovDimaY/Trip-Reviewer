import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const Root = props => (
  <Provider store={createStoreWithMiddleware(reducers)}>{props.children}</Provider>
);

Root.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Root;
