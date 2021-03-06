// pages/abbreviation/abbreviation.js
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

    hiddenn: false,
    hiddenns: true,
    frozen: false,
    counter: 60,
    captchaInput: '',
    captchaStatusText: '获取验证码',
    getInput: '',
    getInputcode: '',
    getInputpass: '',
    getInputrepass: '',
    placeholder: '请输入手机号',
    placeholderpwd: '密码至少6位，必须含有数字和英文字母',
    placeholdercode: '请输入验证码',
    placeholderrepwd: '请确认密码',
  },
  //修改密码
  successPassword: function () {
    this.setData({ //通过setData来修改
      hiddenn: true,
      hiddenns: false
    });
  },
  //重新登录
  newLogin: function () {
    wx.navigateTo({
      url: '../login/login',
    })
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
      this.repassword()
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
      checkPassword: {
        required: true,
        equalTo: 'password'
      }
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
      checkPassword: {
        required: '请填写确认密码',
        equalTo: '请确认两次密码输入一致',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
    /*** 也可以自定义验证规则*/
    // this.WxValidate.addMethod('assistance', (value, param) => {
    //   console.log(value)
    //   return this.WxValidate.optional(value) || (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/)
    // }, '请勾选 《顺风男服务协议》')
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
      placeholderpwd: '请确认密码',
    })
  },
  placeholderrepwd: function (e) {
    this.setData({
      placeholderrepwd: '',
    })
  },
  outplaceholderrepwd: function (e) {
    this.setData({
      placeholderrepwd: '请确认密码',
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
  getInputrepass: function (e) {
    this.data.getInputrepass = e.detail.value;
  },
  //重置密码
  repassword: function () {
    let that = this;
    wx.request({
      url: app.config.socketHost + '/account/password', // 拼接接口地址(前面为公共部分)
      method: 'put',
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

  // // 获取验证码
  // sendCode: function () {
  //   let that = this;
  //   // 60秒后重新获取验证码
  //   var inter = setInterval(function () {
  //     this.setData({
  //       smsFlag: true,
  //       sendColor: '#cccccc',
  //       sendTime: that.data.snsMsgWait + 's后重发',
  //       snsMsgWait: that.data.snsMsgWait - 1
  //     });
  //     if (that.data.snsMsgWait < 0) {
  //       clearInterval(inter)
  //       that.setData({
  //         sendColor: '#363636',
  //         sendTime: '获取验证码',
  //         snsMsgWait: 60,
  //         smsFlag: false
  //       });
  //     }
  //   }.bind(that), 1000);
  // },

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
          if (res.data.code === '3501') {
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
        content: '请输入手机号',
        type: 'warning'
      });
    }
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