// pages/resume/resume.js
const app = getApp()
var cityList = require('../../utils/city.js');
var industryList = require('../../utils/industry.js');
var positionCatalogList = require('../../utils/positionCatalog.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    visible2: false,
    logout: false,
    boole: false,
    resumeList: '',
    resumeId: '',
    resumeDetailList: '',
    baseList: '',
    cityList: [],
    eduList: '',
    workList: '',
    projectsList: '',
    trainList: '',
    languagesList: '',
    qualificationsList: '',
    skillList: '',
    awardsList: '',
    evaluationList: '',
    avatarUrl: '',
    jobintensionList: '',
    industryList: '',
    positionCatalogList: ''
  },
  //打开弹框
  handleOpen() {
    this.setData({
      visible2: true
    });
  },
  //关闭弹框
  handleClose() {
    this.setData({
      visible2: false
    });
  },
  cert: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}/award/${this.data.id}/cert/url`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {}
    })
  },

  brief: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + '/resume/brief', // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          let resumeList = res.data.data
          let defaultResumeId = res.data.data.defaultResumeId
          app.globalData.resumeId = defaultResumeId
          wx.setStorageSync('2', res.data.data.avatarUrl)
          var value = wx.getStorageSync('2')
          console.log(value)
          if (value) {
            that.setData({
              avatarUrl: value
            });
          } else {
            that.setData({
              avatarUrl: res.data.data.avatarUrl
            });
            wx.setStorageSync('2', res.data.data.avatarUrl)
          }
          that.setData({ //通过setData来修改
            resumeList: resumeList,
            resumeId: defaultResumeId,
          });
          that.briefDetail()
        } else {
          console.log('没有数据')
        }
      }
    })
  },

  initialize: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + '/resume', // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {}
    })
  },

  briefDetail: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success(res) {
        if (app.globalData.token) {
          let resumeList = res.data.data
          that.setData({ //通过setData来修改
            resumeDetailList: resumeList,
          });
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  //个人信息编辑
  base: function (e) {
    var base = JSON.stringify(e.currentTarget.dataset.base)
    // var id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '../../component/base/base?base=' + base + '&id=' + this.data.id,
    })
  },
  //个人信息新增
  baseadd: function (e) {
    // var base = JSON.stringify(e.currentTarget.dataset.base)
    // console.log(base)
    wx.navigateTo({
      url: '../../component/baseadd/baseadd',
    })
  },
  //求职意向编辑
  jobintension: function (e) {
    var target = JSON.stringify(e.currentTarget.dataset.target)
    wx.navigateTo({
      url: '../../component/jobintension/jobintension?target=' + target,
    })
  },
  //求职意向新增
  jobintensionadd: function (e) {
    wx.navigateTo({
      url: '../../component/jobintensionadd/jobintensionadd',
    })
  },
  //教育经历编辑
  education: function (e) {
    var edu = JSON.stringify(e.currentTarget.dataset.edu)
    wx.navigateTo({
      url: '../../component/education/education?edu=' + edu,
    })
  },
  //教育经历添加
  educationadd: function () {
    wx.navigateTo({
      url: '../../component/educationadd/educationadd',
    })
  },
  //工作经历编辑
  work: function (e) {
    var work = JSON.stringify(e.currentTarget.dataset.work)
    wx.navigateTo({
      url: '../../component/work/work?work=' + work,
    })
  },
  //工作经历添加
  workadd: function () {
    wx.navigateTo({
      url: '../../component/workadd/workadd',
    })
  },
  //项目经历编辑
  project: function (e) {
    var project = JSON.stringify(e.currentTarget.dataset.project)
    wx.navigateTo({
      url: '../../component/project/project?project=' + project,
    })
  },
  //项目经历添加
  projectadd: function () {
    wx.navigateTo({
      url: '../../component/projectadd/projectadd',
    })
  },
  //培训经历编辑
  train: function (e) {
    var train = JSON.stringify(e.currentTarget.dataset.train)
    wx.navigateTo({
      url: '../../component/train/train?train=' + train,
    })
  },
  //培训经历添加
  trainadd: function () {
    wx.navigateTo({
      url: '../../component/trainadd/trainadd',
    })
  },
  //语言能力编辑
  language: function (e) {
    var language = JSON.stringify(e.currentTarget.dataset.language)
    wx.navigateTo({
      url: '../../component/language/language?language=' + language,
    })
  },
  //语言能力添加
  languageadd: function () {
    wx.navigateTo({
      url: '../../component/languageadd/languageadd',
    })
  },
  //职称等级编辑
  professional: function (e) {
    var qualifications = JSON.stringify(e.currentTarget.dataset.qualifications)
    wx.navigateTo({
      url: '../../component/professional/professional?qualifications=' + qualifications,
    })
  },
  //职称等级添加
  professionaladd: function () {
    wx.navigateTo({
      url: '../../component/professionaladd/professionaladd',
    })
  },
  //专业技能编辑
  skill: function (e) {
    var skill = JSON.stringify(e.currentTarget.dataset.skill)
    wx.navigateTo({
      url: '../../component/skill/skill?skill=' + skill,
    })
  },
  //专业技能添加
  skilladd: function () {
    wx.navigateTo({
      url: '../../component/skilladd/skilladd',
    })
  },
  //荣誉奖项编辑
  awards: function (e) {
    var awards = JSON.stringify(e.currentTarget.dataset.awards)
    wx.navigateTo({
      url: '../../component/awards/awards?awards=' + awards,
    })
  },
  //荣誉奖项添加
  awardsadd: function () {
    wx.navigateTo({
      url: '../../component/awardsadd/awardsadd',
    })
  },
  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
    this.setData({
      visible2: false
    });
  },
  //自我介绍编辑
  personal: function (e) {
    var evaluation = JSON.stringify(e.currentTarget.dataset.evaluation)
    wx.navigateTo({
      url: '../../component/personal/personal?evaluation=' + evaluation,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    if (app.globalData.token) {
      this.setData({
        logout: true
      });
    } else {
      this.setData({
        logout: false
      });

    }
    this.setData({
      //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
      cityList: cityList.city,
      industryList: industryList.industry,
      positionCatalogList: positionCatalogList.positionCatalog
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
    this.brief()
    wx.hideHomeButton()
    console.log(app.globalData.resumeId)
    if (app.globalData.resumeId === 0) {
      this.initialize()
    }
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