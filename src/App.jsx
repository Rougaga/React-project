import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './pages/login';
import Main from './pages/main';

export default function App() {
  return (
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/' component={Main}/>
    </Switch>
  )
}

