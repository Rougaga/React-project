import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom'

import LeftNav from '../../component/life-nav';
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
    success : false,
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
        return this.setState({
          isLoading : false,
          success : true
        })
      }
    }
    this.setState({
      isLoading: false,
      success: false
    })
  }

  render() {
    const { collapsed, success, isLoading } = this.state;
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
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout> :  <Redirect to='/login'/>;
  }
}