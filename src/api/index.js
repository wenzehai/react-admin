/*
* 包含应用中所有接口请求的模块
* 返回一个包含多个函数的对象
* 分别暴露
* */
// import jsonp from 'jsonp'
// import {message} from 'antd'
import ajax from './ajax'

const BASE = ''
/*
* 登陆请求接口
* */

export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST')

/*
* 添加用户接口
* 传递一个user对象作为参数，包含的内容有{username,password,phone,email,userRole}
* */
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',{user},'POST')



/*
json请求的接口请求函数
 */
/*export const reqWeather = (city) => {
  return new Promise((resolve, reject)=>{
    // const url= `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    const url= ` `;
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log('jsonp()', err, data);
      // 如果成功了
      if(!err && data.status === 'success'){
        //取出需要的数据
        const {dayPictureUrl, weather} = data.result[0].weather_data[0];
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败！')
      }
    })
  })
};*/



// reqWeather('beijing');

