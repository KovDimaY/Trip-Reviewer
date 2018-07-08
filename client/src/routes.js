import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import TripView from './components/TripView';

import Layout from './hoc/layout'

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/trips/:id" exact component={TripView}/>
            </Switch>
        </Layout>
    );
};

export default Routes;