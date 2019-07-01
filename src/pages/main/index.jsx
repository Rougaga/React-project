import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom'

import LeftNav from '../../component/left-nav';
import MainHeader from '../../component/main-header';
import { getItem } from '../../utils/storage-tools';
import { userConfirm } from '../../api/index';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
  state = {
    collapsed: false,
    isLoading : true,
    success : [],
  };

  onCollapse = collapsed => {
    //console.log(collapsed);
    this.setState({ collapsed });
  };

  async componentWillMount(){
    const user = getItem();
    const id = user._id;

    if ( user && id ) {
      const result = await userConfirm(id);
      if ( result ) {
        let menus = user.role.menus;
        return this.setState({
          isLoading : false,
          success : menus.reverse()
        })
      }

    }
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { collapsed, success, isLoading, } = this.state;
    if (isLoading) return null ;
    return success ?  <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <LeftNav collapsed={collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 101}}>
            <MainHeader />
          </Header>
          <Content style={{ margin: '18px 16px' }}>
            <Switch>
              {
                success.map((item) => {
                  switch (item) {
                    case '/category':
                      return <Route path='/category' component={Category}/>;
                    case '/product':
                      return <Route path='/product' component={Product}/>;
                    case '/user':
                      return <Route path='/user' component={User}/>;
                    case '/role':
                      return <Route path='/role' component={Role}/>;
                    case '/charts/bar':
                      return <Route path='/charts/bar' component={Bar}/>;
                    case '/charts/line':
                      return <Route path='/charts/line' component={Line}/>;
                    case '/charts/pie':
                      return <Route path='/charts/pie' component={Pie}/>;
                    case '/home':
                      return <Fragment><Route path='/home' component={Home}/><Redirect to="/home" /></Fragment>
                    default:
                      return null
                  }
                })
              }
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout> :  <Redirect to='/login'/>;
  }
}