// pages/position/position.js
const app = getApp()
var cityList = require('../../utils/city.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscontent: true,
    iscontent: true,
    showLoading: true,
    currentPage: 1,
    active: false,
    actives: false,
    activeT: false,
    activeTs: false,
    value5: '',
    id: '',
    companyList: [],
    cityList: [],
    hiddenn: true,
    hiddennchose: true,
    chose: false,
    chosess: false,
    choses: false,
    footer: false,
    mask: false,
    hiddenns: false,
    region: [],
    customItem: '全部',
    keyword: '',
    province: '',
    salaryMin: '',
    salaryMax: '',
    workAgeMin: '',
    workAgeMax: '',
    salary: '月薪范围',
    cityName: [],

    checkValue: '',
    checkValueWork: '',
    checkValueDe: '',
    checkValueJob: '',
    checkValueSca: '',
    checkValueQua: [],
    checkValueTi: '',
    checkboxArr: [{
        checked: true, //是否选中
        id: 22, //部门能id
        name: "不限",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "1k以下",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "1k-2k",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "2k-4k",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "4k-6k",
      },
      {
        checked: false, //是否选中
        id: 4, //部门能id
        name: "6k-8k",
      },
      {
        checked: false, //是否选中
        id: 5, //部门能id
        name: "8k-10k",
      },
      {
        checked: false, //是否选中
        id: 6, //部门能id
        name: "10k-15k",
      },
      {
        checked: false, //是否选中
        id: 7, //部门能id
        name: "15k-25k",
      },
      {
        checked: false, //是否选中
        id: 8, //部门能id
        name: "25k-35k",
      },
      {
        checked: false, //是否选中
        id: 9, //部门能id
        name: "35k以上",
      },
    ],
    workexperseArr: [{
        checked: true, //是否选中
        id: 22, //部门能id
        name: "不限",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "1-3年",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "3-5年",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "5-10年",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "10年以上",
      },
    ],
    degreeArr: [{
        checked: true, //是否选中
        id: 22, //部门能id
        name: "不限",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "初中及以下",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "中专/中技",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "高中",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "大专",
      },
      {
        checked: false, //是否选中
        id: 4, //部门能id
        name: "本科",
      },
      {
        checked: false, //是否选中
        id: 5, //部门能id
        name: "硕士",
      },
      {
        checked: false, //是否选中
        id: 6, //部门能id
        name: "博士",
      },
    ],
    jobTypeArr: [{
        checked: true, //是否选中
        id: 22, //部门能id
        name: "不限",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "全职",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "兼职",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "实习",
      },
    ],
    scaleArr: [{
        checked: true, //是否选中
        id: 22, //部门能id
        name: "不限",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "少于10人",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "10-100人",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "100-500人",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "500人以上",
      },
    ],
    qualityArr: [{
        checked: true, //是否选中
        id: 22, //部门能id
        name: "不限",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "国有企业",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "民营企业",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "合资企业",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "外资企业",
      },
      {
        checked: false, //是否选中
        id: 4, //部门能id
        name: "事业单位",
      },
    ],
    timeArr: [{
        checked: true, //是否选中
        id: 22, //部门能id
        name: "不限",
      },
      {
        checked: false, //是否选中
        id: 0, //部门能id
        name: "一天以内",
      },
      {
        checked: false, //是否选中
        id: 1, //部门能id
        name: "三天以内",
      },
      {
        checked: false, //是否选中
        id: 2, //部门能id
        name: "五天以内",
      },
      {
        checked: false, //是否选中
        id: 3, //部门能id
        name: "七天以内",
      },
      {
        checked: false, //是否选中
        id: 4, //部门能id
        name: "十五天以内",
      },
    ],
  },


  keyword: function (e) { //方法1
    this.setData({
      keyword: e.detail.value
    })
  },
  //取消
  back: function () { //方法1
    wx.reLaunch({
      url: '../home/home',
    })
  },
  //确定
  keep: function () { //方法1
    this.confirm()
  },
  show: function () {
    var that = this;
    if (this.data.actives === false) {
      if (this.data.active) {
        this.setData({
          active: false,
          chose: false,
          actives: false,
          footer: false,
          mask: false,
          iscontent: true
        });
      } else {
        this.setData({
          active: true,
          chose: true,
          actives: false,
          footer: true,
          mask: true,
          iscontent: false
        });
      }
    } else {
      that.setData({
        actives: false,
        active: true,
        chose: true,
        choses: false,
        footer: true,
        mask: true,
        iscontent: false
      });
    }
  },
  showchose: function () {
    var that = this;
    if (this.data.active === false) {
      if (this.data.actives) {
        this.setData({
          active: false,
          choses: false,
          actives: false,
          footer: false,
          mask: false,
          iscontent: true
        });
      } else {
        this.setData({
          active: false,
          actives: true,
          chose: false,
          choses: true,
          footer: true,
          mask: true,
          iscontent: false
        });
      }
    } else {
      this.setData({
        actives: true,
        choses: true,
        active: false,
        chose: false,
        footer: true,
        mask: true,
        iscontent: false
      });
    }
  },
  bindRegionChange: function (e) {
    let arr = []
    console.log(e.detail.code[1])
    if (e.detail.code[0] === "110000" || e.detail.code[0] === "120000" || e.detail.code[0] === "310000" || e.detail.code[0] === "500000" || e.detail.code[0] === "810000" || e.detail.code[0] === "820000") {
      if (e.detail.code[2] === undefined) {
        this.setData({
          // region: [],
          province: e.detail.code[0],
          city: e.detail.value[0],
          cityName: [],
        })
        console.log(e.detail.value[0], e.detail.value[1], e.detail.value[2])
      } else {
        arr.push(e.detail.code[2])
        this.setData({
          region: arr,
          province: e.detail.code[0],
          city: e.detail.value[2],
          cityName: e.detail.value,
        })
        console.log(e.detail.value[0], e.detail.value[1], e.detail.value[2])
      }
    } else {
      if (e.detail.code[1] === undefined) {
        this.setData({
          // region: [],
          province: e.detail.code[0],
          city: e.detail.value[0],
          cityName: []
        })
      } else {
        arr.push(e.detail.code[1])
        this.setData({
          region: arr,
          province: e.detail.code[0],
          city: e.detail.value[1],
          cityName: e.detail.value,
        })
      }
    }
    this.confirm()
  },
  checkbox: function (e) {
    var index = e.currentTarget.dataset.index; //获取当前点击的下标
    var checkboxArr = this.data.checkboxArr; //选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked; //改变当前选中的checked值
    if (index === 0) {
      this.data.checkboxArr.forEach((item, index, array) => {
        //执行代码
        checkboxArr[index].checked = false
        checkboxArr[0].checked = true
      })
    } else {
      checkboxArr[0].checked = false
    }
    //  this.data.riderCommentList.forEach((item, index, array) => {
    //   //执行代码
    //   item.selected = true
    // })
    this.setData({
      checkboxArr: checkboxArr
    });
  },
  checkboxChange: function (e) {
    var items = this.data.checkboxArr;
    console.log(e)
    if (e.detail.value === '22') {
      this.setData({
        checkboxArr: items,
        checkValue: e.detail.value,
        salary: '薪资范围'
      });
    } else {
      var num = Number(e.detail.value) + 1
    }
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].id == e.detail.value
    }
    this.setData({
      checkboxArr: items,
      checkValue: e.detail.value,
      salary: items[num].name
    });
  },
  checkboxWorkexperse: function (e) {
    var items = this.data.workexperseArr;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].id == e.detail.value
    }
    this.setData({
      workexperseArr: items,
      checkValueWork: e.detail.value
    });
  },
  checkboxDegree: function (e) {
    var items = this.data.degreeArr;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].id == e.detail.value
    }
    this.setData({
      degreeArr: items,
      checkValueDe: e.detail.value
    });
  },
  checkboxJobType: function (e) {
    var items = this.data.jobTypeArr;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].id == e.detail.value
    }
    this.setData({
      jobTypeArr: items,
      checkValueJob: e.detail.value
    });
  },
  checkboxScale: function (e) {
    var items = this.data.scaleArr;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].id == e.detail.value
    }
    this.setData({
      scaleArr: items,
      checkValueSca: e.detail.value
    });
  },
  checkboxQuality: function (e) {
    var checkValue = e.detail.value;
    this.setData({
      checkValueQua: checkValue
    });
  },
  checkboxQua: function (e) {
    var index = e.currentTarget.dataset.index; //获取当前点击的下标
    var checkboxArr = this.data.qualityArr; //选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked; //改变当前选中的checked值
    if (index === 0) {
      this.data.qualityArr.forEach((item, index, array) => {
        //执行代码
        checkboxArr[index].checked = false
        checkboxArr[0].checked = true
      })
    } else {
      checkboxArr[0].checked = false
    }
    this.setData({
      qualityArr: checkboxArr
    });
  },
  checkboxTime: function (e) {
    var items = this.data.timeArr;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].id == e.detail.value
    }
    this.setData({
      timeArr: items,
      checkValueTi: e.detail.value
    });
  },
  //清除
  clearn: function () {
    var that = this;
    var items = this.data.qualityArr;
    var timeArr = this.data.timeArr;
    var scaleArr = this.data.scaleArr;
    var jobTypeArr = this.data.jobTypeArr;
    var degreeArr = this.data.degreeArr;
    var workexperseArr = this.data.workexperseArr;
    var checkboxArr = this.data.checkboxArr;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = false
      items[0].checked = true
    }
    for (var i = 0; i < timeArr.length; ++i) {
      timeArr[i].checked = false
      timeArr[0].checked = true
    }
    for (var i = 0; i < scaleArr.length; ++i) {
      scaleArr[i].checked = false
      scaleArr[0].checked = true
    }
    for (var i = 0; i < jobTypeArr.length; ++i) {
      jobTypeArr[i].checked = false
      jobTypeArr[0].checked = true
    }
    for (var i = 0; i < degreeArr.length; ++i) {
      degreeArr[i].checked = false
      degreeArr[0].checked = true
    }
    for (var i = 0; i < workexperseArr.length; ++i) {
      workexperseArr[i].checked = false
      workexperseArr[0].checked = true
    }
    for (var i = 0; i < checkboxArr.length; ++i) {
      checkboxArr[i].checked = false
      checkboxArr[0].checked = true
    }
    that.setData({
      qualityArr: items,
      timeArr: timeArr,
      scaleArr: scaleArr,
      jobTypeArr: jobTypeArr,
      degreeArr: degreeArr,
      workexperseArr: workexperseArr,
      checkboxArr: checkboxArr,
      checkValueQua: [],
      checkValue: '',
      checkValueWork: '',
      checkValueDe: '',
      checkValueJob: '',
      checkValueSca: '',
      checkValueTi: '',
      region: [],
      province: '',

    });
  },
  //搜索
  bindKeyInput: function () {
    this.confirm()
  },
  //职位详情
  position: function (e) {
    console.log('131')
    var id = e.currentTarget.dataset.id
    var positionid = e.currentTarget.dataset.positionid
    var positionName = e.currentTarget.dataset.positionname
    var companyName = e.currentTarget.dataset.companyname
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&positionid=' + positionid + '&positionname=' + positionName + '&companyname=' + companyName,
    })
  },
  //确认
  confirm: function () {
    var that = this;
    if (this.data.checkValueWork == '' || this.data.checkValueWork == 22) {
      this.setData({
        checkValueWork: null
      });
    }

    if (this.data.checkValueDe == '' || this.data.checkValueDe == 22) {
      this.setData({
        checkValueDe: null
      });
    }

    if (this.data.checkValueJob == '' || this.data.checkValueJob == 22) {
      this.setData({
        checkValueJob: null
      });
    }

    if (this.data.checkValueSca == '' || this.data.checkValueSca == 22) {
      this.setData({
        checkValueSca: null
      });
    }
    if (that.data.checkValueQua.length == 0) {
      that.setData({
        checkValueQua: []
      });
    } else if (that.data.checkValueQua[that.data.checkValueQua.length - 1] == 22) {
      that.setData({
        checkValueQua: []
      });
    } else if (that.data.checkValueQua[0] == 22) {
      that.data.checkValueQua.shift()
    }

    if (that.data.checkValue.length == 0) {
      that.setData({
        checkValue: []
      });
    } else if (that.data.checkValue[that.data.checkValue.length - 1] == 22) {
      that.data.checkValue.pop()
    } else if (that.data.checkValue[0] == 22) {
      that.data.checkValue.shift()
    }

    if (this.data.checkValueTi == '' || this.data.checkValueTi == 22) {
      this.setData({
        checkValueTi: null
      });
    }
    switch (that.data.checkValue) {
      case '0':
        that.setData({ //通过setData来修改
          salaryMin: 0,
          salaryMax: 1
        });
        break;
      case '1':
        that.setData({ //通过setData来修改
          salaryMin: 1,
          salaryMax: 2
        });
        break;
      case '2':
        that.setData({ //通过setData来修改
          salaryMin: 2,
          salaryMax: 4
        });
        break;
      case '3':
        that.setData({ //通过setData来修改
          salaryMin: 4,
          salaryMax: 6
        });
        break;
      case '4':
        that.setData({ //通过setData来修改
          salaryMin: 6,
          salaryMax: 8
        });
        break;
      case '5':
        that.setData({ //通过setData来修改
          salaryMin: 8,
          salaryMax: 10
        });
        break;
      case '6':
        that.setData({ //通过setData来修改
          salaryMin: 10,
          salaryMax: 15
        });
        break;
      case '7':
        that.setData({ //通过setData来修改
          salaryMin: 15,
          salaryMax: 25
        });
        break;
      case '8':
        that.setData({ //通过setData来修改
          salaryMin: 25,
          salaryMax: 35
        });
        break;
      case '9':
        that.setData({ //通过setData来修改
          salaryMin: 35,
          salaryMax: null
        });
        break;
      default:
        that.setData({ //通过setData来修改
          salaryMin: null,
          salaryMax: null
        });
        break;
    }
    switch (that.data.checkValueWork) {
      case '0':
        console.log('13')
        that.setData({ //通过setData来修改
          workAgeMin: 1,
          workAgeMax: 3
        });
        break;
      case '1':
        that.setData({ //通过setData来修改
          workAgeMin: 3,
          workAgeMax: 5
        });
        break;
      case '2':
        that.setData({ //通过setData来修改
          workAgeMin: 5,
          workAgeMax: 10
        });
        break;
      case '3':
        that.setData({ //通过setData来修改
          workAgeMin: 10,
          workAgeMax: null
        });
        break;
      default:
        that.setData({ //通过setData来修改
          workAgeMin: null,
          workAgeMax: null
        });
        break;
    }

    var that = this;
    wx.request({
      url: app.config.uploadHost + '/positions/search', // 拼接接口地址(前面为公共部分)
      method: 'post',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      data: {
        addresses: [{
          city: that.data.cityName[1]?that.data.cityName[1]:null,
          district: that.data.cityName[2]?that.data.cityName[2]:null,
          province: that.data.cityName[0]?that.data.cityName[0]:null
        }],
        degreeMin: that.data.checkValueDe,
        industries: null,
        isGraduate: null,
        industryCodes: null,
        jobType: that.data.checkValueJob,
        keyword: that.data.keyword,
        pageNum: 1,
        natures: that.data.checkValueQua.length === 0 ? null : that.data.checkValueQua,
        pageSize: 10,
        publishedInterval: that.data.checkValueTi,
        salaryMax: that.data.salaryMax,
        salaryMin: that.data.salaryMin,
        size: that.data.checkValueSca,
        sortBy: null,
        sortOrder: null,
        workAgeMax: that.data.workAgeMax,
        workAgeMin: that.data.workAgeMin,
        positionCatalog: null
      },
      success(res) {
        var newsList = res.data.data.list
        if (that.data.salaryMax) {
          that.setData({ //通过setData来修改
            // actives: false,
            active: false,
            activeT: true
          });
        } else {
          that.setData({ //通过setData来修改
            // actives: false,
            active: false,
            activeT: false,
            salary: '薪资范围'
          });
        }
        if (that.data.checkValueDe != null || that.data.workAgeMax != null || that.data.checkValueJob != null || that.data.checkValueSca != null || that.data.checkValueQua.length != 0 || that.data.checkValueTi != null) {
          that.setData({ //通过setData来修改
            // actives: false,
            actives: false,
            activeTs: true
          });
        } else {
          that.setData({ //通过setData来修改
            // actives: false,
            actives: false,
            activeTs: false
          });
        }
        that.setData({ //通过setData来修改
          companyList: newsList,
          hiddennchose: true,
          hiddenns: true,
          // actives: false,
          // active: false,
          chose: false,
          showLoading: false,
          choses: false,
          footer: false,
          mask: false,
          iscontent: true,
          currentPage: 2,
        });
        wx.setNavigationBarTitle({
          title: '相关职位' + '(' + res.data.data.total + ')'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({ //通过setData来修改
      // companyList: app.globalData.companyList.list,
      cityList: cityList.city,
      keyword: options.id
    });
    this.keep()
    // wx.setNavigationBarTitle({
    //   title: '相关职位' + '(' + app.globalData.companyList.total + ')'
    // })
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
    // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    that.setData({ //通过setData来修改
      showLoading: false
    });
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
      url: app.config.uploadHost + '/searched/position',
      data: {
        counties: that.data.region.length === 0 ? null : that.data.region,
        degreeMin: that.data.checkValueDe,
        industries: null,
        isGraduate: null,
        jobType: that.data.checkValueJob,
        keyword: that.data.keyword,
        pageNum: currentPage,
        natures: that.data.checkValueQua.length === 0 ? null : that.data.checkValueQua,
        pageSize: 10,
        province: this.data.province,
        publishedInterval: that.data.checkValueTi,
        salaryMax: that.data.salaryMax,
        salaryMin: that.data.salaryMin,
        size: that.data.checkValueSca,
        workAgeMax: that.data.workAgeMax,
        workAgeMin: that.data.workAgeMin,
        positionCatalog: null
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // wx.hideLoading();
        // if (res.data.data.total === 0) {
        //   that.setData({
        //     showLoading: false
        //   })
        // }
        if (currentPage - 2 >= parseInt(res.data.data.total / 10)) {
          var newsList = res.data.data.list
          var originArticles = that.data.companyList;
          var newArticles = originArticles;
          that.setData({ //通过setData来修改
            companyList: newArticles,
            currentPage: currentPage,
            showLoading: false
          });
          wx.setNavigationBarTitle({
            title: '相关职位' + '(' + res.data.data.total + ')'
          })
        } else {
          var newsList = res.data.data.list
          var originArticles = that.data.companyList;
          var newArticles = originArticles.concat(newsList);
          that.setData({ //通过setData来修改
            companyList: newArticles,
            currentPage: currentPage,
            showLoading: true
          });
          wx.setNavigationBarTitle({
            title: '相关职位' + '(' + res.data.data.total + ')'
          })
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