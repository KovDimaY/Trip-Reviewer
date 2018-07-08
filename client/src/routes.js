import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './containers/Login';
import TripView from './components/TripView';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)}/>
                <Route path="/login" exact component={Auth(Login, false)}/>
                <Route path="/trips/:id" exact component={Auth(TripView, null)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;