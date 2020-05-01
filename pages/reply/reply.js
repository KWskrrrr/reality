const WXAPI = require('../../wxapi/main');
 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply:[],
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
  goItem(event){
    let index=event.currentTarget.dataset.itemid;
    let flag=event.currentTarget.dataset.flag;
    if(flag==0){
      wx.navigateTo({
        url: '/pages/detail/detail?activityId='+index,
      })
    }else{
      wx.navigateTo({
        url: '/pages/dynamicDetail/dynamicDetail?dynamicId='+index,
      })
    }
  },
  getReply(){
    WXAPI.noticeReply({
      userId:this.data.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      let array=this.data.reply;
      for (let index = 0; index < res.result.length; index++) {
        array.push(res.result[index])
      }
      this.setData({
        reply:array
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:app.globalData.userId
    })
    WXAPI.noticeReply({
      userId:app.globalData.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      console.log("reply",res)
      wx.stopPullDownRefresh()
      this.setData({
        reply:res.result
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
  pageNum:this.data.pageNum+1
})
this.getReply()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})