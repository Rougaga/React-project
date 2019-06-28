import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import dayjs from "dayjs";

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import MyButton from '../../component/defined-button';
import { reqUserList, reqAddUser } from '../../api'

export default class Role extends Component {
  state = {
    users: [/*{
      __v: 0,
      _id: "5c7dafe855fb843490b93a49",
      create_time: 1551740904866,
      email: "aaa@aaa.com",
      phone: "123456789",
      role_id: "5c7d222c12d5e51908cc0380",
      username: "aaa"
    }*/], //用户数组
    roles : [],//权限列表
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  //创建用户的回调函数
  addUser = () => {
    const { form  } = this.addUserForm.props;
    form.validateFields(async (err,values) => {
      //{name: "aaaaa", password: "aaaaaa", phone: "1213232", email: "13431412", role: "1"}
      if(!err) {

        const result = await reqAddUser(values);
        if (result) {
          message.success('添加用户成功', 2);
          form.resetFields();
          console.log(this.state.users);
          this.setState({
            users : [...this.state.users,result],
            isShowAddUserModal : false
          })
        }
      }


    })
  };
  
  updateUser = () => {
  
  };

  toggleDisplay = (stateName, stateValue) => {
    return () => this.setState({[stateName]: stateValue})
  };

  async componentDidMount() {
    const result = await reqUserList();
    if (result) {
      this.setState({
        users : result.users,
        roles : result.roles
      })
    }
  }
  
  render () {
    const {roles,users, isShowAddUserModal, isShowUpdateUserModal} = this.state;

    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render : (role_id) => {
          const role = roles.find((item) => item._id === role_id);
          return role && role.name
        }
      },
      {
        title: '操作',
        render: user => {
          return <div>
            <MyButton name='修改' onClick={() => {}}>修改</MyButton>
            <MyButton name='删除' onClick={() => {}}>删除</MyButton>
          </div>
        }
      }
    ];
    
    return (
      <Card
        title={
          <Button type='primary' onClick={this.toggleDisplay('isShowAddUserModal', true)}>创建用户</Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />
  
        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.toggleDisplay('isShowAddUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm roles={roles} wrappedComponentRef={(form) => this.addUserForm = form}/>
        </Modal>
  
        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.toggleDisplay('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm wrappedComponentRef={(form) => this.updateUserForm = form}/>
        </Modal>
        
      </Card>
    )
  }
}
