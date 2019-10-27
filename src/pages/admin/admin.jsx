import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import SiteHeader from '../../components/site-header/site-header'
import Home from '../../pages/home/home.jsx'
import Category from '../../pages/category/category.jsx'
import Product from '../../pages/product/product.jsx'
import Role from '../../pages/role/role.jsx'
import User from '../../pages/user/user.jsx'
import Bar from '../../pages/charts/bar.jsx'
import Line from '../../pages/charts/line.jsx'
import Pie from '../../pages/charts/pie.jsx'

const {Content, Footer, Sider} = Layout;
/*
* 主页路由组件
* */
export default class Admin extends Component {

  render() {
    // 有可能是空对象，所以要处理一下
    const user = memoryUtils.user;
    if (!user || !user._id) {
      // 如果内存中没有存储user，说明当前没有登陆，
      return <Redirect to='/login'/>
      // 下面的方法用在事件回调中跳转
      // this.props.history.replace('/login')

      // 刷新后，内存中没有user了，需要做一个登陆持久化功能

    }
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <LeftNav/>
        </Sider>
        <Layout style={{marginLeft: 200, height: '100vh'}}>
          <SiteHeader style={{background: '#fff', padding: 0}}/>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div style={{padding: 24, background: '#fff'}}>
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/category" component={Category}/>
                <Route path="/product" component={Product}/>
                <Route path="/role" component={Role}/>
                <Route path="/user" component={User}/>
                <Route path="/charts/bar" component={Bar}/>
                <Route path="/charts/line" component={Line}/>
                <Route path="/charts/pie" component={Pie}/>
                <Redirect to="/home"/>
              </Switch>




            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}