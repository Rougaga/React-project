import React, { Component } from 'react';

import './index.less'
import DefButton from '../defined-button'
import weatherImg from '../../assets/images/logo.png'

export default class MainHeader extends Component {
  getTime = () => {
    return new Date().toUTCString()
  }
  render() {
    return <div>
      <div className="header-top">
        <span>欢迎,xxx</span>
        <DefButton>退出</DefButton>
      </div>
      <div className="header-bottom">
        <div className="title-name ant-col-6">首页</div>
        <ul className="ant-col-18">
          <li className="weather-letter">晴</li>
          <li className="weather-img">
            <img src={weatherImg} alt="weather"/>
          </li>
          <li className="time-now">{this.getTime()}</li>
        </ul>
      </div>
    </div>;
  }
}