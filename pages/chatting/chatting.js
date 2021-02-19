// pages/chatting/chatting.js
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
const app=getApp();
const WXAPI = require('../../wxapi/main')
// socket 连接插件
const io = require('../../utils/weapp.socket.io.js')

// socket 状态更新
var socketMessage = ''
// 上下文对象
var that
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,

    talkContent:[],
    userInputContent:'',
    userId:null,
    toUserId:null,
    toAvatar:'',
    myAvatar:'',
    _options:{}
  },

 /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (this.data.talkContent.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (this.data.talkContent.length - 1)
    })

  },


  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
contentInput:function(e){
  this.data.userInputContent=e.detail.value;
},
sendMsg(){
let sendMessage={};
sendMessage.msg=this.data.userInputContent;
sendMessage.userId=this.data.userId.toString();
sendMessage.toUserId=this.data.toUserId;
// sendMessage.publishTime=util.formatTime(new Date());
// this.talkContent.unshift(msgObj);
this.socket.emit('chat', sendMessage);
this.data.userInputContent="";
this.onLoad(this.data._options);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      userId:app.globalData.userId,
      myAvatar:app.globalData.avatarUrl
    })
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.tonickname,
      success: function() {
        console.log('setNavigationBarTitle success')
      },
      fail: function(err) {
        console.log('setNavigationBarTitle fail, err is', err)
      }
    })
    that.setData({
      toUserId:options.toUserId,
      toAvatar:options.toavatar,
      _options:options
    })
    if(that.data.userId<that.data.toUserId){
      this.setData({
        msgFlag:that.data.userId+":"+that.data.toUserId
      })
    }else{
      this.setData({
        msgFlag:that.data.toUserId+":"+that.data.userId
      })
    }
    console.log("msgflag",that.data.msgFlag);
    this.socketStart();
    var map = {};
    map["msgFlag"] = that.data.msgFlag;
    map["userId"]=that.data.userId;
    map["pageSign"]="chatPage";
    // 当用户点击进入聊天界面,就告诉后端把历史聊天记录发过来
    that.socket.emit('history', map);
  },
/**
   * 启动socket
   */
  socketStart: function () {
// socket 连接地址
// var socketUrl = 'https://www.realityclub6.com?userId='+this.data.userId+'&pageSign=chatPage&token=1234'
var socketUrl = 'ws://127.0.0.1:9999?userId='+this.data.userId+'&pageSign=chatPage&token=1234'
    // 设置socket连接地址 socketUrl
    const socket = (this.socket = io(
      socketUrl,
    ))

    socket.on('connect', () => {
      console.log("app index.js");
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
        // 监听双方的聊天记录,首次进入时获取
        socket.on('historyMsgList',  (d) =>{
          console.log(d);
          this.setData({
            talkContent:d
          })
        })
    // 双方聊天的时候,实时接收'receiveMsg'的数据,其实就是与当前用户聊天的时候对方发来的消息
    socket.on('receiveMsg', (d)=>{
      console.log(d);
      this.data.talkContent.push(d);
      this.onLoad(this.data._options);
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