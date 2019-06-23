import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'

import menuList from '../../config/menu-config'
import './index.less'
import logo from '../../assets/images/logo.png'

const { SubMenu, Item } = Menu;

class LeftNav extends Component {
  static propTypes = {
    collapsed : PropTypes.bool.isRequired
  }

  createMenu = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </Link>
    </Item>
  }
  componentWillMount(){
    const { pathname } = this.props.history.location;
    this.selectNav = pathname;
    this.menus = menuList.map((menu) => {
      const { children } = menu;
      if (!children) {
        return this.createMenu(menu)
      }else{
        return <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }
        >
          {
            children.map((item) => {
              if (pathname === item.key) {
                this.openNav = menu.key;
              }
              return this.createMenu(item)
            })
          }
        </SubMenu>
      }
    })

  }

  render() {
    return <div>
      <Link className="left-nav-head" to="/home">
        <img src={logo} alt="logo"/>
        <h1 style={{display:this.props.collapsed?'none':'block'}}>硅谷后台</h1>
      </Link>
      <Menu theme="dark" defaultSelectedKeys={[this.selectNav]} defaultOpenKeys={[this.openNav]} mode="inline">
        { this.menus }
        {/*<Item key="1">
          <Icon type="home" />
          <span>首页</span>
        </Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              <span>商品</span>
            </span>
          }
        >
          <Item key="2">
            <Icon type="user" />
            <span>品类管理</span>
          </Item>
          <Item key="3">
            <Icon type="user" />
            <span>商品管理</span>
          </Item>
        </SubMenu>
        <Item key="4">
          <Icon type="user" />
          <span>用户管理</span>
        </Item>
        <Item key="5">
          <Icon type="file" />
          <span>权限管理</span>
        </Item>
        <SubMenu
          key="sub2"
          title={
            <span>
                  <Icon type="team" />
                  <span>图形图表</span>
                </span>
          }
        >
          <Item key="6">
            <Icon type="file" />
            <span>柱形图</span>
          </Item>
          <Item key="8">
            <Icon type="file" />
            <span>折线图</span>
          </Item>
          <Item key="9">
            <Icon type="file" />
            <span>饼图</span>
          </Item>
        </SubMenu>*/}
      </Menu>
    </div>;
  }
}

export default withRouter(LeftNav)