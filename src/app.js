/*
* root component
* */
import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <Switch>    {/* 只匹配一个组件 */}
          <Route path='/login' component={Login}/>
          <Route path='/admin' component={Admin}/>
          <redirect component={Login} />
        </Switch>

      </BrowserRouter>


    )
  }

}

export default App