import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import SiteHeader from '../../components/site-header/site-header'

const { Content, Footer, Sider } = Layout;
/*
* 主页路由组件
* */
export default class Admin extends Component {

  render() {
    // 有可能是空对象，所以要处理一下
    const user = memoryUtils.user;
    if(!user || !user._id) {
      // 如果内存中没有存储user，说明当前没有登陆，
      return <Redirect to='/login' />
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
        <Layout style={{ marginLeft: 200, height:'100vh' }}>
          <SiteHeader style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}