/*
* 一个用于保存持久化数据（localstorage）的工具对象模块
* 也可以用专门的库来简化localstorage的存储 store
* 这个对象具有保存、添加、删除数据的功能
* */
/*
* 最好用常量代替多个函数用到的key，出错的机率会小很多
* */
import store from 'store';

const USER_KEY = 'user_key';

export default {
  /*
  * 保存user
  * */
  saveUser(user) {
    // 要考虑空对象的情况
    // localStorage.setItem(USER_KEY,JSON.stringify(user || {}))
    store.set(USER_KEY,user)
  },

  /*
  * 读取user
  * */
  getUser() {
    // 要考虑空对象的情况
    // return JSON.parse(localStorage.getItem(USER_KEY || '{}'))
    return store.get(USER_KEY )|| {}
  },

  /*
  * 删除user
  * */
  deleteUser() {
     // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  },
}