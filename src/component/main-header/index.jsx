import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import { Modal } from 'antd';


import './index.less'
//import { weatherMsg } from "../../api";
import { getItem, removeItem } from "../../utils/storage-tools";
import DefButton from '../defined-button';
import menuList from '../../config/menu-config'

class MainHeader extends Component {
  state = {
    sysTime : Date.now(),
    weatherImg : 'http://api.map.baidu.com/images/weather/day/qing.png',
    weather : '晴',
  };
  componentWillMount(){
    this.user = getItem().username;
    this.title = this.getTitle(this.props)
  };

  /*async componentDidMount(){
    this.timeId = setInterval(() => {
      this.setState({
        sysTime : Date.now()
      })
    } ,1000);
    const { promise, cancel } = weatherMsg();
    this.cancel = cancel;
    const result = await promise;
    this.setState(result)
  }*/

  componentWillReceiveProps(nextprops){
    this.title = this.getTitle(nextprops)
  }

  componentWillUnmount(){
    clearInterval(this.timeId);
    //this.cancel();
  }

  getTitle = (nextprops) => {
    let { pathname } = nextprops.location;
    const pathnameReg = /^\/product\//;
    if(pathnameReg.test(pathname)){
      pathname = pathname.slice(0,8)
    }
    for (let i = 0; i < menuList.length; i++) {
      const item = menuList[i]
      if (item.children) {
        for ( let j = 0; j < item.children.length; j++) {
          if (pathname === item.children[j].key) {
            return item.children[j].title
          }
        }
      }else{
        if (pathname === item.key) {
          return item.title
        }
      }
    }
  }

  quit = () => {
    Modal.confirm({
      title : '确定要退出账号么？',
      okText : '确定',
      cancelText : '取消',
      onOk : () => {
        removeItem();
        this.props.history.replace('/login');
      }
    })
  }

  render() {
    return <div>
      <div className="header-top">
        <span>欢迎,{this.user}</span>
        <DefButton onClick={this.quit}>退出</DefButton>
      </div>
      <div className="header-bottom">
        <div className="title-name ant-col-6">{this.title}</div>
        <ul className="ant-col-18">
          <li className="weather-letter">{this.state.weather}</li>
          <li className="weather-img">
            <img src={this.state.weatherImg} alt="weather"/>
          </li>
          <li className="time-now">{dayjs(this.state.sysTime).format('YYYY-MM-DD HH-mm-ss')}</li>
        </ul>
      </div>
    </div>;
  }
}
export default withRouter(MainHeader)