/*
* root component
* */
import React, {Component} from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>    {/* 只匹配一个组件 */}
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>
        </Switch>

      </BrowserRouter>


    )
  }

}

export default App