import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import logo from './logo.png';
import './index.less';

const Item = Form.Item;

class Login extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return <div className="login">
      <header className="header">
        <img src={logo} alt="logo"/>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-page">
        <h2>用户登录</h2>
        <Form className="form-con">
          <Item>
            {
              getFieldDecorator(
              'username',

              )(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                  className="input-con"/>
              )
            }
          </Item>
          <Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入密码"
              className="input-con"
            />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="input-btn">
              登录
            </Button>
          </Item>
        </Form>
      </section>
    </div>;
  }
}
export default Form.create()(Login);

