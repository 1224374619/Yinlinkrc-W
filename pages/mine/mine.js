// pages/mine/mine.js
const app = getApp()
var cityList = require('../../utils/city.js');
const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logout: false,
    visible2: false,
    boole: false,
    positionList: [],
    deliverTotal: '',
    collectTotal: '',
    baseList: '',
    cityList: [],
    avatarUrl: '',
    completedPercent: ''
  },
  handleOpen() {
    this.setData({
      visible2: true
    });
  },
  handleClose() {
    this.setData({
      visible2: false
    });
  },
  contact: function () {
    wx.navigateTo({
      url: '../contactus/contactus',
    })
  },
  cards: function () {
    let that = this
    var baseList = JSON.stringify(that.data.baseList)
    wx.navigateTo({
      url: '../../component/base/base?base=' + baseList,
    })
  },
  resume: function () {
    wx.reLaunch({
      url: '../resume/resume',
    })
  },
  collect: function () {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  deliver: function () {
    wx.navigateTo({
      url: '../deliver/deliver',
    })
  },
  brief: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + '/resume/brief', // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          let newsList = res.data.data.base
          // let deliverTotal = res.data.data.total
          let defaultResumeId = res.data.data.defaultResumeId
          app.globalData.resumeId = defaultResumeId
          wx.setStorageSync('2', res.data.data.base.avatarUrl)
          var value = wx.getStorageSync('2')
          if (value) {
            that.setData({
              avatarUrl: value
            });
          } else {
            that.setData({
              avatarUrl: res.data.data.avatarUrl
            });
            wx.setStorageSync('2', res.data.data.avatarUrl)
          }
          that.setData({ //通过setData来修改
            baseList: newsList,
          });
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  logOut: function () {
    wx.showModal({
      content: '确认退出账号吗？',
      success(res) {
        if (res.confirm) {
          app.globalData.token = ''
          $Toast({
            content: '退出成功，请重新登录',
            type: 'warning'
          });
          setTimeout(function () {
            wx.reLaunch({
              url: '../mine/mine',
            })
          }, 1000)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // let that = this;
    // wx.request({
    //   url: app.config.socketHost + '/logout', // 拼接接口地址(前面为公共部分)
    //   method: 'get',
    //   header: {
    //     'content-type': 'application/json',
    //     'Auth-Token': app.globalData.token
    //   },
    //   success(res) {
    //     // if (app.globalData.token) {
    //     //   console.log(res.data.data)
    //     //   let newsList = res.data.data
    //     //   let deliverTotal = res.data.data.total
    //     //   that.setData({ //通过setData来修改
    //     //     positionList: newsList,
    //     //     deliverTotal: deliverTotal
    //     //   });
    //     // } else {
    //     //   console.log('没有数据')
    //     // }
    //   },
    //   fail(error) {
    //     console.log(error)
    //   }
    // })
  },
  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
    this.setData({
      visible2: false
    });
  },
  Mydeliver: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + '/submitted/position', // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          console.log(res.data.data)
          let newsList = res.data.data
          let deliverTotal = res.data.data.total
          that.setData({ //通过setData来修改
            positionList: newsList,
            deliverTotal: deliverTotal
          });
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  Mycollect: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + '/favorite/position', // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          console.log(res.data.data)
          let newsList = res.data.data
          let collectTotal = res.data.data.total
          that.setData({ //通过setData来修改
            positionList: newsList,
            collectTotal: collectTotal
          });
          // // 开始获取数据 eg: textBox(获取文字内容)
          // textBox : res.data.data.list.basic.brand_story  // 根据network查看请求到的接口的结构获取相对应的数据
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  briefDetail: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          let resumeList = res.data.data
          that.setData({ //通过setData来修改
            // avatarUrl: resumeList.avatarUrl,
            resumeDetailList: resumeList,
            completedPercent: resumeList.completedPercent
          });
        } else {
          console.log('没有数据')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(app.globalData.token)
    if (app.globalData.token) {
      this.setData({
        logout: true
      })
    } else {
      this.setData({
        logout: false
      })
    }
    this.setData({
      cityList: cityList.city
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.brief(),
    this.Mydeliver(),
    this.Mycollect(),
    wx.hideHomeButton()
    this.briefDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})