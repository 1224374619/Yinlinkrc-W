

var positionCatalog = function (index) {
  var a
  switch (index) {
    case 10000:
      a = '销售|客服|市场'
      break;
    case 20000:
      a = '财务|人力资源|行政'
      break;
    case 30000:
      a = '项目|质量|高级管理'
      break;
    case 40000:
      a = 'IT|互联网|通信'
      break;
    case 50000:
      a = '房产|建筑|物业管理'
      break;
    case 60000:
      a = '金融'
      break;
    case 70000:
      a = '采购|贸易|交通|物流'
      break;
    case 80000:
      a = '生产|制造'
      break;
    case 90000:
      a = '传媒|印刷|艺术|设计'
      break;
    case 100000:
      a = '房产|建筑|物业管理'
      break;
    case 110000:
      a = '金融'
      break;
    case 120000:
      a = '采购|贸易|交通|物流'
      break;
    case 130000:
      a = '采购|贸易|交通|物流'
      break;
    case 140000:
      a = '全部'
      break;
  }
  return a;
}

var qualifications = function (index) {
  var a
  switch (index) {
    case 0:
      a = '初中及以下'
      break;
    case 1:
      a = '职中'
      break;
    case 2:
      a = '高中'
      break;
    case 3:
      a = '大专'
      break;
    case 4:
      a = '本科'
      break;
    case 5:
      a = '硕士'
      break;
    case 6:
      a = '博士'
      break;
  }
  return a;
}

var jobType = function (index) {
  var a
  switch (index) {
    case 0:
      a = '全职'
      break;
    case 1:
      a = '兼职'
      break;
    case 2:
      a = '实习'
      break;
  }
  return a;
}

var jobSearchStatus = function (index) {
  var a
  switch (index) {
    case 0:
      a = '离职-随时到岗'
      break;
    case 1:
      a = '离职-延时到岗'
      break;
    case 2:
      a = '在职-考虑机会'
      break;
    case 3:
      a = '在职-暂不考虑'
      break;
  }
  return a;
}

var isUnified = function (index) {
  var a
  switch (index) {
    case false:
      a = '统招'
      break;
    case true:
      a = '非统招'
      break;
  }
  return a;
}


var sub = function (val, start = 0, end = 10) {
  if (val.length == 0 || val == undefined) {
    return;
  }
  if (val.length > end) {
    return val.substring(start, end) + "...";
  } else {
    return val;
  }
}

var quality = function (index) {
  var a
  switch (index) {
    case 0:
      a = '国有企业'
      break;
    case 1:
      a = '外资企业'
      break;
    case 2:
      a = '合资企业'
      break;
    case 3:
      a = '民营企业'
      break;
    case 4:
      a = '事业单位'
      break;
  }
  return a;
}

var level = function (index) {
  var a
  switch (index) {
    case 'NORMAL':
      a = 0
      break;
    case 'GOOD':
      a = 1
      break;
    case 'PROFICIENT':
      a = 2
      break;
    case 'MASTER':
      a = 3
      break
  }
  return a;
}

var levels = function (index) {
  var a
  switch (index) {
    case 0:
      a = 'NORMAL'
      break;
    case 1:
      a = 'GOOD'
      break;
    case 2:
      a = 'PROFICIENT'
      break;
    case 3:
      a = 'MASTER'
      break
  }
  return a;
}

var size = function (index) {
  var a
  switch (index) {
    case 0:
      a = '小于10人'
      break;
    case 1:
      a = '10-100人'
      break;
    case 2:
      a = '100-500人'
      break;
    case 3:
      a = '500人以上'
      break;
  }
  return a;
}
var sex = function (index) {
  var a
  switch (index) {
    case 0:
      a = '男'
      break;
    case 1:
      a = '女'
      break;
  }
  return a;
}


var politicalStatus = function (index) {
  var a
  switch (index) {
    case 0:
      a = '群众'
      break;
    case 1:
      a = '团员'
      break;
    case 2:
      a = '民主党派'
      break;
    case 3:
      a = '预备党员'
      break;
    case 4:
      a = '中共党员'
      break;
  }
  return a;
}

var CodeToTag = function (codeArr, list, Alias) {
  var defaultTarget = {
    targetCode: 'code',
    targetTag: 'tag',
  };

  // if (!(Array.isArray(codeArr) && Array.isArray(list))) {
  //   throw new Error('codeArr&list must be Array!');
  // }

  if (Alias && Alias.constructor !== Object) {
    console.log('Alias must be Object!');
  }

  var tagArr = [];
  var _Objectassign;
  if (Alias) {
    _Objectassign = Alias;
  } else {
    _Objectassign = defaultTarget;
  }
  targetCode = _Objectassign.targetCode;
  targetTag = _Objectassign.targetTag;

  (function getTag(itemCode, itemList) {
    var targetList = itemList.filter(function (item) {
      return item[targetCode] === itemCode;
    })[0];

    if (targetList) {
      tagArr.push(targetList[targetTag]);

      if (targetList.children && targetList.children.length > 0) {
        getTag(codeArr[tagArr.length], targetList.children);
      }
    } else {
      console.log('tag is no found！please check the codeArr and list!');
    }
  })(codeArr[tagArr.length], list);

  return tagArr;
}
module.exports = {
  qualifications: qualifications,
  jobType: jobType,
  quality: quality,
  size: size,
  CodeToTag: CodeToTag,
  politicalStatus: politicalStatus,
  isUnified: isUnified,
  level: level,
  jobSearchStatus: jobSearchStatus,
  sub: sub,
  positionCatalog: positionCatalog,
  sex:sex,
  levels:levels
}