// pages/replyDetail/replyDetail.js
const WXAPI = require('../../wxapi/main')
const util=require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:{},
    replyList:[],//回复列表
    firstComment:{},//楼主评论
    content:'',//回复内容
    toContent:'',//被回复内容
    commentId:null,
    itemId:null,//活动id
    replyId:null,
    toNickname:'',
    toUserId:null,
    fromUserId:null,
    myUserId:null,
    flag:null,
    pageNum:0,
    pageSize:10,
    loadingMoreHidden:true,
    _options:{}
  },
  reply(event){
    this.setData({
      toNickname:event.currentTarget.dataset.nickname,
      toUserId:event.currentTarget.dataset.touserid,
      fromUserId:event.currentTarget.dataset.fromuserid,
      toContent:event.currentTarget.dataset.tocontent
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
if(that.data.flag==1){
  WXAPI.reply({
    commentId:that.data.commentId,
    content:that.data.content,
    toContent:that.data.toContent,
    userId:that.data.myUserId,
    toUserId:that.data.fromUserId,
    flag:1,
    itemId:that.data.itemId
  }).then(res=>{
    that.setData({
      content:''
    })
    wx.showToast({
      title: '回复成功',
    })
    that.onLoad(that.data._options)
  })
}else if(that.data.flag==0){
  WXAPI.reply({
    commentId:that.data.commentId,
    content:that.data.content,
    toContent:that.data.toContent,
    userId:that.data.myUserId,
    toUserId:that.data.fromUserId,
    flag:0,
    itemId:that.data.itemId
  }).then(res=>{
    that.setData({
      content:''
    })
    wx.showToast({
      title: '回复成功',
    })
    that.onLoad(that.data._options)
  })
}

},
delReply(event){
  let fromUserId=event.currentTarget.dataset.fromuserid;
  let replyId=event.currentTarget.dataset.replyid;
  wx.showModal({
    title: '提示',
    content: '是否要删除该回复？',
    success: (res)=> {
      if (res.confirm) {
  if(fromUserId==this.data.myUserId){
    wx.request({
      url: "https://www.realityclub6.com/reply/delete",
      method: 'post',
      data: {
        "commentId":this.data.commentId,
        "replyId":replyId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:(request)=> {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad(this.data._options)
      },
      fail(error) {
        reject(error)
      }
    })
  }else{
   wx.showModal({
    title: '提示',
    content: '您不能删除别人的评论哟~',
   })
  }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('====',options.obj,typeof options.obj)
    let obj=options.obj
    if(typeof options.obj!=="object") {
      obj=JSON.parse(options.obj)
    }
     console.log("obj",obj)
    // 设置楼主评论信息
    this.setData({
      myUserId:app.globalData.userId,
      firstComment:obj,
      toNickname:obj.userNickname,
      fromUserId:obj.userId,
      commentId:obj.commentId,
      toContent:obj.content,
      itemId:obj.itemId,
      flag:obj.flag,
      _options:options
    })
    // 获取回复列表
    WXAPI.replyList({
      commentId:this.data.commentId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      this.setData({
        replyList:res.result
      })
      console.log(this.data.replyList)
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function() {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
        // 获取回复列表
        WXAPI.replyList({
          commentId:this.data.commentId,
          pageNum:this.data.pageNum,
          pageSize:this.data.pageSize
        }).then(res=>{
          let replyList= this.data.replyList;
          for (var i = 0; i < res.result.length; i++) {
            replyList.push(res.result[i]);
          }
          this.setData({
            replyList:replyList
          })
        })
  },
  onPullDownRefresh: function() {
    this.setData({
      pageNum: 0
    });
        // 获取回复列表
        WXAPI.replyList({
          commentId:this.data.commentId,
          pageNum:this.data.pageNum,
          pageSize:this.data.pageSize
        }).then(res=>{
          wx.stopPullDownRefresh()
          this.setData({
            replyList:res.result
          })
        })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})