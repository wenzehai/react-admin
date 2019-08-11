import React, {Component} from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './login.less'

/*
* 登陆路由组件
* */

/*
* 不直接暴露Login组件，而是要包一层，为了取到form*
* */
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    // 得到form对象
    // const form = this.props.form;
    // 用form对象中的方法获取两个表单的值，一个对象{username: "wenzehai", password: "123"}
    // const values = form.getFieldsValue();

    // 对所有的表单项进行验证
    // async 放到函数定义的左侧
    this.props.form.validateFields(async (err, values) => {
      // 如果验证通过，对操作值进行处理
      if (!err) {  // 向后台提交登陆ajax请求
        const {username, password} = values;
        // await的含义是等待，一直等到请求返回一个成功的数据
        const result = await reqLogin(username, password);
        // console.log('请求成功', response.data);
        if(result.status === 0){  //登陆成功
          message.success('登陆成功');
          const user = result.data;
          // 跳转之前保存user在内存中
          memoryUtils.user = user;
          // 还要存在storageUtil中
          storageUtils.saveUser(user);

          // 跳转到管理界面,所有的路由组件都有history属性，不需要再回退，所以用replace

          this.props.history.replace('/');
        } else {    //登陆失败
          message.error(result.msg);
        }
      } else {
        // 前台校验失败
        console.log('校验失败')
      }
    });
  };

  /*
  * 对密码进行自定义验证
  * */

  validatePwd = (rule, value, callback) => {

    if (!value) {               // 如果密码不存在
      callback('请输入用密码');
    } else if (value.length < 4) {       // 如果密码长度小于4
      callback('密码长度需要大于4');
    } else if (value.length > 12) {     // 如果密码长度大于12
      callback('密码长度小于12');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('以字母、数字、下划线开头');
    } else {
      callback();
    }
    // 验证通过
    // callback();
    // 验证失败，并指定提示的文本
    // callback('验证失败');
  };


  render() {
    // 如果用户已经登陆，自动跳转到管理界面
    const user = memoryUtils.user;
    if(user && user._id){
      return <Redirect to='/admin'/>
    }




    const form = this.props.form;
    const {getFieldDecorator} = form;

    return (
      <div className="login">
        <header className="login-header">
          <h1 className="site-title">岳阳城建项目库</h1>
        </header>
        <section className="login-content">
          <div className="login-form-wrap">
            <h2 className='login-form-title'>用户登陆</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              {/* getFieldDecorator里面的Input不是一个组件，而是一个组件标签 */}
              <Form.Item>
                {getFieldDecorator('username', {
                  // 声明式验证：直接使用别人定义好的验证规则进行验证
                  rules: [
                    {required: true, whitespace: true, message: '请输入用户名！'},
                    {min: 4, message: '请至少输入4位！'},
                    {max: 12, message: '最多输入12位！'},
                    {whitespace: true, message: '请勿输入空格！'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '以字母、数字、下划线开头！'}
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="请输入用户名"
                  />
                )}

              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="请输入密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登陆
                </Button>
              </Form.Item>
            </Form>

          </div>
        </section>
      </div>
    )
  }
}

/*
* 1.高阶函数 create()
*  1).一类特别的函数
*    a.接收函数类型的参数
*    b.返回值是函数
*  2).常见
*    a.定时器： setTimeout()/setInterval()
*    b.Promise: Promise(()=>{}).then(value => {}, reason => {})
*    c.数组遍历相关的方法： forEach()/filter()/map()/reduce()/find()/findIndex()
*    d.fn.bind()，返回一个新的方法
*    e.Form.create()/getFieldDecorator()
* 2.高阶组件
*  1).本质就是一个函数
*  2).接受一个组件，返回一个新的组件（包装组件），包装组件会向被包装的组件内部传入特定属性
*  3).作用：扩展组件的功能
*  4).高阶组件也是一个高阶函数：接收一个组件函数，返回时一个新的组件函数
* */
/*
* 包装Form组件，生成一个新的组件：WrappedLogin
* WrappedLogin组件会给原来的组件传递一个form对象，这个form具有获取数据，进行表单验证等一些列功能
* */
const WrappedLogin = Form.create()(Login);

export default WrappedLogin


/*
* async 和 await
* 1.作用
*   简化promise的使用，不用再使用then()来指定成功/失败的回调函数
*   以同步编码方式实现异步流程，（一旦存在回调函数，就可以看作是异步编程）
* 2.哪里写await？
*   再返回的promise的表达式左侧写await：不想要promise，而想要promise异步执行成功返回的value数据
* 3.哪里写async？
*   await所在函数（最近的）定义的左侧写async
*
*
* */;