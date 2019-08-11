/*
* 专门用于发送异步ajax请求的函数模块
*  封装axios库
*  返回值是一个promise
* 
* */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type='GET') {

  // 优化目标，对请求异常进行统一处理，外面套一层promise，在请求粗错时，不去reject，而是显示错误提示
  return new Promise((resolve,reject) => {
    let promise;
    // 1.执行异步ajax请求
    //判断请求类型
    if(type === 'GET') {
      promise = axios.get(url,data)
    } else {
      promise = axios.post(url,data)
    }
    // 2.如果请求成功，调用resolve解析
    promise.then(response => {
      // 直接得到data，省略后面的处理
      resolve(response.data);
    // 3.如果失败了，不能调用reject(reason)，而是提示异常信息
    }).catch(error => {
      message.error(error.message);
    })
  })


}

// 请求登陆接口
// ajax('/login',{username:'admin',password:'admin'},'POST').then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// })