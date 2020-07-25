// pages/login/login.js
const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');
import WxValidate from '../../utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    telValue: '15516946795',
    passValue: '123456',
    isPassword: true,
    placeholder: '请输入手机号',
    placeholderpwd: '请输入密码',
  },
  showPassword() {
    var isPassword = !this.data.isPassword;
    this.setData({
      isPassword: isPassword
    })
  },
  placeholders: function (e) {
    this.setData({
      placeholder: '',
    })
  },
  outplaceholders: function (e) {
    this.setData({
      placeholder: '请输入手机号',
    })
  },
  placeholderpwd: function (e) {
    this.setData({
      placeholderpwd: '',
    })
  },
  outplaceholderpwd: function (e) {
    this.setData({
      placeholderpwd: '请输入密码',
    })
  },
  telValue: function (e) { //方法1
    this.data.telValue = e.detail.value;
  },
  passValue: function (e) {
    this.data.passValue = e.detail.value;
  },
  submitIssue(e) {
    let issueInfo = e.detail.value
    console.log(issueInfo)
    //校验表单
    if (!this.WxValidate.checkForm(issueInfo)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    } else {
      this.login()
    }
  },
  showModal(error) {
    wx.showModal({
      content: error.msg
    })
  },
  //登录
  login: function () {
    let that = this;
    console.log('1313')
    wx.request({
      url: app.config.socketHost + '/login', // 拼接接口地址(前面为公共部分)
      method: 'post',
      data: {
        username: that.data.telValue,
        password: that.data.passValue,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.getSystemInfo({
          success: function (res) {
            app.globalData.systemInfo = res.platform
            app.globalData.model = res.model
          }
        })
        if (app.globalData.systemInfo == "devtools") {
          app.globalData.token = res.header['Auth-Token']
        } else if (app.globalData.systemInfo == "ios") {
          app.globalData.token = res.header['auth-token']
        } else if (app.globalData.systemInfo == "android") {
          app.globalData.token = res.header['Auth-Token']
        }
        if (app.globalData.model == "iPhone X (GSM+CDMA)<iPhone10,3>") {
          app.globalData.token = res.header['Auth-Token']
        }
        if (app.globalData.token) {
          $Toast({
            content: '登录成功',
            type: 'success'
          });
          that.brief()
          wx.reLaunch({
            url: '../home/home',
          })
        } else {
          $Toast({
            content: '登录失败，请重新登录',
            type: 'warning'
          });
        }
      }
    })
  },
  brief: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + '/resumes/brief', // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          let defaultResumeId = res.data.data.defaultResumeId
          app.globalData.resumeId = defaultResumeId
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  //忘记密码
  abbreviation: function () {
    wx.navigateTo({
      url: '../abbreviation/abbreviation',
    })
  },
  //注册页面
  register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      phone: {
        required: true,
        tel: true
      },
      password: {
        required: true,
        // minlength: 6,
        // maxlength: 24,

      },
    }
    const messages = {
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      password: {
        required: '请填写密码',
        // minlength: "密码最少6位数",
        // maxlength: '密码最多24位数',

      },
    }
    this.WxValidate = new WxValidate(rules, messages)
    /*** 也可以自定义验证规则*/
    // this.WxValidate.addMethod('assistance', (value, param) => {
    //   console.log(value)
    //   return this.WxValidate.optional(value) || (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/)
    // }, '请勾选 《顺风男服务协议》')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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