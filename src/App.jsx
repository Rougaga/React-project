import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './pages/login';
import Main from './pages/main';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Main}/>
      </Switch>
    )
  }
}

