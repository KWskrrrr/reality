const WXAPI = require('../../wxapi/main');
 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good:[],
    userId:null,
    pageNum:0,
    pageSize:10
  },
  goDynamic(event){
    let index=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/dynamicDetail/dynamicDetail?dynamicId='+index,
    })
  },
  goPersonal(event){
    let index=event.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+index,
    })
  },
  getLike(){
    WXAPI.noticeLike({
      userId:this.data.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      wx.stopPullDownRefresh()
      let notice = that.data.notice;
      for (var i = 0; i < res.result.length; i++) {
        notice.push(res.result[i]);
      }
      that.setData({
        good:notice
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:app.globalData.userId
    })
    WXAPI.noticeLike({
      userId:this.data.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      wx.stopPullDownRefresh()
      console.log("good",res)
      this.setData({
        good:res.result
      })
    })
  },
  onReachBottom: function() {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.getApply()
  },
  onPullDownRefresh: function() {
    this.setData({
      pageNum: 0
    });
    this.onLoad()
    // wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})