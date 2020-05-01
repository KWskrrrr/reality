// pages/notice/notice.js
const WXAPI = require('../../wxapi/main')
 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice:[],
    pageNum:0,
    pageSize:10,
    userId:null,
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  toDetail(event){
    let index=event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?activityId='+index,
    })
  },
getApply(){
  WXAPI.noticeApply({
    userId:this.data.userId,
    pageNum:this.data.pageNum,
    pageSize:this.data.pageSize
  }).then(res=>{
    let notice = that.data.notice;
    for (var i = 0; i < res.result.length; i++) {
      notice.push(res.result[i]);
    }
    that.setData({
      notice:notice
    });
  })
},
agreeApply(event){
  let id=event.currentTarget.dataset.id;
  let activityId=event.currentTarget.dataset.activityid;
  console.log("id",id);
  console.log("activityId",activityId)
WXAPI.agreeJoin({
  userId:id,
  activityId:activityId
}).then(res=>{
  console.log("同意加入成功")
  this.onLoad()
})
},
disagreeApply(event){
  let id=event.currentTarget.dataset.id;
  let activityId=event.currentTarget.dataset.activityid;
WXAPI.disagreeJoin({
  userId:id,
  activityId:activityId
}).then(res=>{
  this.onLoad()
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:app.globalData.userId
    })
    WXAPI.noticeApply({
      userId:app.globalData.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      wx.stopPullDownRefresh()
      console.log("notice",res)
      this.setData({
        notice:res.result
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