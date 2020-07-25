/*
 ** 省市区 - 收货地址 js
 ** www.meizhuangdaka.com
 ** 省市区数据有误的话，自己改：/utils/citydata.js，开源源码
 */

//获取应用实例
var app = getApp();

var cityData = require('../../utils/city.js');

Page({
    data: {
        citysData: cityData.city,
        provinces: [],
        citys: [],
        areas: [],
        value: [0, 0, 0],
        name: ''
    },

    initData: function () {
        var provinces = [];
        var citys = [];
        var areas = [];

        this.data.citysData.forEach(function (province, i) {
            console.log(i)
            provinces.push(province.tag);
            if (i === 0) {
                console.log('13131')
                citys.push(province.children[i].tag);
                //     // areas = province.citys[i].areas;
            }
        });

        this.setData({
            provinces: provinces,
            citys: citys,
            // areas: areas
        });
    },

    bindChange: function (e) {
        var citysData = this.data.citysData;
        var value = this.data.value;
        var current_value = e.detail.value;
        var citys = [];

        var provinceObj = {};
        var cityObj = {};

        provinceObj = citysData[current_value[0]];
        provinceObj.children.forEach(function (v) {
            citys.push(v.tag);
        });
        this.setData({
            citys: citys
        });
        if (value[0] !== current_value[0]) {
            // 滑动省份


            cityObj = provinceObj.citys[0];
            this.setData({
                areas: cityObj.areas,
                value: [current_value[0], 0, 0]
            });

        } else if (value[0] === current_value[0] && value[1] !== current_value[1]) {
            // 滑动城市
            if (current_value[1] >= provinceObj.children.length) {
                // 数据不存在 跳过
                return;
            }
            cityObj = provinceObj.children[current_value[1]];
            this.setData({
                areas: cityObj.areas,
                value: [current_value[0], current_value[1], 0]
            });
        }

        this.setData({
            name: provinceObj.name + '-' + cityObj.name + '-'
        });
    },

    // 页面初始化事件
    onLoad: function () {
        this.initData();
    }
});