import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

//用户登录
export const reqUser = (username, password) => ajax('/login',{username,password},'post');

//用户验证
export const userConfirm = (id) => ajax('/validate/user',{id},'post');

//请求天气
export const weatherMsg = function() {
  let cancel = null;
  const promise = new Promise((resolve) => {
    cancel = jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2', {}, function(err, data) {
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
  return {
    promise,
    cancel,
  }
}

//category组件的数据请求
export const reqCategoryData = (parentId) => ajax('/manage/category/list',{parentId})

//添加category品类的请求
export const reqAddCategoryData = (categoryName, parentId) => ajax('/manage/category/add',{categoryName, parentId},'post')

//更新品类名称
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName} ,'post')

//获取商品管理列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize});

//增加商品
export const reqAddProduct = ({name, desc, price, pCategoryId, categoryId, detail}) => ajax('/manage/product/add', {name, desc, price, pCategoryId, categoryId, detail}, 'post')

//搜索商品
export const reqSearchProduct = ({searchType, searchContent, pageNum, pageSize}) => ajax('/manage/product/search', {[searchType]: searchContent, pageSize, pageNum});

//请求角色列表
export const reqRoleList = () => ajax('/manage/role/list')

//添加角色
export const addRole = ( name ) => ajax('/manage/role/add', { name }, 'post')

//更新角色权限
export const updateRole = ( _id, auth_name, menus ) => ajax('/manage/role/update', { _id, auth_name, menus }, 'post')

//获取用户列表
export const reqUserList = () => ajax('/manage/user/list');

//请求添加用户
export const reqAddUser = ({username, password, phone, email, role_id}) => ajax('/manage/user/add',{username, password, phone, email, role_id}, 'post')