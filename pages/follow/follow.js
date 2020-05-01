const WXAPI = require('../../wxapi/main');
 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    follow:[],
    userId:null,
    pageNum:0,
    pageSize:10
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  getFollow(){
    WXAPI.noticeFollow({
      userId:this.data.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      let follow=this.data.follow;
      for (let index = 0; index < res.result.length; index++) {
        follow.push(res.result[index]);
      }
      this.setData({
        follow:follow
      })
    })
  },
  followBack(event){
    let toUserId=event.currentTarget.dataset.id;
    WXAPI.follow({
      toUserId:toUserId,
      userId:this.data.userId
    }).then(res=>{
      wx.showToast({
        title: '关注成功',
      })
      this.onLoad()
    })
  },
  cancelFollow(event){
    let toUserId=event.currentTarget.dataset.id;
    WXAPI.cancelFollow({
      toUserId:toUserId,
      userId:this.data.userId
    }).then(res=>{
      wx.showToast({
        title: '取关成功',
      })
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
    WXAPI.noticeFollow({
      userId:app.globalData.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      wx.stopPullDownRefresh()
      this.setData({
        follow:res.result
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
  onReachBottom: function () {
    this.setData({
      pageNum:this.pageNum+1
    })
    this.getFollow()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})