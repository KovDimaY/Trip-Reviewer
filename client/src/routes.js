import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import User from './components/User';
import EditUserProfile from './components/EditUserProfile';
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

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)}/>
                <Route path="/login" exact component={Auth(Login, false)}/>
                <Route path="/reset-password" exact component={Auth(ResetPass, false)}/>
                <Route path="/user/logout" exact component={Auth(Logout, true)}/>
                <Route path="/user/register" exact component={Auth(Register, false)}/>
                <Route path="/user" exact component={Auth(User, true)}/>
                <Route path="/user/edit-profile/:id" exact component={Auth(EditUserProfile, true)}/>
                <Route path="/user/user-reviews" exact component={Auth(UserReviews, true)}/>
                <Route path="/user/edit-post/:id" exact component={Auth(EditTrip, true)}/>
                <Route path="/trip/add" exact component={Auth(AddTrip, true)}/>
                <Route path="/trips/:id" exact component={Auth(TripView, null)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;