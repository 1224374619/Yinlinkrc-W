// component/awardsadd/awardsadd.js
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
const time = require("../../utils/util.js");

const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    showModalStatusBegin: false,
    showModalStatusEnd: false,

    years,
    year: date.getFullYear(),
    months,
    month: 0,
    days,
    day: 0,
    value: [9999, 0, 0],

    end: time.formatDate(new Date()),
    begindate: '',
    award: ''

  },

  showcityModal() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      /**
       * http://cubic-bezier.com/ 
       * linear 动画一直较为均匀
       * ease 从匀速到加速在到匀速
       * ease-in 缓慢到匀速
       * ease-in-out 从缓慢到匀速再到缓慢
       * 
       * http://www.tuicool.com/articles/neqMVr
       * step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       * step-end 保持 0% 的样式直到动画持续时间结束 一闪而过
       */
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
      showModalStatus: true,
      showModalStatusBegin: true,
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      })
    }, 200)
  },
  //city隐藏
  hidecityModal() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      city: this.data.name
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showModalStatusBegin: false,
        showModalStatusEnd: false
      })
    }.bind(this), 200)
  },
  bindChange(e) {
    const val = e.detail.value
    console.log(e)
    if (e.detail.value[1] === 0 || e.detail.value[1] === 2 || e.detail.value[1] === 4 || e.detail.value[1] === 6 || e.detail.value[1] === 7 || e.detail.value[1] === 9 || e.detail.value[1] === 11) {
      const days = []
      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        begindate: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else if (e.detail.value[1] === 1) {
      const days = []
      for (let i = 1; i <= 29; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        begindate: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else {
      const days = []
      for (let i = 1; i <= 30; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        begindate: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    }
  },

  //验证函数
  initValidate() {
    const rules = {
      award: {
        required: true
      },
      date: {
        required: true
      },
    }
    const messages = {
      award: {
        required: '请填写奖项名称'
      },
      date: {
        required: '请选择获奖时间'
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

  award: function (e) {
    this.setData({
      award: e.detail.value
    })
  },
  keep: function () {
    let that = this;
    let til = new Date(that.data.begindate.replace(/-/g, "/")).getTime()
    wx.request({
      url: app.config.uploadHost + `/resumes/${app.globalData.resumeId}/awards`, // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      data: {
        acquiredTime: til,
        award: that.data.award
      },
      success(res) {
        if (app.globalData.token) {
          if (res.data.code === 201) {
            wx.navigateBack({
              delta: 1, //返回上一个页面
            })
          } else {
            wx.showModal({
              content: res.data.message
            })
          }
        } else {
          console.log('没有数据')
        }
      },
    })
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