import React, { Component } from 'react';
import { Layout } from 'antd';

import LeftNav from '../../component/life-nav';
import MainHeader from '../../component/main-header';
import { getItem } from '../../utils/storage-tools';
import { userConfirm } from '../../api/index';

const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
  state = {
    collapsed: false,
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
      if ( result ) return
    }
    this.props.history.replace('/login')
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <LeftNav collapsed={collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 101}}>
            <MainHeader />
          </Header>
          <Content style={{ margin: '18px 16px' }}>
            欢迎使用硅谷后台管理系统
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    );
  }
}