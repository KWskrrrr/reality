const WXAPI=require('../../wxapi/main.js');
const data = require('../../data/data.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    college: [{
      name: '关注',
      id: -1
    },
    {
      name: '粉丝',
      id: 0
    }
    ],
    collegeCur: -1,
    followList: [],
    fansList:[],
    userId:null
  },
  collegeSelect(e) {
    this.setData({
      collegeCur: e.currentTarget.dataset.id - 1,
    })
    this.getList();
  },

  getList() {
    if(this.data.collegeCur==-1){
      wx.setNavigationBarTitle({
        title: '关注列表',
      })
      console.log("关注列表userID",this.data.userId)
      WXAPI.followedList({
        userId:this.data.userId
      }).then(res=>{
        wx.stopPullDownRefresh()
        this.setData({
          followList:res.result
        })
      })
    }else{
      wx.setNavigationBarTitle({
        title: '粉丝列表',
      })
      console.log("粉丝·列表userID",this.data.userId)
      WXAPI.fansList({
        userId:this.data.userId
      }).then(res=>{
        wx.stopPullDownRefresh()
        this.setData({
          fansList:res.result
        })
      })
    }
  },
  goPersonal(event){
    let userId=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index=options.index;
    let userId=options.userId;
    console.log("list userid",userId)
    this.setData({
      userId:userId
    })
    if(index==1){
      wx.setNavigationBarTitle({
        title: '关注列表',
      })
      this.setData({
        collegeCur:-1,
        userId:userId
      })
      WXAPI.followedList({
        userId:this.data.userId
      }).then(res=>{
        this.setData({
          followList:res.result
        })
      })
    }else if(index==2){
      wx.setNavigationBarTitle({
        title: '粉丝列表',
      })
      this.setData({
        collegeCur:0
      })
      WXAPI.fansList({
        userId:this.data.userId
      }).then(res=>{
        this.setData({
          fansList:res.result
        })
      })
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
    this.getList()
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