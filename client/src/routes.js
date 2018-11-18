import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './components/404';
import Home from './containers/Home';
import User from './components/User';
import EditUserProfile from './containers/EditUserProfile';
import Logout from './components/Logout';
import Login from './containers/Login';
import ResetPass from './containers/ResetPass';
import Register from './containers/Register';
import AddTrip from './containers/AddTrip';
import EditTrip from './containers/EditTrip';
import TripView from './containers/TripView';
import UserReviews from './containers/UserReviews';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import * as routes from './constants/routes';

const Routes = () => (
  <Layout>
    <Switch>
      <Route path={routes.HOME} exact component={Auth(Home, null)} />
      <Route path={routes.LOGIN} exact component={Auth(Login, false)} />
      <Route path={routes.RESET} exact component={Auth(ResetPass, false)} />
      <Route path={routes.LOGOUT} exact component={Auth(Logout, true)} />
      <Route path={routes.REGISTER} exact component={Auth(Register, false)} />
      <Route path={routes.USER_PROFILE} exact component={Auth(User, true)} />
      <Route path={routes.USER_REVIEWS} exact component={Auth(UserReviews, true)} />
      <Route path={`${routes.EDIT_PROFILE}`} exact component={Auth(EditUserProfile, true)} />
      <Route path={`${routes.EDIT_POST}/:id`} exact component={Auth(EditTrip, true)} />
      <Route path={routes.ADD_TRIP} exact component={Auth(AddTrip, true)} />
      <Route path={`${routes.TRIPS}/:id`} exact component={Auth(TripView, null)} />
      <Route path="*" component={Auth(NotFound, null)} />
    </Switch>
  </Layout>
);

export default Routes;
