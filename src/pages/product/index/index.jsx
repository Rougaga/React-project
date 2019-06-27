import React, { Component } from 'react';
import { Card, Button, Icon, Table, Select, Input } from 'antd';

import './index.less';
import DefButton from '../../../component/defined-button';
import { reqProducts } from '../../../api'

const { Option } = Select;

export default class Index extends Component {
  state = {
    categories : []
  }

  async componentDidMount() {
    const result = await reqProducts(1,3);
    if(result) {
      this.setState({
        categories : result.list
      })
    }

  }

  showAddProduct = () => {
    this.props.history.push('/product/saveupdate')
  }

  render() {
    const columns = [
      {
        title:'商品名称',
        dataIndex: 'name'
      },
      {
        title:'商品描述',
        dataIndex:'desc'
      },
      {
        title:'价格',
        dataIndex:'price'
      },
      {
        className:'status',
        title:'状态',
        dataIndex:'status',
        render:(status) => {
          return status === 1
            ? <div><Button type="primary">上架</Button> &nbsp;&nbsp;&nbsp;&nbsp;已下架</div>
            : <div><Button type="primary">下架</Button> &nbsp;&nbsp;&nbsp;&nbsp;在售</div>
        }
      },
      {
        className:'operate',
        title: '操作',
        render: (product) => {
          return <div>
            <DefButton>详情</DefButton>
            <DefButton>修改</DefButton>
          </div>
        }
      }
    ]
    const products = this.state.categories;
    return <Card
      title={
        <div>
          <Select defaultValue={0}>
            <Option value={0} key={0}>根据商品名称</Option>
            <Option value={1} key={1}>根据商品描述</Option>
          </Select>
          <Input className='search-input' placeholder='关键字'/>
          <Button type='primary'>搜索</Button>
        </div>
      }
      extra={
        <Button type='primary' onClick={this.showAddProduct}><Icon type='plus'/>添加产品</Button>
      }
    >
      <Table
        columns={columns}
        dataSource={products}
        bordered
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3
        }}
        rowKey='_id'
      />

    </Card>;
  }
}