// pages/ferrt/ferrt.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [{
        checked: false, //是否选中
        id: 0, //部门能id
        name: "UI设计师",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "腾讯产品经理",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "java面试",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "前端",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "UI设计师",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "腾讯产品经理",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "java面试",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "前端",
      },
    ],
    keyword: '',
    placeholdText: '搜索职位'
  },
  keyword: function (e) { //方法1
    this.setData({
      keyword: e.detail.value
    })
  },
  keep: function () {
    // this.bindKeyInput()
    var that = this;
    wx.navigateTo({
      url: '../position/position?id=' + that.data.keyword
    })
  },
  bindKeyInput: function () {
    var that = this;
    wx.request({
      url: app.config.uploadHost + '/searched/position', // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      data: {
        counties: null,
        degreeMin: null,
        industries: null,
        isGraduate: true,
        jobType: null,
        keyword: that.data.keyword,
        pageNum: 1,
        natures: null,
        pageSize: 10,
        province: null,
        publishedInterval: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        workAgeMax: null,
        workAgeMin: null,
        positionCatalog: ''
      },
      success(res) {
        app.globalData.companyList = res.data.data
        wx.navigateTo({
          url: '../position/position?id=' + that.data.keyword
        })
        // if (app.globalData.token || app.globalData.tokens) {

        //   // // 开始获取数据 eg: textBox(获取文字内容)
        //   // textBox : res.data.data.list.basic.brand_story  // 根据network查看请求到的接口的结构获取相对应的数据
        // } else {
        //   $Toast({
        //     content: res.data.message,
        //     type: 'warning'
        //   });
        // }
      }
    })

  },
  placeholderpwd: function (e) {
    this.setData({
      placeholdText: '',
    })
  },
  outplaceholderpwd: function (e) {
    this.setData({
      placeholdText: '搜索职位',
    })
  },
  back() {
    wx.reLaunch({
      url: '../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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