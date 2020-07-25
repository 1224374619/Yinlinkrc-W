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
      // url: 'http://192.168.1.114:8081/consumer-core/positions/search', // 拼接接口地址(前面为公共部分)
      url: 'https://www.yinlinkrc.com/api/v1/consumer-user/searched/position', // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Auth-Token': this.globalData.token
      },
      data: {
        addresses: null,
        degreeMin: null,
        industries: null,
        isGraduate: true,
        jobType: null,
        keyword: null,
        pageNum: 1,
        natures: null,
        pageSize: 10,
        publishedInterval: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: null,
        workAgeMin: null,
        positionCatalog: null,
        industryCodes: null
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
    // console.log(options,'111wwwwqq11')
    // if (options.scene == 1007) {
    //   // 通过单人聊天会话分享进入

    // }
    // if (options.scene == 1008) {
    //   // 通过群聊会话分享进入
    // }
    // if (options.scene == 1001) {
    //   // 通过发现栏小程序进入
    // }
  },
  // brief: function () {
  //   let that = this;
  //   wx.request({
  //     url: 'https://www.yinlinkrc.com/api/v1/consumer-app/resume/brief', // 拼接接口地址(前面为公共部分)
  //     method: 'get',
  //     header: {
  //       'content-type': 'application/json',
  //       'Auth-Token': that.globalData.systemInfo === 'devtools' ? that.globalData.tokens : that.globalData.token
  //     },
  //     success(res) {
  //       if (that.globalData.token || that.globalData.tokens) {
  //         let defaultResumeId = res.data.data.defaultResumeId
  //         that.globalData.resumeId = defaultResumeId
  //       } else {
  //         console.log('没有数据')
  //       }
  //     }
  //   })
  // },
  // getUserData: function (cb) {
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
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