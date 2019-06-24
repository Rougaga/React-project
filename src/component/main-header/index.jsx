import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './index.less'
import { getItem } from "../../utils/storage-tools";
import DefButton from '../defined-button'
import weatherImg from '../../assets/images/logo.png'

class MainHeader extends Component {
  state = {
    username : ''
  };
  componentWillMount(){
    const { username } = getItem();
    this.setState({
      username
    })
  }

  render() {
    return <div>
      <div className="header-top">
        <span>欢迎,{this.state.username}</span>
        <DefButton>退出</DefButton>
      </div>
      <div className="header-bottom">
        <div className="title-name ant-col-6">首页</div>
        <ul className="ant-col-18">
          <li className="weather-letter">晴</li>
          <li className="weather-img">
            <img src={weatherImg} alt="weather"/>
          </li>
          <li className="time-now">{Date.now()}</li>
        </ul>
      </div>
    </div>;
  }
}
export default withRouter(MainHeader)