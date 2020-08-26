// component/base/base.js
const time = require("../../utils/util.js");
const cityData = require('../../utils/city.js');
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
const timeUtil = require('../../utils/timeUtil.js');

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
    showModalStatusBegin: false,
    years,
    year: date.getFullYear(),
    months,
    month: 0,
    days,
    day: 0,
    valueTime: [9999, 0, 0],

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


    end: time.formatDate(new Date()),
    base: '',
    region: [],
    customItem: '',
    province: '',
    phone: '',
    email: '',
    fullName: '',
    begindate: '',
    borndate: '',
    begindateNew: '',
    borndateNew: '',
    indexsex: '',
    indexgraduate: '',
    indexor: '',
    indexcata: '',
    indexagree: '',
    indexoversearAge: '',
    arraysex: ['男', '女'],
    objectArraysex: [{
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      },
    ],
    arraygraduate: ['是', '否'],
    objectArraygraduate: [{
        id: true,
        name: '是'
      },
      {
        id: false,
        name: '否'
      },
    ],
    arrayor: ['积极找工作', '随便看看', '暂时不换工作'],
    objectArrayor: [{
        id: 0,
        name: '暂时不换工作'
      },
      {
        id: 1,
        name: '随便看看'
      },
      {
        id: 2,
        name: '暂时不换工作'
      },
    ],
    arraycata: ['群众', '团员', '民主党派', '预备党员', '中共党员'],
    objectArraycata: [{
        id: 0,
        name: '群众'
      },
      {
        id: 1,
        name: '团员'
      },
      {
        id: 2,
        name: '民主党派'
      },
      {
        id: 3,
        name: '预备党员'
      },
      {
        id: 4,
        name: '中共党员'
      },
    ],
    arrayagree: ['初中及以下', '职中', '高中', '大专', '本科', '硕士', '博士'],
    objectArrayagree: [{
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
        id: 3,
        name: '硕士'
      },
      {
        id: 4,
        name: '博士'
      },
    ],
    arrayoversearAge: ['无', '1年', '2年', '3年', '4年', '5年', '6年', '7年'],
    objectArrayoversearAge: [{
        id: 0,
        name: '无'
      },
      {
        id: 1,
        name: '1年'
      },
      {
        id: 2,
        name: '2年'
      },
      {
        id: 3,
        name: '3年'
      },
      {
        id: 4,
        name: '4年'
      },
      {
        id: 5,
        name: '5年'
      },
      {
        id: 6,
        name: '6年'
      },
      {
        id: 7,
        name: '7年'
      },
    ],
  },
  showcityModalss() {
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
  hidecityModals() {
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
      borndate: this.data.borndateNew ? this.data.borndateNew : '2020-01-01'
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showModalStatusBegin: false,
        showModalStatusEnd: false,
        borndateNew: ''
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
  bindChangeTime(e) {
    const val = e.detail.value
    console.log(e)
    if (e.detail.value[1] === 0 || e.detail.value[1] === 2 || e.detail.value[1] === 4 || e.detail.value[1] === 6 || e.detail.value[1] === 7 || e.detail.value[1] === 9 || e.detail.value[1] === 11) {
      const days = []
      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        borndateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else if (e.detail.value[1] === 1) {
      const days = []
      for (let i = 1; i <= 29; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        borndateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    } else {
      const days = []
      for (let i = 1; i <= 30; i++) {
        days.push(i)
      }
      this.setData({
        days: days,
        borndateNew: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
      })
    }
  },
  bindChangeTimeBegin(e) {
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
  //city隐藏
  hidecityModal() {
    let that = this
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
      provinceTag: that.data.provinceTag?that.data.provinceTag:"北京市",
      provinceCode: that.data.provinceCode?that.data.provinceCode:110000,
      cityTag: that.data.cityTag?that.data.cityTag:"北京市",
      cityCode: that.data.cityCode?that.data.cityCode:110100,
      districtTag: that.data.districtTag?that.data.districtTag:"东城区",
      districtCode: that.data.districtCode?that.data.districtCode:110101,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showModalStatusCity: false,
      })
    }.bind(this), 200)
  },
  //city隐藏
  hidecityModales() {
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
        showModalStatusCity: false,
      })
    }.bind(this), 200)
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        name: true
      },
      sex: {
        required: true
      },
      graduate: {
        required: true
      },
      city: {
        required: true
      },
      bornDate: {
        required: true
      },
      phone: {
        required: true,
        tel: true
      },
      or: {
        required: true
      },
      time: {
        required: true
      },
      cata: {
        required: true
      },
      agree: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      overseasAge: {
        required: true,
      },
    }
    const messages = {
      name: {
        required: '请填写姓名',
        name: '请填写正确姓名'
      },
      sex: {
        required: '请选择性别'
      },
      graduate: {
        required: '请选择是否应届'
      },
      city: {
        required: '请选择城市'
      },
      born: {
        required: '请选择生日'
      },
      phone: {
        required: '请填写手机号',
        phone: '请填写正确的手机号'
      },
      or: {
        required: '请选择求职状态'
      },
      time: {
        required: '请选择开始工作时间 '
      },
      cata: {
        required: '请选择政治面貌'
      },
      agree: {
        required: '请选择最高学历'
      },
      email: {
        required: '请填写邮箱',
        email: '请填写正确的邮箱'
      },
      overseasAge: {
        required: '请选择海外工作年限',
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

  bindbornDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(new Date(e.detail.value.replace(/-/g, "/")).getTime())
    this.setData({
      borndate: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(new Date(e.detail.value.replace(/-/g, "/")).getTime())
    this.setData({
      begindate: e.detail.value
    })
  },
  bindPickerChangesex: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexsex: e.detail.value
    })
  },
  bindPickerChangegraduate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexgraduate: e.detail.value
    })
  },
  bindPickerChangeor: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexor: e.detail.value
    })
  },
  bindPickerChangecata: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexcata: e.detail.value
    })
  },
  bindPickerChangeagree: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexagree: e.detail.value
    })
  },
  bindPickerChangeoversearAge: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexoversearAge: e.detail.value
    })
  },

  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  email: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  fullName: function (e) {
    this.setData({
      fullName: e.detail.value
    })
  },
  keep: function () {
    let that = this;
    let til = new Date(that.data.begindate.replace(/-/g, "/")).getTime()
    let till = new Date(that.data.borndate.replace(/-/g, "/")).getTime()
    if (that.data.indexoversearAge > new Date().getFullYear() - new Date(that.data.begindate).getFullYear()) {
      wx.showModal({
        content: '海外工作年限不能大于工作时间'
      })
    } else {
      wx.request({
        url: app.config.uploadHost + `/resume/${app.globalData.resumeId}/base`, // 拼接接口地址(前面为公共部分)
        method: 'put',
        header: {
          'content-type': 'application/json',
          'Auth-Token': app.globalData.token
        },
        data: {
          avatar: null,
          overseasAge: that.data.indexoversearAge,
          workYear: til,
          politicalStatus: timeUtil.politicalStatus(parseInt(that.data.indexcata)),
          politicalStatusCode: that.data.indexcata,
          birthday: till,
          province: that.data.provinceTag,
          provinceCode: that.data.provinceCode,
          city: that.data.cityTag,
          cityCode: that.data.cityCode,
          district: that.data.districtTag,
          districtCode: that.data.districtCode,
          fullName: that.data.fullName,
          sex: timeUtil.sex(parseInt(that.data.indexsex)),
          sexCode: that.data.indexsex,
          degree: timeUtil.qualifications(parseInt(that.data.indexagree)),
          degreeCode: that.data.indexagree,
          email: that.data.email,
          phone: that.data.phone,
          isGraduate: true,
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
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