/*
* 包含应用中所有接口请求的模块
* 返回一个包含多个函数的对象
* 分别暴露
* */
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