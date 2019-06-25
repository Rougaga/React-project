import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';

import CategoryForm from './caregory-form'
import UpdateCategoryForm from './update-category-form'
import DefButton from '../../component/defined-button';
import './index.less';
import { reqCategoryData, reqAddCategoryData, reqUpdateCategoryName } from '../../api'



export default class Category extends Component {
  state = {
    categoryData : [],
    isAddVisible : false,
    isUpdateVisible : false
  };

  selectCategory = {};

  async componentDidMount(){
    const result = await reqCategoryData('0');
    if (result) {
      this.setState({
        categoryData : result
      })
    }
  }

  addCategoryForm = () => {
    this.setState({
      isAddVisible : true
    })
  }

  addCategory = () => {
    const { form } = this.getAddCategory.props;
    form.validateFields( async (err, value) => {
      if (!err) {

        const {categoryName, parentId} = value;
        const result = await reqAddCategoryData(categoryName, parentId);
        if (result) {
          console.log(result);
          message.success('添加分类成功~', 2);
          form.resetFields(['parentId', 'categoryName']);

          const option = {
            isAddVisible : false,
          }

          if (result.parentId === '0') {

              option.categoryData = [...this.state.categoryData, result]

          }

          this.setState({option})
        }
      }
    })
  }

  cancelAdd = () => {
    this.setState({
      isAddVisible : false
    })
  }

  updateCategory = () => {
    const { form } = this.getUpdateCategory.props;
    form.validateFields(async (err,value) => {
      if (!err) {
        const { categoryName } = value;
        const categoryId = this.selectCategory._id;
        const result = await reqUpdateCategoryName(categoryId, categoryName);
        if (result) {
          const categoryData = this.state.categoryData.map((item) => {
            let { _id, name, parentId } = item;
            if( _id === categoryId ) {
              name = categoryName;
              return {
                _id,
                name,
                parentId
              }
            }else{
              return item;
            }

          });
          console.log(categoryData);
          form.resetFields(['categoryName']);
          message.success('更新名称成功',2);

          this.setState({
            isUpdateVisible : false,
            categoryData
          })
        }
      }
    })
  }

  updateCategoryForm = (selectCategory) => {
    return () => {
      this.selectCategory = selectCategory;
      //console.log(this.selectCategory.name);
      this.setState({
        isUpdateVisible : true
      })
    }

  }

  cancelUpdateForm = () => {
    this.getUpdateCategory.props.form.resetFields(['categoryName'])
    this.setState({
      isUpdateVisible : false
    })
  }

  render() {

    const { categoryData, isAddVisible, isUpdateVisible } = this.state;

    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        //dataIndex: 'operation',
        className: 'left-operation',
        render: (selectCategory) => {

          return <div>
            <DefButton onClick={this.updateCategoryForm(selectCategory)}>修改名称</DefButton>
            <DefButton>查看子品类</DefButton>
          </div>

        },
      },

    ];

    /*const data = [
      {
        key: '1',
        name: '手机',

      },
      {
        key: '2',
        name: '电脑',
      },
      {
        key: '3',
        name: '平板',
      },
      {
        key: '4',
        name: '耳机',
      },
    ];*/

    return <Card title="一级分类列表" extra={<Button type="primary" onClick={this.addCategoryForm}><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={categoryData}
        bordered
        pagination={{
          showSizeChanger:true,
          defaultPageSize:3,
          pageSizeOptions:['3','6','9'],
          showQuickJumper:true,
        }}
        rowKey="_id"
      />,
      <Modal
        title="添加分类"
        visible={isAddVisible}
        onOk={this.addCategory}
        onCancel={this.cancelAdd}
        okText="确认"
        cancelText="取消"
      >
        <CategoryForm categoryData={categoryData} wrappedComponentRef={(form) => this.getAddCategory = form} />
      </Modal>

      <Modal
        title="更新分类"
        visible={isUpdateVisible}
        onOk={this.updateCategory}
        onCancel={this.cancelUpdateForm}
        okText="确认"
        cancelText="取消"
        width={300}
      >

        <UpdateCategoryForm categoryName={this.selectCategory.name} wrappedComponentRef={(form) => this.getUpdateCategory = form}/>

      </Modal>
    </Card>
  }
}