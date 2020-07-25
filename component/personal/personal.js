// component/personal/personal.js
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluationList: '',
    content: ''
  },

  //验证函数
  initValidate() {
    const rules = {
      content: {
        required: true
      },
    }
    const messages = {
      content: {
        required: '请填写自我介绍'
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

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    let evaluationList = JSON.parse(options.evaluation);
    this.setData({
      evaluationList: evaluationList,
      content: evaluationList.content
    });
  },
  keep: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resumes/${app.globalData.resumeId}/evaluation`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      data: {
        content: that.data.content
      },
      success(res) {
        if (app.globalData.token) {
          console.log(res)
          wx.navigateBack({
            delta: 1, //返回上一个页面
          })
        } else {
          console.log('没有数据')
        }
      },
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