// component/language/language.js
const time = require("../../utils/util.js");
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listenAndSpeak: 0,
    readAndWrite: 0,
    languageList: '',
    language: '',
    array: ['一般', '良好', '熟练', '精通'],
    objectArray: [{
        id: 0,
        name: '一般'
      },
      {
        id: 1,
        name: '良好'
      },
      {
        id: 2,
        name: '熟练'
      },
      {
        id: 3,
        name: '精通'
      },
    ],
  },

  //验证函数
  initValidate() {
    const rules = {
      language: {
        required: true
      },
      listenAndSpeak: {
        required: true
      },
      readAndWrite: {
        required: true
      },
    }
    const messages = {
      language: {
        required: '请填写语种'
      },
      listenAndSpeak: {
        required: '请选择听力能力'
      },
      readAndWrite: {
        required: '请填写读写能力'
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      listenAndSpeak: e.detail.value
    })
  },
  bindPickerChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      readAndWrite: e.detail.value
    })
  },
  language: function (e) {
    this.setData({
      language: e.detail.value
    })
  },
  keep: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resumes/${app.globalData.resumeId}/languages/${this.data.languageList.id}`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      data: {
        listenAndSpeak: that.data.listenAndSpeak,
        readAndWrite: that.data.readAndWrite,
        language: that.data.language,
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
      }
    })
  },
  delete: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resumes/${app.globalData.resumeId}/languages/${this.data.languageList.id}`, // 拼接接口地址(前面为公共部分)
      method: 'delete',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    let language = JSON.parse(options.language);
    console.log(language)
    this.setData({
      languageList: language,
      language: language.language,
      listenAndSpeak: language.listenAndSpeak,
      readAndWrite: language.readAndWrite,
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