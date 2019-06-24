import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

export const reqUser = (username, password) => ajax('/login',{username,password},'post');
export const userConfirm = (id) => ajax('/main/confirm',{id},'post');
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
