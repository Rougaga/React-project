import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './components/login';
import Main from './components/main';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Main}/>
        </Switch>
      </div>
    )
  }
}

