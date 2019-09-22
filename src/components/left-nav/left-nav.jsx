import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu, Icon} from "antd";
import img from '../../assets/images/logo.png';
import './left-nav.less'
import menuList from '../../config/menuConfig';

const SubMenu = Menu.SubMenu;

class LeftNav extends Component {

  //根据数据动态生成菜单
  getMenuNodes = (menuList) => {
    /*
      * map方法的实现
      * */
    {/*return menuList.map(item => {*/}

      {/*if (item.children) {*/}
        {/*return (*/}
    //       <SubMenu
    //         key={item.key}
    //         title={
              {/*<span>*/}
                {/*<Icon type={item.icon}></Icon>*/}
    //             <span>{item.title}</span>
    //           </span>
    //         }>
    //         {this.getMenuNodes(item.children)}
    //       </SubMenu>
    //     );
    //   } else {
    //     return (<Menu.Item key={item.key}>
    //       <Link to={item.key}>
    //         <Icon type={item.icon}/>
    //         <span className="nav-text">{item.title}</span>
    //       </Link>
    //     </Menu.Item>);
    //   }
    // });

    // pre 上一次统计的数组
    return menuList.reduce((pre, item) => {
      // 向pre中添加<Menu.item/> 或者 <SubMenu/>
      if(!item.children){
        pre.push((<Menu.Item key={item.key}>
                 <Link to={item.key}>
                   <Icon type={item.icon}/>
                   <span className="nav-text">{item.title}</span>
                 </Link>
               </Menu.Item>))
      } else {
        pre.push(( <SubMenu
                   key={item.key}
                   title={
                    <span>
                    <Icon type={item.icon}></Icon>
                     <span>{item.title}</span>
                   </span>
                 }>
                 {this.getMenuNodes(item.children)}
               </SubMenu>))
      }
      return pre;
    },[]);
  };


  render() {

    // 得到当前请求的路由路径
    const path = this.props.location.pathname;


    return (
      <div className="left-nav">
        <Link to='/'>
          <div className="logo-wrap">
            <img className='logo' src={img}/>
            <h2>电商平台</h2>
          </div>
        </Link>
        <Menu theme="dark" mode="inline" selectedKeys={[path]}>
          {
            this.getMenuNodes(menuList)
          }
        </Menu>
      </div>
    )
  }
}

// 高阶组件，包装一个已有组件，返回一个新组件，新组件向已有组件传递数据
export default withRouter(LeftNav);