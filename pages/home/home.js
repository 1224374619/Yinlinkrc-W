// pages/home/home.js
const app = getApp()
var cityList = require('../../utils/city.js');
const {
  $Toast
} = require('../../dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    floorstatus: true,
    currentPage: 1,
    value5: '',
    positionList: [],
    companyList: [],
    cityList: [],
    keyword: '',
    showLoading: true,
    showLoadings: false,

    indicatordots: false,
    autoplay: true,
    auto: true,
    duration: 1000,
    imgUrls: [
      '../../icons/a1.png',
      '../../icons/a2.png',
      '../../icons/a3.png',
      '../../icons/a4.png',
      '../../icons/a5.png',
      '../../icons/a6.png',
      '../../icons/a7.png',
      '../../icons/a8.png',
      '../../icons/a9.png',
      '../../icons/a10.png',
      '../../icons/a11.png',
      '../../icons/a12.png',
      '../../icons/a13.png',
    ],
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  keyfocus: function (e) {
    wx.navigateTo({
      url: '../ferrt/ferrt',
    })
    // this.bindKeyInput()
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
        keyword: this.data.keyword,
        pageNum: 1,
        natures: null,
        pageSize: 10,
        province: 310000,
        publishedInterval: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        workAgeMax: null,
        workAgeMin: null,
        positionCatalog: ''
      },
      success(res) {
        var newsList = res.data.data
        that.setData({ //通过setData来修改
          companyList: newsList
        });
        app.globalData.companyList = res.data.data
        wx.navigateTo({
          url: '../position/position',
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
  position: function (e) {
    var id = e.currentTarget.dataset.id
    var positionid = e.currentTarget.dataset.positionid
    var positionName = e.currentTarget.dataset.positionname
    var companyName = e.currentTarget.dataset.companyname
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&positionid=' + positionid + '&positionname=' + positionName + '&companyname=' + companyName,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getInfo()
    var that = this
    var value = wx.getStorageSync('1')
    console.log(value)
    if (value) {
      wx.getStorage({
        key: '1',
        success: function (res) {
          console.log(res)
          that.setData({
            positionList: res.data
          });
        },
      })
    } else {
      this.onPullDownRefresh()
    }
    console.log(app.globalData.positionList)
    that.setData({
      //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
      cityList: cityList.city,
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
  onShow: function (options) {
    console.log(app.globalData.positionList)
    // this.getInfo()
    wx.hideHomeButton()
  },
  getInfo() {
    var that = this;
    wx.request({
      url: app.config.uploadHost + '/positions/search', // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      data: {
        addresses: null,
        degreeMin: null,
        industries: null,
        industryCodes: null,
        isGraduate: true,
        jobType: null,
        keyword: null,
        natures: null,
        pageNum: 1,
        pageSize: 10,
        positionCatalog: null,
        publishedInterval: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: null,
        workAgeMin: null,
      },
      success(res) {
        var newsList = res.data.data.list
        that.setData({ //通过setData来修改
          positionList: newsList
        });
      }
    })
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
    var that = this
    // that.setData({ //通过setData来修改
    //   showLoadings: true
    // });
    wx.request({
      url: app.config.uploadHost + '/positions/search', // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      data: {
        addresses: null,
        degreeMin: null,
        industries: null,
        isGraduate: true,
        jobType: null,
        keyword: null,
        pageNum: 1,
        natures: null,
        pageSize: 40,
        publishedInterval: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: null,
        workAgeMin: null,
        positionCatalog: null,
        industryCodes: null
      },
      success(res) {
        var newsList = res.data.data.list
        that.setData({ //通过setData来修改
          positionList: newsList
        });
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 加载下一页数据
   */
  loadMoreData: function () {
    var that = this
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage += 1; // 加载当前页面的下一页数据
    var tips = "加载第" + (currentPage + 1) + "页";
    console.log("load page " + (currentPage + 1));
    // wx.showLoading({
    //   title: tips,
    // })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({
      url: app.config.uploadHost + '/positions/search',
      data: {
        addresses: null,
        degreeMin: null,
        industries: null,
        isGraduate: true,
        jobType: null,
        keyword: null,
        pageNum: currentPage,
        natures: null,
        pageSize: 10,
        publishedInterval: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: null,
        workAgeMin: null,
        positionCatalog: null,
        industryCodes: null
      },
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      success: function (res) {
        if (currentPage - 2 >= parseInt(res.data.data.total / 10)) {
          var newsList = res.data.data.list
          var originArticles = that.data.positionList;
          var newArticles = originArticles;
          that.setData({ //通过setData来修改
            positionList: newArticles,
            currentPage: currentPage,
            showLoading: false
          });
        } else {
          var newsList = res.data.data.list
          var originArticles = that.data.positionList;
          var newArticles = originArticles.concat(newsList);
          that.setData({ //通过setData来修改
            positionList: newArticles,
            currentPage: currentPage,
            showLoading: true
          });
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMoreData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})