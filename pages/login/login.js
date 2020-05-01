// pages/login/login.js
const WXAPI = require('../../wxapi/main')
const app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl:'',
    nickName:'',
    gender:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']){
          console.log("用户授权了");

        } else {
          //用户没有授权
          console.log("用户没有授权");
  }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.setData({
        avatarUrl:e.detail.userInfo.avatarUrl,
        nickName:e.detail.userInfo.nickName,
        gender:e.detail.userInfo.gender
      })
      app.globalData.avatarUrl=e.detail.userInfo.avatarUrl;
      app.globalData.nickName=e.detail.userInfo.nickName;
      this.login();
    } 
   },
  login:function(){
    WXAPI.userInfo({
      openId:wx.getStorageSync('openid'),
      avatarUrl:this.data.avatarUrl,
      nickName:this.data.nickName,
      gender:this.data.gender
    }).then(res=>{
      console.log("userId",res)
      console.log("openId",wx.getStorageSync('openid'))
      app.globalData.userId=res.result;
      console.log("global",app.globalData.userId)
    })
    wx.reLaunch({
      url: '/pages/index/index',
    })
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