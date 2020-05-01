// pages/suggest/suggest.js
const WXAPI = require('../../wxapi/main')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allActivity:[],
    loadingMoreHidden:true,
    userId:null,
    pageNum:0,
    pageSize:10,
  },
  toDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?activityId=' +index,
    })
  },
  goPersonal(event){
    let userId=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  getSuggest(){
    var that = this;
    wx.showLoading({
      "mask": true
    })
    WXAPI.recommendActivity({
      userId:that.data.userId,
      pageNum: that.data.pageNum,
      pageSize: that.data.pageSize
    }).then(function(res){
      wx.hideLoading()
        if (res.code == 404 || res.code == 700) {
          that.setData({loadingMoreHidden: false});
        }else{
          let allActivity = [];
          allActivity = that.data.allActivity;
        for (var i = 0; i < res.result.length; i++) {
          allActivity.push(res.result[i]);
        }
        that.setData({
          loadingMoreHidden: true,
          allActivity:allActivity
        });
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      "mask": true
    })
that.setData({
  userId:app.globalData.userId
})
    WXAPI.recommendActivity({
      userId:that.data.userId,
      pageNum: that.data.pageNum,
      pageSize: that.data.pageSize
    }).then(function(res){
      wx.hideLoading()
      wx.stopPullDownRefresh()
        that.setData({
          loadingMoreHidden: true,
          allActivity:res.result
        });
        })
      },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
this.setData({
  pageNum:this.data.pageNum+1
})
console.log("触底",this.data.pageNum)
this.getSuggest()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})