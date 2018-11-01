import { combineReducers } from 'redux';

import trips from './trips';
import users from './users';

const rootReducer = combineReducers({
  trips,
  users,
});

export default rootReducer;
