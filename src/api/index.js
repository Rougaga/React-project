import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

//用户登录
export const reqUser = (username, password) => ajax('/login',{username,password},'post');

//用户验证
export const userConfirm = (id) => ajax('/main/confirm',{id},'post');

//请求天气
export const weatherMsg = function() {
  return new Promise((resolve) => {
    jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2', {}, function(err, data) {
      if (!err) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({
          weatherImg : dayPictureUrl,
          weather
        })
      }else {
        message.error(err);
        resolve()
      }
    })
  })
}

//category组件的数据请求
export const reqCategoryDate = (parentId) => ajax('/manage/category/info',{parentId})
