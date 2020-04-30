//app.js
const WXAPI = require('./wxapi/main')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //首先调用wx.login生成code
    // wx.login({
    //   success:(result)=>{
    //     console.log("wxLogin",result)
    //     WXAPI.login({
    //       code:result.code
    //     }).then(result=>{
    //       console.log("登录返回：",result)
    //       if(result.code!=200){
    //         // 登录错误
    //         wx.showModal({
    //           title: '提示',
    //           content: '无法登录，请重试',
    //           showCancel: false
    //         })
    //         return;
    //       }
    //       if(result.userId==0){
    //         wx.reLaunch({
    //           url: '/pages/login/login',
    //         })
    //       }else {
    //         console.log("token+openId:",result)
    //         wx.setStorageSync('token', result.result.token)
    //         wx.setStorageSync('openid', result.result.openId)
    //         this.globalData.userId=result.result.userId;
    //         this.globalData.avatarUrl=result.result.avatarUrl;
    //         this.globalData.userNickname=result.result.userNickname;
    //         console.log("userId",this.globalData.userId)
    //         wx.reLaunch({
    //           url: '/pages/index/index',
    //         })
    //       }

    //     })
    //   }
    // })

  },
  globalData: {
    userInfo: null,
    userId:2,
    avatarUrl:'',
    userNickname:''
  }
})