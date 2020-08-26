// component/jobintension/jobintension.js

var positionCatalogList = require('../../utils/positionCatalog.js');
var industryList = require('../../utils/industry.js');
import WxValidate from '../../utils/WxValidate.js'
const timeUtil = require('../../utils/timeUtil.js');
var cityData = require('../../utils/city.js');
const app = getApp()
const time = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    citysData: cityData.city,
    provinces: [],
    citys: [],
    districts: [],
    value: [0, 0, 0],
    provinceTag: '',
    cityTag: '',
    districtTag: '',
    showModalStatus: false,
    showModalStatusCity: false,
    cityCode: '',
    districtCode: '',
    provinceCode: '',

    positionData: positionCatalogList.positionCatalog,
    positionCatalogFirst: [],
    positionCatalogSecond: [],
    positionCatalogThird: [],
    valuePosition: [0, 0, 0],
    positionCatalogFirstTag: '',
    positionCatalogSecondTag: '',
    PositionTag: '',
    PositionCode: '',

    industryData: industryList.industry,
    industryFirst: [],
    industrySecond: [],
    valueIndustry: [0, 0, 0],
    industryFirstTag:'',
    industrySecondTag:'',
    industryCode: '',
  
    showModalStatus: false,
    showModalStatusPosition: false,
    showModalStatusCity: false,
    showModalStatusIndustry: false,

    positionCatalogList: [],
    industryList: [],
    targetList: '',
    industry: '',
    province: '',

    positionCatalogCad: '',
    jobTypeCad: '',
    salaryCad: '',
    salaryMin: '',
    salaryMax: '',
    jobSearchStatusCad: '',
    positionCatalog: '1313',

    array: ['1K以下', '1K-2K', '2K-4K', '4K-6K', '6K-8K', '8K-10K', '10K-15K', '15K-25K', '25K-35K', '35K以上'],
    objectArray: [{
        id: 0,
        name: '1K以下'
      },
      {
        id: 1,
        name: '1K-2K'
      },
      {
        id: 2,
        name: '2K-4K'
      },
      {
        id: 3,
        name: '4K-6K'
      },
      {
        id: 4,
        name: '6K-8K'
      },
      {
        id: 5,
        name: '8K-10K'
      },
      {
        id: 6,
        name: '10K-15K'
      },
      {
        id: 7,
        name: '15K-25K'
      },
      {
        id: 8,
        name: '25K-35K'
      },
      {
        id: 9,
        name: '35K以上'
      }
    ],
    arrays: ['全职', '兼职', '实习'],
    objectArrays: [{
        id: 0,
        name: '全职'
      },
      {
        id: 1,
        name: '兼职'
      },
      {
        id: 2,
        name: '实习'
      },
    ],
    arraystate: ['离职-随时到岗', '离职-延时到岗', '在职-考虑机会', '在职-暂不考虑'],
    objectArraystate: [{
        id: 0,
        name: '离职-随时到岗'
      },
      {
        id: 1,
        name: '离职-延时到岗'
      },
      {
        id: 2,
        name: '在职-考虑机会'
      },
      {
        id: 3,
        name: '在职-暂不考虑'
      },
    ],
    date: '',
    industryCode: '',
    positionCatalogsCode: '',
    // city: '',
    // citys: ''
  },

  //城市
  initData: function () {
    var cities = this.data.citysData
    var provinces = [];
    var citys = [];
    var districts = [];

    var provincesObj = {};
    var citysObj = {};

    this.data.citysData.forEach(function (province, i) {
      console.log(i)
      provinces.push(province.tag);
    });
    provincesObj = cities[0];
    provincesObj.children.forEach(function (v) {
      citys.push(v.tag);
    });
    citysObj = provincesObj.children[0];
    citysObj.children.forEach(function (v) {
      districts.push(v.tag);
    });
    this.setData({
      provinces: provinces,
      citys: citys,
      districts: districts
    });
  },
  bindChange: function (e) {
    var citysData = this.data.citysData;
    var value = this.data.value;
    var current_value = e.detail.value;
    var citys = [];
    var districts = [];

    var provinceObj = {};
    var cityObj = {};

    provinceObj = citysData[current_value[0]];
    provinceObj.children.forEach(function (v) {
      citys.push(v.tag);
    });
    this.setData({
      citys: citys
    });
    if (value[0] != current_value[0]) {
      // 滑动省份
      cityObj = provinceObj.children[0];
      cityObj.children.forEach(function (v) {
        districts.push(v.tag);
      });
      this.setData({
        districts: districts,
        provinceTag: provinceObj.tag,
        value: [current_value[0], 0, 0]
      });
    } else if (value[0] === current_value[0] && value[1] !== current_value[1]) {
      // 滑动城市
      if (current_value[1] >= provinceObj.children.length) {
        // 数据不存在 跳过
        return;
      }
      cityObj = provinceObj.children[current_value[1]];
      cityObj.children.forEach(function (v) {
        districts.push(v.tag);
      });
      this.setData({
        cityTag: cityObj.tag,
        districts: districts,
        value: [current_value[0], current_value[1], 0]
      });
    } else {
      // 滑动区县
      cityObj = provinceObj.children[current_value[1]];
      this.setData({
        value: current_value,
        districtTag: cityObj.children[this.data.value[2]].tag,
        districtCode: cityObj.children[this.data.value[2]].code,
      });
    }
    if (cityObj.code === null) {
      this.setData({
        cityTag: ''
      });
    } else {
      this.setData({
        cityTag: cityObj.tag,
        cityCode: cityObj.code,
        provinceTag: provinceObj.tag,
        provinceCode: provinceObj.code,
        districtTag: cityObj.children[this.data.value[2]].tag,
        districtCode: cityObj.children[this.data.value[2]].code,
      });
    }
  },
  //职位类型
  initPosition: function () {
    var positionCatalog = this.data.positionData
    var positionCatalogFirst = [];
    var positionCatalogSecond = [];
    var positionCatalogThird = [];

    var positionCatalogFirstObj = {};
    var positionCatalogSecondObj = {};

    this.data.positionData.forEach(function (positionCatalogFirsts, i) {
      positionCatalogFirst.push(positionCatalogFirsts.tag);
    })
    positionCatalogFirstObj = positionCatalog[0];
    positionCatalogFirstObj.children.forEach(function (v) {
      positionCatalogSecond.push(v.tag);
    });
    positionCatalogSecondObj = positionCatalogFirstObj.children[0];
    positionCatalogSecondObj.children.forEach(function (v) {
      positionCatalogThird.push(v.tag);
    });
    this.setData({
      positionCatalogFirst: positionCatalogFirst,
      positionCatalogSecond: positionCatalogSecond,
      positionCatalogThird: positionCatalogThird
    });
  },
  bindChangePosition: function (e) {
    var positionCatalog = this.data.positionData
    var valuePosition = this.data.valuePosition;
    var current_value = e.detail.value;
    var positionCatalogSecond = [];
    var positionCatalogThird = [];

    var positionCatalogFirstObj = {};
    var positionCatalogSecondObj = {};

    positionCatalogFirstObj = positionCatalog[current_value[0]];
    positionCatalogFirstObj.children.forEach(function (v) {
      positionCatalogSecond.push(v.tag);
    });
    this.setData({
      positionCatalogSecond: positionCatalogSecond
    });
    if (valuePosition[0] != current_value[0]) {
      // 滑动省份
      positionCatalogSecondObj = positionCatalogFirstObj.children[0];
      positionCatalogSecondObj.children.forEach(function (v) {
        positionCatalogThird.push(v.tag);
      });
      this.setData({
        positionCatalogFirstTag: positionCatalogFirstObj.tag,
        positionCatalogThird: positionCatalogThird,
        valuePosition: [current_value[0], 0, 0]
      });

    } else if (valuePosition[0] === current_value[0] && valuePosition[1] !== current_value[1]) {
      // 滑动城市
      if (current_value[1] >= positionCatalogFirstObj.children.length) {
        // 数据不存在 跳过
        return;
      }
      positionCatalogSecondObj = positionCatalogFirstObj.children[current_value[1]];
      positionCatalogSecondObj.children.forEach(function (v) {
        positionCatalogThird.push(v.tag);
      });
      console.log(positionCatalogSecondObj.tag)
      this.setData({
        positionCatalogSecondTag: positionCatalogSecondObj.tag,
        positionCatalogThird: positionCatalogThird,
        valuePosition: [current_value[0], current_value[1], 0]
      });
    } else {
      // 滑动区县
      positionCatalogSecondObj = positionCatalogFirstObj.children[current_value[1]];
      this.setData({
        valuePosition: current_value
      });
    }
    if (positionCatalogSecondObj.children[this.data.valuePosition[2]].code === null) {
      this.setData({
        PositionTag: ''
      });
    } else {
      this.setData({
        positionCatalogFirstTag: positionCatalogFirstObj.tag,
        positionCatalogSecondTag: positionCatalogSecondObj.tag,
        PositionTag: positionCatalogSecondObj.children[this.data.valuePosition[2]].tag,
        PositionCode: positionCatalogSecondObj.children[this.data.valuePosition[2]].code
      });
    }

  },
  //企业行业
  initIndustry: function () {
    var industryFirst = [];
    var industrySecond = [];

    this.data.industryData.forEach(function (industry, i) {
      console.log(i)
      industryFirst.push(industry.tag);
      if (i === 0) {
        industrySecond.push(industry.children[i].tag);
      }
    });

    this.setData({
      industryFirst: industryFirst,
      industrySecond: industrySecond,
    });
  },
  bindChangeIndustry: function (e) {
    console.log('1111111')
    var industryData = this.data.industryData;
    var valueIndustry = this.data.valueIndustry;
    var current_value = e.detail.value;
    var industrySecond = [];

    var industryFirstObj = {};
    var industrySecondObj = {};

    industryFirstObj = industryData[current_value[0]];
    industryFirstObj.children.forEach(function (v) {
      industrySecond.push(v.tag);
    });
    this.setData({
      industrySecond: industrySecond
    });
    if (valueIndustry[0] != current_value[0]) {
      // 滑动省份
      industrySecondObj = industryFirstObj.children[0];
      this.setData({
        valueIndustry: [current_value[0], 0, 0]
      });

    } else {
      // 滑动城市
      if (current_value[1] >= industryFirstObj.children.length) {
        // 数据不存在 跳过
        return;
      }
      industrySecondObj = industryFirstObj.children[current_value[1]];
      this.setData({
        valueIndustry: [current_value[0], current_value[1], 0]
      });
    }
    if (industrySecondObj.code === null) {
      this.setData({
        industryTag: ''
      });
    } else {
      this.setData({
        industrySecondTag: industrySecondObj.tag,
        industryFirstTag: industryFirstObj.tag,
        industryCode: industrySecondObj.code
      });
    }

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
      showModalStatusCity: true,
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      })
    }, 200)
  },
  showpositionModal() {
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
      showModalStatusPosition: true,
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      })
      console.log(this)
    }, 200)
  },
  showindustryModal() {
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
      showModalStatusIndustry: true,
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      })
      console.log(this)
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
        showModalStatusCity: false,
        showModalStatusPosition: false,
        showModalStatusIndustry: false,
      })
    }.bind(this), 200)
  },
  //position隐藏
  hidepositionModal() {
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
        showModalStatusPosition: false
      })
    }.bind(this), 200)
    console.log(this.data.name)
  },
  //industry隐藏
  hideindustryModal() {
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
        showModalStatusIndustry: false,
      })
    }.bind(this), 200)
    console.log(this.data.name)
  },

  //验证函数
  initValidate() {
    const rules = {
      PositionTag: {
        required: true
      },
      city: {
        required: true
      },
      industry: {
        required: true
      },
      salaryCad: {
        required: true
      },
      jobTypeCad: {
        required: true
      },
      jobSearchStatusCad: {
        required: true
      },
    }
    const messages = {
      PositionTag: {
        required: '请选择职位类型'
      },
      city: {
        required: '请选择城市'
      },
      industry: {
        required: '请选择企业行业'
      },
      salaryCad: {
        required: '请选择薪资范围'
      },
      jobTypeCad: {
        required: '请选择工作类型'
      },
      phone: {
        required: '请选择求职意向'
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

  keep: function () {
    let that = this;
    wx.request({
      url: app.config.uploadHost + `/resume/${app.globalData.resumeId}/target`, // 拼接接口地址(前面为公共部分)
      method: 'put',
      header: {
        'content-type': 'application/json',
        'Auth-Token': app.globalData.token
      },
      data: {
        arriveTime: null,
        cities: [{
          city: that.data.cityTag,
          district: that.data.districtTag,
          province: that.data.provinceTag,
        }],
        industries: [{
          first:  that.data.industryFirstTag,
          secondary: that.data.industrySecondTag,
        }],
        jobSearchStatus: timeUtil.jobSearchStatus(parseInt(that.data.jobSearchStatusCad)),
        jobSearchStatusCode: that.data.jobSearchStatusCad,
        jobType: timeUtil.jobType(parseInt(that.data.jobTypeCad)),
        jobTypeCode: that.data.jobTypeCad,
        positionCatalogs: [{
          first: that.data.positionCatalogFirstTag,
          secondary: that.data.positionCatalogSecondTag,
          third: that.data.PositionTag
        }],
        salaryMin: that.data.salaryMin,
        salaryMax: that.data.salaryMax,
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

  bindendDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      salaryCad: e.detail.value
    })
    console.log(this.data.salaryCad)
    switch (this.data.salaryCad) {
      case "0":
        this.setData({
          salaryMin: 0,
          salaryMax: 1
        })
        break;
      case "1":
        this.setData({
          salaryMin: 1,
          salaryMax: 2
        })
        break;
      case "2":
        this.setData({
          salaryMin: 2,
          salaryMax: 4
        })
        break;
      case "3":
        this.setData({
          salaryMin: 4,
          salaryMax: 6
        })
        break;
      case "4":
        this.setData({
          salaryMin: 6,
          salaryMax: 8
        })
        break;
      case "5":
        this.setData({
          salaryMin: 8,
          salaryMax: 10
        })
        break;
      case "6":
        this.setData({
          salaryMin: 10,
          salaryMax: 15
        })
        break;
      case "7":
        this.setData({
          salaryMin: 15,
          salaryMax: 25
        })
        break;
      case "8":
        this.setData({
          salaryMin: 25,
          salaryMax: 35
        })
        break;
      case "9":
        this.setData({
          salaryMin: 35,
          salaryMax: null
        })
        break;
    }
  },
  bindPickerChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jobTypeCad: e.detail.value
    })
  },
  bindPickerChangestate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jobSearchStatusCad: e.detail.value
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    this.initData();
    this.initPosition()
    this.initIndustry()
    let target = JSON.parse(options.target);
    console.log(target)
    switch (target.salaryMin) {
      case 0:
        this.setData({
          salaryCad: 0
        })
        break;
      case 1:
        this.setData({
          salaryCad: 1
        })
        break;
      case 2:
        this.setData({
          salaryCad: 2
        })
        break;
      case 4:
        this.setData({
          salaryCad: 3
        })
        break;
      case 6:
        this.setData({
          salaryCad: 4
        })
        break;
      case 8:
        this.setData({
          salaryCad: 5
        })
        break;
      case 10:
        this.setData({
          salaryCad: 6
        })
        break;
      case 15:
        this.setData({
          salaryCad: 7
        })
        break;
      case 25:
        this.setData({
          salaryCad: 8
        })
        break;
      case 35:
        this.setData({
          salaryCad: 9
        })
        break;
    }
    console.log(target.industries[0].secondary)
    this.setData({
      targetList: target,
      industrySecondTag: target.industries[0].secondary,
      industryFirstTag: target.industries[0].first,
      PositionTag: target.positionCatalogs[0].third,
      positionCatalogSecondTag: target.positionCatalogs[0].secondary,
      positionCatalogFirstTag: target.positionCatalogs[0].first,
      jobTypeCad: target.jobTypeCode,
      jobSearchStatusCad: target.jobSearchStatusCode,
      provinceTag: target.cities[0].province,
      cityTag: target.cities[0].city,
      districtTag: target.cities[0].district,
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