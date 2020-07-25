import Promise from './es6-promise.min'
import config from '../config'
const xcxid = require('../config').xcxid
const app = getApp()

function dayDiff(date1, date2) {
  console.log(date1, date2)
  date1 = new Date(date1)
  date2 = new Date(date2)
  let diffDay = (Date.parse(date2) - Date.parse(date1)) / (60000 * 24 * 60)
  diffDay = Math.round(diffDay)
  return diffDay
}

function CodeToTag(codeArr, list, Alias){
  /*
  * codeArr{
  *   type:array,
  *   作用:将需要匹配的code从父到子按顺序放入数组中
  *   例如： ['省','市']=>[310000,310104]
  * }
  * list{
  *   type:array,
  *   作用:数据匹配源，必须是数组，且必须是嵌套接口，children中是子元素节点
  *   例如：
  *    {
          children: [{code: 110101, tag: "东城区", parent: 110000, level: 2},…]
          code: 110000
          level: 1
          parent: 0
          tag: "北京市"
        }
  * }
  * Alias{
  *   type:Object,
  *   作用:更改目标匹配字段的别名，可不填
  *   例如：
  *    (默认)：
       {
          targetCode:code,
          targetTag:tag,
       }
       (可修改为)：
       {
          targetCode:value,
          targetTag:label,
       }
  * }
  *
  * */
  let defaultTarget = {
    targetCode: 'code',
    targetTag: 'tag',
  };
  if (!(Array.isArray(codeArr) && Array.isArray(list))) {
    throw new Error('codeArr&list must be Array!');
  }
  if (Alias) {
    if (Alias.constructor === Object) {
      defaultTarget = Object.assign(defaultTarget, Alias);
    } else {
      throw new Error('Alias must be Object!');
    }
  }
  const tagArr = [];
  const { targetCode, targetTag } = defaultTarget;
  const getTag = (itemCode, itemList) => {
    const targetList = itemList.filter(item => item[targetCode] === itemCode)[0];
    if (targetList) {
      tagArr.push(targetList[targetTag]);
      if (targetList.children && targetList.children.length > 0) {
        getTag(codeArr[tagArr.length], targetList.children);
      }
    }
  };
  getTag(codeArr[tagArr.length], list);
  return tagArr;
}

function formatDate(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d;
};

function urlTos(url) {
  url = url || ''
  let s = url.slice(url.length - 4)
  let n = url.slice(0, url.length - 4)
  let ss = url.slice(url.length - 5)
  let nn = url.slice(0, url.length - 5)
  if (s === '.jpg' || s === '.png') {
    url = n + '_s' + s
  } else {
    url = nn + '_s' + ss
  }
  return url
}

function formatStringTime(stringTime) {
  stringTime = stringTime.length < 11 ? stringTime + ' 00:00:00' : stringTime
  stringTime = stringTime.replace(/-/g, ':').replace(' ', ':')
  stringTime = stringTime.split(':')
  stringTime = new Date(stringTime[0], (stringTime[1] - 1), stringTime[2], stringTime[3], stringTime[4], stringTime[5])
  return Date.parse(stringTime)
}

function timeDiff(start, end, startHourNum) {
  let formatStringTime = function (stringTime) {
    stringTime = stringTime.replace(/-/g, ':').replace(' ', ':')
    stringTime = stringTime.split(':')
    stringTime = new Date(stringTime[0], (stringTime[1] - 1), stringTime[2], stringTime[3], stringTime[4], stringTime[5])
    return Date.parse(stringTime)
  }
  startHourNum = startHourNum > 9 ? startHourNum : '0' + startHourNum
  let topTime = start.substring(0, 11) + startHourNum + ':00:00'
  topTime = formatStringTime(topTime)
  start = formatStringTime(start)
  end = formatStringTime(end)
  return {
    diffTime: (end - start) / 600000,
    diffTop: (start - topTime) / 600000,
    diffDay: (end - start) / 600000
  }
}

function getTime(time) {
  time = new Date(time);
  let hours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours();
  let minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes();
  let t = hours + ':' + minutes
  return t
}

function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}

function getCurrentPageArgs() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var options = currentPage.options //如果要获取url中所带的参数可以查看options
  var args = JSON.stringify(options)
  return args
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options
  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return urlWithArgs
}

//解决多次跳转开始
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
//解决多次跳转结束
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const get = (userInfo, path, args) => {
  args = Object.prototype.toString.call(args) === '[object String]' ? args : ''
  args = args ? '?xcxid=' + userInfo.xcxid + '&' + args : '?xcxid=' + userData.xcxid
  let url = config.apiHost + path + args
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + userData.token
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

const post = (userData, path, data) => {
  data = Object.prototype.toString.call(data) === '[object Object]' ? data : {}
  data.xcxid = userData.xcxid
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.apiHost + path,
      data: data,
      method: 'POST',
      header: {
        'Accept': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + userData.token
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

const del = (userData, path, data) => {
  data = Object.prototype.toString.call(data) === '[object Object]' ? data : {}
  data.xcxid = userData.xcxid
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.apiHost + path,
      data: data,
      method: 'DELETE',
      header: {
        'Accept': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + userData.token
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

const put = (userData, path, data) => {
  data = Object.prototype.toString.call(data) === '[object Object]' ? data : {}
  data.xcxid = userData.xcxid
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.apiHost + path,
      data: data,
      method: 'PUT',
      header: {
        'Accept': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + userData.token
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

const patch = (userData, path, data) => {
  data = Object.prototype.toString.call(data) === '[object Object]' ? data : {}
  data.xcxid = userData.xcxid
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.apiHost + path,
      data: data,
      method: 'PATCH',
      header: {
        'Accept': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + userData.token
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

module.exports = {
  formatDate: formatDate,
  CodeToTag: CodeToTag,
  formatTime: formatTime,
  formatNumber: formatNumber,
  throttle: throttle,
  get: get,
  post: post,
  del: del,
  put: put,
  patch: patch,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  getCurrentPageArgs: getCurrentPageArgs,
  getTime: getTime,
  timeDiff: timeDiff,
  formatStringTime: formatStringTime,
  urlTos: urlTos,
  dayDiff: dayDiff
}