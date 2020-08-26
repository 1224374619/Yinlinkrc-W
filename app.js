//app.js
const updateManager = wx.getUpdateManager()
const post = require('./utils/util').post
const gets = require('./utils/util').get
const webSocket = require('./utils/webSocket.js')
const xcxid = require('./config').xcxid
const config = require('./config.js')
App({
  config: config,
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res)
    //   }
    // })
    // 获取用户信息
  },
  getInfo() {
    var that = this;
    wx.request({
      // url: 'http://192.168.1.108:8081/consumer-core/position/search', // 拼接接口地址(前面为公共部分)
      url: 'https://www.yinlinkrc.com/api/v2/consumer-core/position/search', // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json',
      },
      data: {
        addresses: null,
        degreeMin: null,
        industries: null,
        industryCodes: null,
        isGraduate: true,
        jobType: null,
        keywords: null,
        natures: null,
        pageNum: 1,
        pageSize: 100,
        positionCatalog: null,
        publishedInterval: null,
        publishedTime: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: null,
        workAgeMin: null
      },
      success(res) {
        var newsList = res.data.data.list
        console.log(res)
        wx.setStorageSync('1', newsList)
      }
    })
  },
  onShow: function (options) {
    this.getInfo()
  },
  globalData: {
    userInfo: {},
    token: '',
    tokens: '',
    companyList: [],
    systemInfo: '',
    model: '',
    resumeId: '',
    num: 0,
    icons: '',
  }
})