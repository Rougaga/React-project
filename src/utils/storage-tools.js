
const USER_KEY = 'USER_KEY';
const TIME  = 'TIME';
const timeOut = 1000*3600*24*7;

export const getItem = function() {
  const startTime = localStorage.getItem(TIME);
  if( Date.now() - startTime > timeOut ){
    removeItem();
    return {}
  }else {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
};

export const setItem = function(data) {
  localStorage.setItem(USER_KEY,JSON.stringify(data));
  localStorage.setItem(TIME, Date.now())
};

export const removeItem = function() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TIME)
}
