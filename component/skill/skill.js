// component/skill/skill.js
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    level: 0,
    skillList: '',
    skill: '',
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
      skill: {
        required: true
      },
      level: {
        required: true
      },
    }
    const messages = {
      skill: {
        required: '请填写技能名称'
      },
      level: {
        required: '请选择掌握程度'
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
      level: e.detail.value
    })
  },
  skill: function (e) {
    this.setData({
      skill: e.detail.value
    })
  },
  keep: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resumes/${app.globalData.resumeId}/skills/${this.data.skillList.id}`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      data: {
        level: that.data.level,
        skill: that.data.skill,
        file: null
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
      url: app.config.uploadHost + `/resumes/${app.globalData.resumeId}/skills/${this.data.skillList.id}`, // 拼接接口地址(前面为公共部分)
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
    let skill = JSON.parse(options.skill);
    console.log(skill)
    this.setData({
      skillList: skill,
      level: skill.level,
      skill: skill.skill,
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