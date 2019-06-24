import React, { Component } from 'react';
import { Card, Button, Icon, Table } from 'antd';

import DefButton from '../../component/defined-button';
import './index.less';
import { reqCategoryDate } from '../../api'


export default class Category extends Component {
  state = {
    categoryData : []
  }

  async componentDidMount(){
    const result = await reqCategoryDate('0');
    console.log(result);
    if (result) {
      this.setState({
        categoryData : result
      })
    }

  }


  render() {

    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        dataIndex: 'operation',
        className: 'left-operation',
        render: () => {
          return <div>
            <DefButton>修改名称</DefButton>
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

    return <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={this.state.categoryData}
        bordered
        pagination={{
          showSizeChanger:true,
          defaultPageSize:3,
          pageSizeOptions:['3','6','9'],
          showQuickJumper:true,
        }}
      />,
    </Card>
  }
}