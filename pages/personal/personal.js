// pages/personal/personal.js
const WXAPI = require('../../wxapi/main')
 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    userNickname:'',
    fanCount:null,
    focusCount:null,
    userId:null,
    myUserId:null,
    followStatus:false,
    backImage: '',
    _options:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      myUserId:app.globalData.userId
    })
    let userId=options.userId;
    this.setData({
      userId:userId,
      _options:options
    })
    WXAPI.userProfile({
      userId:userId,
      myUserId:app.globalData.userId
    }).then(res=>{
      this.setData({
        avatar:res.result.avatar,
        userNickname:res.result.userNickname,
        fanCount:res.result.fanCount,
        focusCount:res.result.focusCount,
        followStatus:res.result.followStatus,
        backImage: res.result.backImage
      })
      wx.setNavigationBarTitle({
        title: res.result.userNickname,
        success: function() {
          console.log('setNavigationBarTitle success')
        },
        fail: function(err) {
          console.log('setNavigationBarTitle fail, err is', err)
        }
      })
    })
    //
  },
  goList(event){
    let index = event.currentTarget.dataset.index;
    let userId=this.data.userId;
    wx.navigateTo({
      url: '/pages/list/list?index='+index+'&userId='+userId,
    })
  },
  myPublish(){
   let userId=this.data.userId;
   wx.navigateTo({
     url: '/pages/myPublish/myPublish?userId='+userId,
   })
 },
 myDynamic(){
   let userId=this.data.userId;
   wx.navigateTo({
     url: '/pages/myDynamic/myDynamic?userId='+userId,
   })
 },
 follow(){
   console.log("userId",app.globalData.userId)
   console.log("userId",this.data.userId)
   WXAPI.follow({
    userId:this.data.myUserId,
    toUserId:this.data.userId
   }).then(res=>{
     wx.showToast({
       title: '关注成功',
     })
     this.onLoad(this.data._options)
   })
 },
 cancelFollow(){
  WXAPI.cancelFollow({
    userId:this.data.myUserId,
    toUserId:this.data.userId
   }).then(res=>{
     wx.showToast({
       title: '取消关注成功',
     })
     this.onLoad(this.data._options)
   })
 },
 goChat(){
  let toUserId = this.data.userId;
  let toAvatar = this.data.avatar;
  let toNickname = this.data.userNickname;
    wx.navigateTo({
      url: '/pages/chatting/chatting?toUserId=' +toUserId+'&toavatar='+toAvatar+'&tonickname='+toNickname,
    })
 },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
this.onLoad(this.data._options)
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