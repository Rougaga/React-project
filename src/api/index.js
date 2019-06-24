import ajax from './ajax'

export const reqUser = (username, password) => ajax('/login',{username,password},'post');
export const userConfirm = (id) => ajax('/main/confirm',{id},'post');