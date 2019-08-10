import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
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
    const form = this.props.form;
    // 用form对象中的方法获取两个表单的值，一个对象{username: "wenzehai", password: "123"}
    const values = form.getFieldsValue();
  };

  render() {
    const form = this.props.form;
    const { getFieldDecorator } = form;

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
                {getFieldDecorator('username',{
                  rules:[
                    {required:true,whitespace:true,message:'请输入用户名！'},
                    {min:4,message:'请至少输入4位！'},
                    {max:12,message:'最多输入12位！'},
                    {whitespace:true,message:'请勿输入空格！'},
                    {pattern:/^[a-zA-Z0-9_]+$/,message:'以字母、数字、下划线开头！'},
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="Username"
                  />
                )}

              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password',{
                  // 声明式验证：直接使用别人定义好的验证规则进行验证
                  rules:[
                    {required:true,message:'请输入用户名！'},
                    {min:4,message:'请至少输入4位！'},
                    {max:12,message:'最多输入12位！'},
                    {whitespace:true,message:'请勿输入空格！'},
                    {pattern:/^[a-zA-Z0-9_]+$/,message:'以字母、数字、下划线开头！'},
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
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

export default WrappedLogin;