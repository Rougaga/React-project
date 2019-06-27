import React, { Component } from 'react';
import { Card, Button, Icon, Table, Select, Input } from 'antd';

import './index.less';
import DefButton from '../../../component/defined-button';
import { reqProducts } from '../../../api'

const { Option } = Select;

export default class Index extends Component {
  state = {
    categories : [],
    loading : true,
    total : 0
  };

  componentDidMount() {
    this.getProducts(1,3)
  }

  showAddProduct = () => {
    this.props.history.push('/product/saveupdate')
  };

  getProducts = async (pageNum,pageSize) => {
    const result = await reqProducts(pageNum,pageSize);

    this.setState({
      loading : true
    });
    if (result) {
      this.setState({
        categories : result.list,
        loading : false,
        total : result.total
      })
    }

  };

  showUpdateProduct = (product) => {
    return () => {
      this.props.history.push('/product/saveupdate', product)
    }
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
            <DefButton onClick={this.showUpdateProduct(product)}>修改</DefButton>
          </div>
        }
      }
    ]
    const { categories, total, loading } = this.state;
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
        dataSource={categories}
        bordered
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3,
          total,
          onChange: this.getProducts,
          //onShowSizeChange: this.getProducts
        }}
        rowKey='_id'
        loading={loading}
      />

    </Card>;
  }
}