import React from 'react';
import Home from './components/Home/Home';
import Add from './components/Add/Add';
import {Switch, Route} from 'react-router-dom';

const AppRouter =  () => (
    <Switch>
        <Route exact path='/add' component={Add}/>
        <Route path='/' component={Home}/>
    </Switch>
);

export default AppRouter;
