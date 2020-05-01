//获取应用实例
const app = getApp()
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    follow_count:null,
    fans_count:null,
    userId:null,
    avatarUrl:'',
    userNickname:''
  },
  onLoad() {
    this.setData({
      userId:app.globalData.userId,
      avatarUrl:app.globalData.avatarUrl,
      userNickname:app.globalData.userNickname
    })
    console.log("my",this.data.avatarUrl)
    WXAPI.followedList({
      userId:this.data.userId
    }).then(res=>{
      this.setData({
        follow_count:res.result.length
      })
    })
    WXAPI.fansList({
      userId:this.data.userId
    }).then(res=>{
      this.setData({
        fans_count:res.result.length
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
}
})