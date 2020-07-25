// pages/collect/collect.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionList: [],
    total: ''
  },

  position: function (e) {
    var id = e.currentTarget.dataset.id
    var positionid = e.currentTarget.dataset.positionid
    var positionName = e.currentTarget.dataset.positionname
    var companyName = e.currentTarget.dataset.companyname
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&positionid=' + positionid + '&positionname=' + positionName + '&companyname=' + companyName,
    })
  },
  Mycollect: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + '/favorite/positions', // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          let newsList = res.data.data.list
          that.setData({ //通过setData来修改
            positionList: newsList,
            total: res.data.data.total
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
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Mycollect()
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