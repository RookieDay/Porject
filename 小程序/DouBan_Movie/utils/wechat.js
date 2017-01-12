'use strict';
var Promise = require('./bluebird');


function login(){
    return new Promise(function(resolve,reject){
        wx.login({
          success: resolve,
          fail: reject
        })
    })
}

function getUserInfo(){
    return new Promise(function(resolve,reject){
        wx.getUserInfo({
          success: resolve,
          fail: reject
        })
    })
}


function setStorage(key,value){
    return new Promise(function(resolve,reject){
        wx.setStorage({
          key: key,
          data: value,
          success: resolve,
          fail: reject
        })
    })
}

function getStorage(key){
    return new Promise(function(resolve,reject){
        wx.getStorage({
          key: key,
          success:resolve,
          fail: reject
        })
    })
}

// wx.getLocation(OBJECT)
// type	String	否	默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
function getLocation(type) {
  return new Promise(function (resolve, reject) {
    wx.getLocation({ type: type, success: resolve, fail: reject });
  });
}

module.exports = {
  login: login,
  getUserInfo: getUserInfo,
  setStorage: setStorage,
  getStorage: getStorage,
  getLocation: getLocation,
  original: wx
};
