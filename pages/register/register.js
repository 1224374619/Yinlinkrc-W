// pages/register/register.js
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frozen: false,
    counter: 60,
    captchaInput: '',
    captchaStatusText: '获取验证码',
    getInput: '',
    getInputcode: '',
    getInputpass: '',
    placeholder: '请输入手机号',
    placeholderpwd: '密码至少6位，必须含有数字和英文字母',
    placeholdercode: '请输入验证码',
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
  placeholdercode: function (e) {
    this.setData({
      placeholdercode: '',
    })
  },
  outplaceholdercode: function (e) {
    this.setData({
      placeholdercode: '请输入验证码',
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
  getInput: function (e) { //方法1
    this.data.getInput = e.detail.value;
  },
  getInputcode: function (e) {
    this.data.getInputcode = e.detail.value;
  },
  getInputpass: function (e) {
    this.data.getInputpass = e.detail.value;
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
      this.register()
    }
  },
  showModal(error) {
    wx.showModal({
      content: error.msg
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      phone: {
        required: true,
        tel: true
      },
      code: {
        required: true,
        code: true
      },
      password: {
        required: true,
        password: true
      },
    }
    const messages = {
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      code: {
        required: '请填写验证码',
        code: '请填写正确的验证码'
      },
      password: {
        required: '请填写密码',
        password: '密码至少6位，必须含有数字和英文字母',
        minlength: "密码最少6位数",
        maxlength: '密码最多24位数',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  treaty: function () {
    wx.navigateTo({
      url: '../treaty/treaty',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
  },
  getCaptcha: function () {
    let that = this;
    const captchaLabel = '获取验证码';
    const countNumber = 60;
    this.setData({
      frozen: true
    })
    if (this.data.getInput) {
      wx.request({
        url: app.config.socketHost + '/account/phone/vcode', // 拼接接口地址(前面为公共部分)
        method: 'post',
        data: {
          phone: that.data.getInput
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.code === 400) {
            $Toast({
              content: res.data.message,
              type: 'warning'
            });
          } else {
            const handler = setInterval(() => {
              that.setData({
                smsFlag: true,
                captchaStatusText: `${captchaLabel}(${--that.data.counter}s)`,
              })
              // this.data.captchaStatusText = `${captchaLabel}(${--this.data.counter}s)`;
              if (that.data.counter < 0) {
                clearInterval(handler);
                that.setData({
                  counter: countNumber,
                  captchaStatusText: captchaLabel,
                  frozen: false,
                  smsFlag: false,
                  sendColor: '#327CF3',
                })
              }
            }, 1000);
          }
        }
      })
    } else {
      $Toast({
        content: '请输入正确的手机号',
        type: 'warning'
      });
    }
  },
  //注册
  register: function () {
    let that = this;
    wx.request({
      url: app.config.socketHost + '/account/register', // 拼接接口地址(前面为公共部分)
      method: 'post',
      data: {
        phone: that.data.getInput,
        vcode: that.data.getInputcode,
        agree: true,
        password: that.data.getInputpass
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code === "200") {
          $Toast({
            content: res.data.message,
            type: 'success'
          });
          wx.navigateTo({
            url: '../login/login',
          })
          // let newsList = res.data.data
          // that.setData({ //通过setData来修改
          //   positionList: newsList
          // });
          // // 开始获取数据 eg: textBox(获取文字内容)
          // textBox : res.data.data.list.basic.brand_story  // 根据network查看请求到的接口的结构获取相对应的数据
        } else {
          $Toast({
            content: res.data.message,
            type: 'warning'
          });
        }
      }
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