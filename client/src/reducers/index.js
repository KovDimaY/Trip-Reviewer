import { combineReducers } from 'redux';

import trips from './trips';
import user from './user';

const rootReducer = combineReducers({
    trips,
    user
});

export default rootReducer;