/*
* entry file
* */
import React from 'react';
import ReactDOM from 'react-dom';
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import App from './app';
import './assets/css/style.less'


// 一进来就读取local中保存的user，放到内存中去
// 更快，统一的读
const user = storageUtils.getUser();
memoryUtils.user = user;

// 将App组件渲染到index页面的div上
ReactDOM.render(<App/>, document.getElementById('root'));