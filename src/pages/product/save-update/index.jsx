import React, { Component } from 'react';
import { Card, Button, Icon, Form, Input, Cascader, InputNumber } from 'antd';

import './index.less';
import { reqCategoryData } from '../../../api'
import RichTextEditor from "./rich-text-editer";

const { Item } = Form;

class SaveUpdate extends Component {

  state = {
    selectList : []
  }

  async componentWillMount() {
    const result = await reqCategoryData('0');
    if(result) {
      this.setState({
        selectList : result.map((item) => {
          return {
            value:item._id,
            label:item.name,
            isLeaf:false
          }
        })
      })
    }
  }

  loadData = async (selectedOptions) => {
    //console.log(selectedOptions);
    const selected =selectedOptions[0];
    selected.loading = true;
    const result = await reqCategoryData(selected.value);
    if(result) {
      //console.log(result);
      selected.loading = false;
      selected.children = result.map((item) => {
        return{
          value:item._id,
          label:item.name,
        }
      })
      this.setState({
        selectList : [...this.state.selectList]
      })
    }
  }

  goBackIndex = () => {
    this.props.history.push('/product/index')
  }

  addCategory = () => {
    this.props.form.validateFields((err,values) => {
      if (!err) {
        console.log(values);
      }
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    return <Card
      title={
        <div className='product-title'>
          <Icon className='goback' type='arrow-left' onClick={this.goBackIndex}/>
          添加商品
        </div>
      }
    >
      <Form {...formItemLayout}>
        <Item label='商品名称'>
          {
            getFieldDecorator(
              'name',
              {
                rules : [
                  {required:true,message:'请输入商品名称'}
                ]
              }
            )(
              <Input placeholder='请输入商品名称'/>
            )
          }

        </Item>
        <Item label='商品描述'>
          {
            getFieldDecorator(
              'desc',
              {
                rules : [
                  {required:true,message:'请输入商品描述'}
                ]
              }
            )(
              <Input placeholder='请输入商品描述'/>
            )
          }

        </Item>
        <Item label='选择分类' wrapperCol={{span: 5}}>
          {
            getFieldDecorator(
              'categoriesId',
              {
                rules : [
                  {required:true,message:'请选择商品分类'}
                ]
              }
            )(
              <Cascader
                placeholder='请选择分类'
                options={this.state.selectList}
                loadData={this.loadData}
                changeOnSelect
              />
            )
          }

        </Item>
        <Item label='商品价格'>
          {
            getFieldDecorator(
              'price',
              {
                rules : [
                  {required:true,message:'请输入商品价格'}
                ]
              }
            )(
              <InputNumber
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
              />
            )
          }

        </Item>
        <Item label='商品详情' wrapperCol={{span: 20}}>
          <RichTextEditor/>
        </Item>
        <Button onClick={this.addCategory} type='primary' htmltype='submit' className='submit-btn'>提交</Button>
      </Form>

    </Card>;
  }
}

export default Form.create()(SaveUpdate)