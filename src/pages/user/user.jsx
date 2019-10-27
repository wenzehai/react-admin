import React, {Component} from 'react';
import {Card} from 'antd'
import Form01 from '../../components/form';
/*
* 用户路由
* */


export default class User extends Component {

  render() {
    return (
      <div>
        <Card title="表单01" extra={<a href="http://www.baidu.com">更多</a>}>

          <Form01/>


        </Card>

      </div>


    )
  }
}