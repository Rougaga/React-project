import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';

import logo from './logo.png';
import './index.less';

const Item = Form.Item;

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error,values) => {
      if(!error){
        const { username, password } = values;
        axios.post('/login',{ username, password })
          .then((res) => {
            const { data } = res;
            if (data.status === 0){
              //成功
              this.props.history.replace('/')
            }else {
              //失败
              message.error(data.msg, 2);
              this.props.form.resetFields(['password'])
            }
          })
          .catch(() => {
            message.error('网络连接错误，请刷新页面',2);
            this.props.form.resetFields(['password'])
          })
      }else {
        console.log('表单校验失败：',error);
      }
    })
  };

  validator(rule,value,callback) {
    const name = rule.fullField === 'password'?'密码':'用户名';
    if(value.length < 4){
      callback(`${name}的长度必须大于4位`)
    }else if(value.length>11){
      callback(`${name}的长度必须小于11位`)
    }else if(!/^[a-zA-Z_0-9]+$/.test(value)){
      callback(`${name}只能包括字母、数字、下划线`)
    }else {
      callback()
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return <div className="login">
      <header className="header">
        <img src={logo} alt="logo"/>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-page">
        <h2>用户登录</h2>
        <Form className="form-con" onSubmit={this.handleSubmit}>
          <Item>
            {
              getFieldDecorator(
                'username',
                /*{rules : [
                    {max:11, message:'用户名长度不可超过11位'},
                    {min:4, message:'用户名长度不可低于4位'},
                    {required:true, message:'必须填写用户名'},
                    {pattern:/^[a-zA-Z_0-9]+$/, message:'用户名只能包括字母、数字、下划线'}
                 ]}*/
                {rules : [
                  {validator : this.validator}
                ]}
              )(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                  className="input-con"/>
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {rules : [
                  {validator : this.validator}
                ]}
              )(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入密码"
                  className="input-con"
                />
              )
            }

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

