import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {
  state = {
    options : {},
    app : {}
  }


  render() {
    return <ReactEcharts option={this.state.options} />;
  }
}