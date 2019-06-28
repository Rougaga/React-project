import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import PropTypes from 'prop-types';

import menuList from '../../config/menu-config'

const Item = Form.Item;
const { TreeNode } = Tree;

const treeData = menuList;

class UpdateRoleForm extends Component {
  static propTypes = {
    name : PropTypes.string.isRequired
  };

  state = {
    autoExpandParent: true,
    checkedKeys: [],
  };

  
  onCheck = (checkedKeys) => {
    //console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  

  
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });
  
  render () {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
            )(
              <Input placeholder={this.props.name} disabled/>
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll={true}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateRoleForm);