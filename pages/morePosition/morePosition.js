// pages/morePosition/morePosition.js
const app = getApp()
var cityList = require('../../utils/city.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId: '',
    positionList: [],
    cityList: []
    // indicatordots: false,
    // autoplay: false,
    // auto: false,
    // duration: 1000,
    // age: '',
    // morePosition: [{
    //     positionCatalog: 10000,
    //     num: 2
    //   },
    //   {
    //     positionCatalog: 20000,
    //     num: 1
    //   },
    //   {
    //     positionCatalog: 30000,
    //     num: 1
    //   },
    //   {
    //     positionCatalog: 40000,
    //     num: 1
    //   },
    //   {
    //     positionCatalog: 90000,
    //     num: 1
    //   },
    //   {
    //     positionCatalog: 20000,
    //     num: 1
    //   },
    //   {
    //     positionCatalog: 30000,
    //     num: 1
    //   },
    //   {
    //     positionCatalog: 40000,
    //     num: 1
    //   },
    //   {
    //     positionCatalog: 90000,
    //     num: 1
    //   }
    // ],
    // workexperseArr: [{
    //   positionCatalog: 140000,
    //   num: 2,
    //   checked: true,
    //   id: 22
    // }],
    // workexperseArrs: [],
    // array: [{
    //   name: "lzx",
    //   sex: "nan"
    // }, {
    //   name: "lq",
    //   sex: "nan"
    // }]
  },
  // checkboxWorkexperse: function (e) {
  //   console.log(e)
  //   var items = this.data.workexperseArr;
  //   for (var i = 0; i < items.length; ++i) {
  //     items[i].checked = items[i].id == e.detail.value
  //   }
  //   this.setData({
  //     workexperseArr: items,
  //   });
  //   console.log(e)
  // },
  // checkboxWorkexperses: function (e) {
  //   console.log(e)
  // },recruit
  position: function (e) {
    var id = e.currentTarget.dataset.id
    var positionid = e.currentTarget.dataset.positionid
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&positionid=' + positionid ,
    })
  },
  recruit: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/company/${that.data.companyId}/positions`, // 拼接接口地址(前面为公共部分)
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Auth-Token':app.globalData.token
      },
      success(res) {
        let newsList = res.data.data.list
        that.setData({ //通过setData来修改
          positionList: newsList,
          total: res.data.data.total
        });
        wx.setNavigationBarTitle({
          title: '在招职位' + '(' + res.data.data.total + ')'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let companyId = options.id
    this.setData({
      companyId: companyId,
      cityList: cityList.city
    });
    this.recruit()
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