import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;

class AddUserForm extends Component {
  static propTypes = {
    roles : PropTypes.array.isRequired
  }

  validator = (rule,value,callback) => {
    const name = rule.fullField === 'password'?'密码':'用户名'

    if(!value){
      callback()
    }else if(value.length < 4){
      callback(`${name}的长度必须大于4位`)
    }else if(value.length>11){
      callback(`${name}的长度必须小于11位`)
    }else if(!/^[a-zA-Z_0-9]+$/.test(value)){
      callback(`${name}只能包括字母、数字、下划线`)
    }else {
      callback()
    }


  };

  render () {
    const {getFieldDecorator} = this.props.form;
    const { roles } = this.props;
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',
              {
                rules : [
                  {validator : this.validator},
                  {required: true, message: '请输入角色名称！'}
                ]
              }
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password',
              {
                rules : [
                  {validator : this.validator},
                  {required: true, message: '请输入角色名称！'}
                ]
              }
            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email'
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role_id',
              {
                rules : [
                  {required : true, message:'请选择分类'}
                ]
              }
            )(
              <Select placeholder='请选择分类'>
                {
                  roles.map((item) => {
                    return <Option value={item._id} key={item._id}>{item.name}</Option>
                })
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUserForm);