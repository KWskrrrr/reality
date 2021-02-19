// pages/dynamicDetail/dynamicDetail.js
const WXAPI = require('../../wxapi/main')
const util=require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamic:{},
    commentList:[],
    dynamicId:null,
    reply:false,
    commentId:null,
    userId:null,
    toUserId:null,
    content:'',
    toContent:'',
    userNickname:'',
    _options:{},
    pageNum:0,
    pageSize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let index = options.dynamicId;
    // console.log("dynamicId:"+index);
    that.setData({
      dynamicId:index,
      userId:app.globalData.userId,
      _options:options
    })
    WXAPI.dynamicDetail({
      userId:app.globalData.userId,
      dynamicId:index,
      pageNum:that.data.pageNum,
      pageSize:that.data.pageSize
    }).then(res=>{
      console.log(res);
      if(res.code===1314) {
        wx.showToast({
          title: '该动态已删除',
          success: function() {
            setTimeout(function() {
              //要延时执行的代码
              wx.navigateBack({
                delta: 1
              })
            }, 1000) //延迟时间
          }
        })
      }
      that.setData({
        dynamic:res.result
      });
    })
    //获取评论列表
    WXAPI.commentList({
      flag:1,
      itemId:index,
      pageNum:that.data.pageNum,
      pageSize:that.data.pageSize
    }).then(res=>{
      wx.stopPullDownRefresh()
      console.log("评论列表:");
      console.log(res);
    //   let commentList = [];
    //   commentList = that.data.commentList;
    //   for (var i = 0; i < res.result.length; i++) {
    //     commentList.push(res.result[i]);
    // }
      that.setData({
        commentList:res.result
      });
    })
  },
  // 点赞/取消赞
  like(){
    console.log("dynamicId",this.data.dynamicId)
    WXAPI.like({
      dynamicId:this.data.dynamicId,
      userId:this.data.userId
    }).then(res=>{
      this.data.dynamic.isLike=!this.data.dynamic.isLike
      this.onLoad(this.data._options)
    })
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  // 前往回复详情页
  toReplyDetail(event){
    let obj=event.currentTarget.dataset.obj
    // 设置对象的itemId属性
     obj.itemId=this.data.dynamicId
     obj.flag=1
    let s=JSON.stringify(obj)
    console.log("s",s);
    wx.navigateTo({
      url: '/pages/replyDetail/replyDetail?obj='+s,
    })
  },
  showReply(event){
    this.setData({
      reply:true
    })
    this.setData({
      commentId:event.currentTarget.dataset.index,
      toUserId:event.currentTarget.dataset.userid,
      userNickname:event.currentTarget.dataset.nickname,
      toContent:event.currentTarget.dataset.tocontent
    })
  },
  hide(){
    this.setData({
      reply:false,
    })
  },
  contentInput(e){
    this.setData({
      content:e.detail.value
    })
  },
  submitForm() {
    var that = this;
    if(that.data.content == ""){
      wx.showToast({
        title: '请输入内容',
      });
      return;
    }
if(that.data.reply){
  WXAPI.reply({
    commentId:that.data.commentId,
    toContent:that.data.toContent,
    content:that.data.content,
    userId:that.data.userId,
    toUserId:that.data.toUserId,
    flag:1,
    itemId:that.data.dynamicId
  }).then(res=>{
    that.setData({
      content:''
    })
    wx.showToast({
      title: '回复成功',
    })
    that.onLoad(that.data._options)
  })
}else{
  WXAPI.comment({
    itemId:that.data.dynamicId,
    content:that.data.content,
    userId:that.data.userId,
    flag:1
  }).then(res=>{
    that.setData({
      content:''
    })
    wx.showToast({
      title: '评论成功',
    })
    that.onLoad(that.data._options)
  })
}
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