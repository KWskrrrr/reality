// pages/detail/detail.js
const WXAPI = require('../../wxapi/main')
const data = require('../../data/data.js')
const util=require('../../utils/util.js')
const app = getApp()
var lastTime=Date.now()
var time=2000
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    detailObj:{},//活动详情
    index:null,
    commentList:[],//评论列表
    comment:false,//点击发表
    reply:false,//点击回复
    commentId:null, //评论id
    userId:null,
    toUserId:null, //被回复id
    itemId:null,//活动id
    content:'',//输入内容
    toContent:'',//被回复的内容
    userNickname:'',
    _options:{},

    loadingMoreHidden:true,
    curPage:0,
    pageSize:10,
  },
     /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取参数值
    let index = options.activityId;
    // console.log(index)
    that.setData({
      itemId:index,
      userId:app.globalData.userId,
      _options:options
    })
    WXAPI.activityDetail({
      userId:app.globalData.userId,
      activityId:index,
      pageNum:that.data.curPage,
      pageSize:that.data.pageSize
    }).then(res=>{
       console.log("活动详情",res);
      wx.stopPullDownRefresh()
      that.setData({
        detailObj:res.result
      });
    })
   //获取评论列表
   WXAPI.commentList({
    flag:0,
    itemId:that.data.itemId,
    pageNum:that.data.curPage,
    pageSize:that.data.pageSize
  }).then(res=>{
    let comment = that.data.commentList;
    for (var i = 0; i < res.result.length; i++) {
      comment.push(res.result[i]);
    }
    that.setData({
      commentList:comment
    });
  })
  },
  join(){
    var nowTime=Date.now();
    if(nowTime-lastTime>=time){
      WXAPI.join({
        userId:this.data.userId,
        activityId:this.data.itemId
      }).then(res=>{
        console.log(res);
        wx.showToast({
          title: '已发送请求',
        })
      })
      lastTime=nowTime
    }
  },
  cancleJoin(){
    var nowTime=Date.now();
    if(nowTime-lastTime>=time){
    WXAPI.join({
      userId:this.data.userId,
      activityId:this.data.itemId
    }).then(res=>{
      console.log(res);
      wx.showToast({
        title: '已取消加入',
      })
    })
    lastTime=nowTime
  }
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  memberList(){
    wx.navigateTo({
      url: '/pages/memberList/memberList?activityId='+this.data.itemId,
    })
  },
  // 前往回复详情页
  toReplyDetail(event){
    let obj=event.currentTarget.dataset.obj
    // 设置对象的itemId属性
     obj.itemId=this.data.itemId
     obj.flag=0
    let s=JSON.stringify(obj)
    console.log("s",s);
    wx.navigateTo({
      url: '/pages/replyDetail/replyDetail?obj='+s,
    })
  },
  getCommentList(){
    var that=this;
     //获取评论列表
     WXAPI.commentList({
      flag:0,
      itemId:that.data.itemId,
      pageNum:that.data.curPage,
      pageSize:that.data.pageSize
    }).then(res=>{
      let comment = that.data.commentList;
      for (var i = 0; i < res.result.length; i++) {
        comment.push(res.result[i]);
      }
      that.setData({
        commentList:comment
      });
    })
  },
  // 点击发表
  showComment(){
    this.setData({
      comment:true
    })
  },
  //点击回复
  showReply(event){
    this.setData({
      reply:true
    })
    this.setData({
      commentId:event.currentTarget.dataset.commentid,
      toUserId:event.currentTarget.dataset.userid,
      userNickname:event.currentTarget.dataset.nickname,
      toContent:event.currentTarget.dataset.tocontent
    })
    console.log(this.data.userId)
  },
  //删除评论
  delComment(event){
    let userid=event.currentTarget.dataset.userid;
    let index=event.currentTarget.dataset.commentid;
    var that=this;
    console.log("itemId",that.data.itemId)
    console.log("commentId",index)
    wx.showModal({
      title: '提示',
      content: '是否要删除该评论？',
      success: (res)=> {
        if (res.confirm) {
    if(userid==this.data.userId){
      wx.request({
        url: "https://www.realityclub6.com/comment/delete",
        method: 'post',
        data: {
          itemId:parseInt(that.data.itemId),
          flag:0,
          commentId:index,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success:(request)=> {
          wx.showToast({
            title: '删除成功',
          })
          that.onLoad(that.data._options)
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
  hide(){
    this.setData({
      reply:false,
      comment:false
    })
  },
  cancleReply(){
    this.setData({
      reply:false
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
  console.log("toContent",that.data.toContent)
  WXAPI.reply({
    commentId:that.data.commentId,
    toContent:that.data.toContent,
    content:that.data.content,
    userId:that.data.userId,
    toUserId:that.data.toUserId,
    flag:0,
    itemId:that.data.itemId
  }).then(res=>{
    that.setData({
      content:''
    })
    wx.showToast({
      title: '回复成功',
    })
    console.log("options",that.data._options)
    that.onLoad(that.data._options)
  })
}
if(that.data.comment){
  WXAPI.comment({
    itemId:that.data.itemId,
    content:that.data.content,
    userId:that.data.userId,
    flag:0
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
  onReachBottom: function() {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getCommentList()
  },
  onPullDownRefresh: function() {
    this.onLoad(this.data._options)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
     console.log("来自页面内转发按钮");
     console.log(res.target);
    }
    else {
     console.log("来自右上角转发菜单")
    }
    return {
      title: this.data.detailObj.activityName,
      path: '/pages/detail/detail?activityId='+this.data.itemId,
     imageUrl: this.data.detailObj.imageList[0],
    }
   }
})