import React, { Component } from 'react';
import { Form, Input } from "antd";
import PropTypes from 'prop-types'

class UpdateCategoryForm extends Component {
  static propTypes = {
    categoryName : PropTypes.string.isRequired
  }
  validator = (rule, value, callback) => {
    if (!value) {
      callback('名称不能为空');
    } else if (this.props.categoryName === value) {
      callback('请不要用原来的名称');
    }else{
      callback();
    }

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return <Form>
      <Form.Item>
        {
          getFieldDecorator(
            'categoryName',
            {
              initialValue: this.props.categoryName,
              rules : [
                {validator : this.validator}
              ]
            }
          )(
            <Input placeholder="请输入分类名称"/>
          )
        }

      </Form.Item>
    </Form>;
  }
}
export default Form.create()(UpdateCategoryForm)