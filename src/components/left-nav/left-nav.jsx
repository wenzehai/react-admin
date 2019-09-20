import React, {Component} from 'react';
import {Menu, Icon} from "antd";
import img from '../../assets/images/logo.png';
import './left-nav.less'
export default class LeftNav extends Component {

  render() {
    return (
      <div className="left-nav">
        <div className="logo-wrap"><img className='logo' src={img} /><h2>电商平台</h2></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}