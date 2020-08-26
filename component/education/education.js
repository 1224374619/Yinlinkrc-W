// component/education/education.js
const time = require("../../utils/util.js");
import WxValidate from '../../utils/WxValidate.js'
const timeUtil = require('../../utils/timeUtil.js');
const app = getApp()

const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1960; i <= date.getFullYear(); i++) {
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
    eduList: '',
    begindateNew: '',
    enddateNew: '',
    begindate: '',
    enddate: '',
    school: '',
    index: 0,
    array: ['初中及以下', '职中', '高中', '大专', '本科', '硕士', '博士'],
    objectArray: [{
        id: 0,
        name: '初中及以下'
      },
      {
        id: 1,
        name: '职中'
      },
      {
        id: 2,
        name: '高中'
      },
      {
        id: 3,
        name: '大专'
      },
      {
        id: 4,
        name: '本科'
      },
      {
        id: 5,
        name: '硕士'
      },
      {
        id: 6,
        name: '博士'
      }
    ],
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
  showcityModals() {
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
      showModalStatusEnd: true,
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
      begindate: this.data.begindateNew ? this.data.begindateNew : '2020-01-01',
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showModalStatusBegin: false,
        showModalStatusEnd: false,
        begindateNew: ''
      })
    }.bind(this), 200)
  },
  //city隐藏
  hidecityModalEnd() {
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
      enddate: this.data.enddateNew ? this.data.enddateNew : '2020-01-01'
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showModalStatusBegin: false,
        showModalStatusEnd: false,
        enddateNew: ''
      })
    }.bind(this), 200)
  },
  //city隐藏
  hidecityModalOut() {
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
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showModalStatusBegin: false,
        showModalStatusEnd: false,
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
        begindateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else if (e.detail.value[1] === 1) {
      const days = []
      for (let i = 1; i <= 29; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        begindateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else {
      const days = []
      for (let i = 1; i <= 30; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        begindateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    }
  },
  bindChangeEnd(e) {
    const val = e.detail.value
    console.log(e)
    if (e.detail.value[1] === 0 || e.detail.value[1] === 2 || e.detail.value[1] === 4 || e.detail.value[1] === 6 || e.detail.value[1] === 7 || e.detail.value[1] === 9 || e.detail.value[1] === 11) {
      const days = []
      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        enddateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else if (e.detail.value[1] === 1) {
      const days = []
      for (let i = 1; i <= 29; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        enddateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else {
      const days = []
      for (let i = 1; i <= 30; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        enddateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    }
  },

  //验证函数
  initValidate() {
    const rules = {
      schoolnane: {
        required: true,
        name: true
      },
      begindate: {
        required: true
      },
      enddate: {
        required: true
      },
      major: {
        required: true
      },
      agree: {
        required: true,
      },
    }
    const messages = {
      schoolnane: {
        required: '请填写学校名称',
        name: '请填写正确学校名称'
      },
      begindate: {
        required: '请选择开始时间'
      },
      enddate: {
        required: '请选择结束时间'
      },
      major: {
        required: '请填写专业名称'
      },
      agree: {
        required: '请选择学历'
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
      index: e.detail.value
    })
  },
  major: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  school: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  keep: function () {
    let that = this;
    let til = new Date(that.data.begindate.replace(/-/g, "/")).getTime()
    let till = new Date(that.data.enddate.replace(/-/g, "/")).getTime()
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}/education/${this.data.eduList.id}`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      data: {
        beginTime: til,
        endTime: till,
        degree: timeUtil.qualifications(parseInt(that.data.index)),
        degreeCode: that.data.index,
        major: that.data.major,
        school: that.data.school,
        isUnified: false,
        toPresent: true
      },
      success(res) {
        if (app.globalData.token) {
          if (res.statusCode === 200) {
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
      }
    })
  },
  delete: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}/education/${this.data.eduList.id}`, // 拼接接口地址(前面为公共部分)
      method: 'delete',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
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
    let edu = JSON.parse(options.edu);

    this.setData({
      eduList: edu,
      school: edu.school,
      begindate: time.formatDate(edu.beginTime),
      enddate: time.formatDate(edu.endTime),
      major: edu.major,
      index: edu.degreeCode,
      degree: edu.degree,
      // end: time.formatDate(new Date())
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