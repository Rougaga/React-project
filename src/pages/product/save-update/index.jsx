import React, { Component } from 'react';
import { Card, Button, Icon, Form, Input, Cascader, InputNumber } from 'antd';
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";

import RichTextEditor from './rich-text-editor';
import './index.less';
import { reqCategoryData, reqAddProduct } from '../../../api'

const { Item } = Form;

class SaveUpdate extends Component {
  detailMsgRef = React.createRef();

  state = {
    selectList : []
  };

  getCategory = async (parentId) => {
    const result = await reqCategoryData(parentId);
    if(result) {
      if ( parentId === '0') {
        this.setState({
          selectList : result.map((item) => {
            return {
              value:item._id,
              label:item.name,
              isLeaf:false
            }
          })
        })
      } else {
        this.setState({
          selectList : this.state.selectList.map((category) => {
            if (parentId === category.value){
              category.children = result.map((item) => {
                return {
                  value:item._id,
                  label:item.name,
                }
              })
            }
            return category
          })
        })
      }
    }
  }

  componentWillMount() {
    this.getCategory('0');

    const product = this.props.location.state;
    let id = [];
    if ( product.pCategoryId !== '0' ) {
      id.push(product.pCategoryId);
      this.getCategory(product.pCategoryId)
    }
    id.push(product.categoryId);
    this.id = id;
  }

  loadData = async (selectedOptions) => {
    //console.log(selectedOptions);
    const selected =selectedOptions[0];
    selected.loading = true;
    //console.log(selected.value);
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
    this.props.form.validateFields(async (err,values) => {
      if (!err) {
        const { editorState } = this.detailMsgRef.current.state;
        const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const { name, desc, price, categoriesId} = values;
        let pCategoryId = '0';
        let categoryId = '';
        if(categoriesId.length === 1) {
          categoryId = categoriesId[0]
        } else {
          pCategoryId = categoriesId[0];
          categoryId = categoriesId[1]
        }
        const result = await reqAddProduct({name, desc, price, categoryId, pCategoryId, detail})

        if (result) {
          this.props.history.push('/product/index')
        }
      }
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { selectList } = this.state;
    const productDetail = this.props.location.state;

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
                ],
                initialValue: productDetail ? productDetail.name : ''
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
                ],
                initialValue: productDetail ? productDetail.desc : ''
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
                ],
                initialValue: this.id
              }
            )(
              <Cascader
                placeholder='请选择分类'
                options={selectList}
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
                ],
                initialValue: productDetail ? productDetail.price : ''
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
          <RichTextEditor ref={this.detailMsgRef} detail={productDetail ? productDetail.detail : ''} />
        </Item>
        <Button onClick={this.addCategory} type='primary' htmltype='submit' className='submit-btn'>提交</Button>
      </Form>

    </Card>;
  }
}

export default Form.create()(SaveUpdate)