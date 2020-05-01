// pages/find/find.js
const WXAPI = require('../../wxapi/main')
 const data = require('../../data/data.js');
 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamic:[],
    pageNum:0,
    pageSize:10
  },
  toDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/dynamicDetail/dynamicDetail?dynamicId=' +index,
    })
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  publish() {
    wx.navigateTo({
      url: '/pages/dynamicPub/dynamicPub',
    })
  },
  getAlldynamic:function(){
    var that = this;
    wx.showLoading({
      "mask": true
    })
    WXAPI.allDynamic({
      userId:app.globalData.userId,
      pageNum:that.data.pageNum,
      pageSize:that.data.pageSize
    }).then(function(res){
      wx.hideLoading();
      let allDynamic = [];
      allDynamic = that.data.dynamic;
      for (var i = 0; i < res.result.length; i++) {
      allDynamic.push(res.result[i]);
    }
      that.setData({
        dynamic:allDynamic
      });
    })
  },
onLoad(options){
  var that=this;
  WXAPI.allDynamic({
    userId:app.globalData.userId,
    pageNum:that.data.pageNum,
    pageSize:that.data.pageSize
  }).then(function(res){
    wx.stopPullDownRefresh();
    that.setData({
      dynamic:res.result
    })
  })
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNum:0
    })
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(){
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.getAlldynamic()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})