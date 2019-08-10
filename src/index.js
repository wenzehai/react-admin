/*
* entry file
* */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './assets/css/style.less'

// 将App组件渲染到index页面的div上
ReactDOM.render(<App/>, document.getElementById('root'));