// pages/message/message.js
const WXAPI = require('../../wxapi/main')
const app=getApp();
// socket 连接插件
const io = require('../../utils/weapp.socket.io.js')

// socket 状态更新
var socketMessage = ''
// 上下文对象
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyCount:null,
    likeCount:null,
    replyCount:null,
    followCount:null,
    userId:null,
    unReadCount:null,
    message:[]
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
notice(){
  wx.navigateTo({
    url: '/pages/notice/notice',
  })
  this.setData({
    applyCount:0
  })
},
good(){
  wx.navigateTo({
    url: '/pages/good/good',
  })
  this.setData({
    likeCount:0
  })
},
reply(){
  wx.navigateTo({
    url: '/pages/reply/reply',
  })
},
follow(){
  wx.navigateTo({
    url: '/pages/follow/follow',
  })
  this.setData({
    followCount:0
  })
},
toChat(event){
  let index = event.currentTarget.dataset.touserid;
  let toAvatar = event.currentTarget.dataset.toavatar;
  let toNickname = event.currentTarget.dataset.tonickname;
    wx.navigateTo({
      url: '/pages/chatting/chatting?toUserId=' + index+'&toavatar='+toAvatar+'&tonickname='+toNickname,
    })
    this.setData({
      unReadCount:0
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("--------globalId",app.globalData.userId)
    this.setData({
      userId:app.globalData.userId
    })
    this.socketStart();
  },
  /**
   * 启动socket
   */
  socketStart: function () {
// socket 连接地址,每个页面通过pageSign进行标识
var socketUrl = 'https://www.realityclub6.com?userId='+this.data.userId+'=7&pageSign=msgPage&token=1234'
    // 设置socket连接地址 socketUrl
    const socket = (this.socket = io(
      socketUrl,
    ))

    socket.on('connect', () => {
      console.log("app logs.js");
    })

    socket.on('connect_error', d => {
    })

    socket.on('connect_timeout', d => {
    })

    socket.on('disconnect', reason => {
    })

    socket.on('reconnect', attemptNumber => {
    })

    socket.on('reconnect_failed', () => {
    })

    socket.on('reconnect_attempt', () => {
    })

    socket.on('error', err => {
    })

    socket.on('message', function (d) {
    })
    // 监听当前用户的最近会话列表
    socket.on('latestMsgList', (d) => {
      console.log(d);
      this.setData({message:d})
    })
    socket.on('notice', (d) => {
      console.log(d);
      this.setData({
        replyCount:d.replyCount,
        followCount:d.followCount,
        applyCount:d.applyCount,
        likeCount:d.agreeCount
      })
    })


  },

  /**
   * 断开socket
   */
  socketStop: function () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
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
this.onLoad()
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