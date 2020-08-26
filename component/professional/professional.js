// component/professional/professional.js
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profession: '',
    qualificationsList: ''
  },
  //验证函数
  initValidate() {
    const rules = {
      profession: {
        required: true
      },
    }
    const messages = {
      profession: {
        required: '请填写职称等级名称'
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  submitIssue(e) {
    let issueInfo = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(issueInfo)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    } else {
      this.keep()
    }
  },
  showModal(error) {
    wx.showModal({
      content: error.msg
    })
  },

  profession: function (e) {
    this.setData({
      profession: e.detail.value
    })
  },
  keep: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}/qualification/${this.data.qualificationsList.id}`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      data: {
        qual: that.data.profession,
      },
      success(res) {
        if (app.globalData.token) {
          wx.navigateBack({
            delta: 1, //返回上一个页面
          })
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  delete: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}/qualification/${this.data.qualificationsList.id}`, // 拼接接口地址(前面为公共部分)
      method: 'delete',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          wx.navigateBack({
            delta: 1, //返回上一个页面
          })
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
    this.initValidate()
    let qualifications = JSON.parse(options.qualifications);
    console.log(qualifications)
    this.setData({
      qualificationsList: qualifications,
      profession: qualifications.qual,
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