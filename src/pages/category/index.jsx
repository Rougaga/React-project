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
    subCategoryData : [],
    isSubCategory : false,
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
      const {categoryName, parentId} = value;
      if (!err) {
        const result = await reqAddCategoryData(categoryName, parentId);

        if (result) {
          message.success('添加分类成功~', 2);
          form.resetFields(['parentId', 'categoryName']);

          const options = {
            isAddVisible : false,
          }

          const { isSubCategory } = this.state;

          if (result.parentId === '0') {
            options.categoryData = [...this.state.categoryData, result];
          } else if ( isSubCategory && result.parentId === this.selectCategory._id ){
            options.subCategoryData = [...this.state.subCategoryData, result]
          }

          this.setState(options)
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
          const { parentId } = this.selectCategory;
          let categoryState = this.state.categoryData;
          let stateName = 'categoryData'
          if (parentId !== '0') {
            categoryState = this.state.subCategoryData;
            stateName = 'subCategoryData'

          }
          const categoryData = categoryState.map((item) => {
            let { _id, name, parentId } = item;
            if( _id === categoryId ) {
              name = categoryName;
              return {
                _id,
                name,
                parentId
              }
            } else {
              return item;
            }
          });

          form.resetFields(['categoryName']);
          message.success('更新名称成功',2);
          //console.log(categoryData);
          this.setState({
            isUpdateVisible : false,
            [stateName]: categoryData
          })
        }
      }
    })
  }

  updateCategoryForm = (selectCategory) => {
    return () => {
      this.selectCategory = selectCategory;
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

  checkSubCategory = (selectCategory) => {
    return async () => {
      const { _id } = selectCategory;
      this.selectCategory = selectCategory;
      const result = await reqCategoryData(_id);
      if (result) {
        this.setState({
          subCategoryData : result
        })
      }
      this.setState({
        isSubCategory : true,
      })
    }
  };

  goBack = () => {
    this.setState({
      isSubCategory : false

    })
  }

  render() {

    const { categoryData,
      isAddVisible,
      isUpdateVisible,
      subCategoryData,
      isSubCategory} = this.state;

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
            {
              isSubCategory ? null : <DefButton onClick={this.checkSubCategory(selectCategory)}>查看子品类</DefButton>
            }
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
    //console.log(this.selectCategory);
    return <Card title={isSubCategory? <div><DefButton onClick={this.goBack}>一级分类</DefButton><Icon type={'arrow-right'}/>&nbsp;{this.selectCategory.name}</div> : "一级分类列表"}
                 extra={<Button type="primary" onClick={this.addCategoryForm}><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={isSubCategory ? subCategoryData : categoryData}
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