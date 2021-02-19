//获取应用实例
const app = getApp()
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusCount:0,
    fanCount:0,
    userId:null,
    avatarUrl:'',
    userNickname:'',
    backImage: ''
  },
  onLoad() {
    this.setData({
      userId:app.globalData.userId,
      avatarUrl:app.globalData.avatarUrl,
      userNickname:app.globalData.userNickname
    })
    console.log("my",this.data.avatarUrl)
    WXAPI.userProfile({
      userId:app.globalData.userId,
      myUserId:app.globalData.userId
    }).then(res=>{
      this.setData({
        userId:app.globalData.userId,
        avatarUrl:res.result.avatar,
        userNickname:res.result.userNickname,
        fanCount:res.result.fanCount,
        focusCount:res.result.focusCount,
        backImage: res.result.backImage
      })
    })
  },
  goList(event){
    let index = event.currentTarget.dataset.index;
    let userId=this.data.userId;
    wx.navigateTo({
      url: '/pages/list/list?index='+index+'&userId='+userId,
    })
  },
 myActivity(){
   let userId=app.globalData.userId;
   wx.navigateTo({
     url: '/pages/myActivity/myActivity?userId='+userId,
   })
 },
 myPublish(){
  let userId=app.globalData.userId;
  wx.navigateTo({
    url: '/pages/myPublish/myPublish?userId='+userId,
  })
},
myDynamic(){
  let userId=app.globalData.userId;
  wx.navigateTo({
    url: '/pages/myDynamic/myDynamic?userId='+userId,
  })
}})