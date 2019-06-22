import axios from 'axios';
import {message} from "antd";

export default function ajax(url, data, method) {
  let reqData = data;
  method = method.toLowerCase();
  if (method === 'get') {
    reqData = {
      params : data
    }
  }

  return axios[method](url,reqData)
    .then((res) => {
      const { data } = res;
      if (data.status === 0){
        //成功
        return data.data
      }else {
        //失败
        message.error(data.msg, 2);
      }
    })
    .catch(() => {
      message.error('网络连接错误，请刷新页面',2);
    })
}