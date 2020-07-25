// pages/detail/detail.js
const app = getApp()
var util = require("../../utils/util.js");
var industryList = require('../../utils/industry.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible2: false,
    boole:false,
    current: 'tab1',
    hiddenn: false,
    hiddenns: true,
    alwy: true,
    alwys: true,
    positionId: '',
    companyId: '',
    positionList: '',
    companyList: '',
    industryList: [],
    positionName: '',
    companyName: ''
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    if (this.data.current === 'tab1') {
      wx.setNavigationBarTitle({
        title: '职位详情'
      })
      this.setData({
        hiddenns: true,
        hiddenn: false,
      });
      this.positionDetail()
    } else {
      console.log(this.data.companyName)
      wx.setNavigationBarTitle({
        title: '公司详情'
      })
      this.setData({
        hiddenns: false,
        hiddenn: true,
      });
      this.companyDetail()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let companyId = options.id
    let positionid = options.positionid
    let companyName = options.companyname
    let positionName = options.positionname
    this.setData({
      positionId: positionid,
      companyId: companyId,
      industryList: industryList.industry,
      companyName: companyName,
      positionName: positionName
    });
    wx.setNavigationBarTitle({
      title: '职位详情'
    })
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
  companyDetail: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/companies/${this.data.companyId}`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        let companyList = res.data.data
        that.setData({ //通过setData来修改
          companyList: companyList
        });
      }
    })
  },
  positionDetail: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/positions/${this.data.positionId}`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        let positionList = res.data.data
        let positionName = res.data.data.positionName
        that.setData({ //通过setData来修改
          positionList: positionList,
          positionName: positionName
        });
      }
    })
  },
  submitted: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/submitted/positions/${this.data.positionId}`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          if (res.data.data) {
            that.setData({
              alwy: true,
            })
          } else {
            that.setData({
              alwy: false,
            })
          }
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  favorite: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/favorite/positions/${this.data.positionId}`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          if (res.data.data) {
            that.setData({
              alwys: true,
            })
          } else {
            that.setData({
              alwys: false,
            })
          }
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  submitteds: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/submitted/positions/${this.data.positionId}/resume/${app.globalData.resumeId}`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        console.log(res)
        if (app.globalData.token) {
          if (res.statusCode === 400) {
            wx.showModal({
              content: '简历未填写完整'
            })
          } else {
            that.setData({
              alwy: true,
            })
          }
        } else {
          that.handleOpen()
        }

      },
      fail(res) {
        console.log(res)
        wx.showModal({
          content: '简历填写完整'
        })
      }
    })
  },
  favorites: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/favorite/positions/${this.data.positionId}`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          that.setData({
            alwys: true,
          })
        } else {
          that.handleOpen()
        }
      }
    })
  },
  morePosition: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../morePosition/morePosition?id=' + id
    })
  },
  //取消对岗位的收藏
  iscancel() {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/favorite/position/${this.data.positionId}`, // 拼接接口地址(前面为公共部分)
      method: 'delete',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          that.favorite();
        } else {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
    // isfavorite(c).then(res => {
    //   if (res.data.code === 200) {
    //     this.favorite();
    //   }
    // });
  },
  //登录
  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
    this.setData({
      visible2: false
    });
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
    app.globalData.num++
    this.positionDetail()
    if (app.globalData.token) {
      this.submitted()
      this.favorite()
    } else {
      this.setData({
        alwys: false,
        alwy: false,
      })
    }
    this.submitted()
    this.favorite()
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