import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'

import menuList from '../../config/menu-config'
import './index.less'
import logo from '../../assets/images/logo.png'
import { getItem } from "../../utils/storage-tools";

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
    let { pathname } = this.props.location;
    const { role : { menus } } = getItem();
    //console.log(getItem());

    const pathnameReg = /^\/product\//;

    if (pathnameReg.test(pathname)) {
      pathname = pathname.slice(0, 8);
    }

    this.menus = menuList.reduce((prev,curr) => {
      const children = curr.children;
      //console.log(menuList);
      if(children){
        let isSubMenuShow = false;
        const subMenu = <SubMenu
          key={curr.key}
          title={
            <span>
              <Icon type={curr.icon} />
              <span>{curr.title}</span>
            </span>
          }
        >{
          children.reduce((prev,current) => {
            const menu = menus.find((item) => item === current.key);
            if(menu){
              if (pathname === curr.key) {
                this.openNav = curr.key;
              }
              isSubMenuShow = true;
              return [...prev, this.createMenu(current)]
            }else{
              return prev;
            }

          },[])
        }
        </SubMenu>

        return isSubMenuShow ? [...prev, subMenu] : prev;
      } else {
        const menu = menus.find((menu) => menu === curr.key);

        if(menu){
          return [...prev, this.createMenu(curr)]
        }else{
          return prev
        }
      }
    },[])
    /*this.selectNav = pathname;
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
    })*/

  }

  render() {
    return <div>
      <Link className="left-nav-head" to="/home">
        <img src={logo} alt="logo"/>
        <h1 style={{display:this.props.collapsed?'none':'block'}}>硅谷后台</h1>
      </Link>
      <Menu theme="dark" defaultSelectedKeys={[this.selectNav]} defaultOpenKeys={[this.openNav]} mode="inline">
        { this.menus }
      </Menu>
    </div>;
  }
}

export default withRouter(LeftNav)