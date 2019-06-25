import React, { Component } from 'react';
import { Form, Select, Input } from "antd";
import PropTypes from 'prop-types';

const { Item } = Form;
const { Option } = Select;

class CategoryForm extends Component {
  static propTypes = {
    categoryData : PropTypes.array.isRequired
  }

  validator = (rule, value, callback) => {
    if (!value) return callback('请输入分类名称');
    const result = this.props.categoryData.find((item) => item.name === value)
    if (result) {
      callback('分类名称已存在')
    } else {
      callback()
    }

  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return <Form>
      <Item label='所属分类'>
        {
          getFieldDecorator(
            'parentId',{
              initialValue : '0'
            }
          )(
            <Select style={{ width: '100%' }} >
              <Option value="0">一级分类</Option>
              {
                this.props.categoryData.map((item) => {
                  return <Option value={item._id} key={item._id}>{item.name}</Option>
                })
              }
            </Select>
          )
        }

      </Item>
      <Item label='分类名称'>
        {
          getFieldDecorator(
            'categoryName',
            {
              rules : [
                {validator : this.validator}
              ]
            }
          )(
            <Input placeholder="请输入分类名称"/>
          )
        }

      </Item>
    </Form>;
  }
}
export default Form.create()(CategoryForm)