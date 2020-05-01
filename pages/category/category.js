// pages/category/category.js
const WXAPI = require('../../wxapi/main')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [{
      name: '电影',
      id: -1
    },
    {
      name: '美食',
      id: 0
    },
    {
      name: '运动',
      id: 1
    },
    {
      name: '旅游',
      id: 2
    },
    {
      name: 'K歌',
      id: 3
    },
    {
      name: '其他',
      id: 4
    }
    ],
    collegeCur: -1,
    categoryActivity:[],
    pageNum:0,
    pageSize:10
  },
  categorySelect(e) {
    this.setData({
      collegeCur: e.currentTarget.dataset.id - 1,
    })
    this.getList(e.currentTarget.dataset.id);
  },
  getList(index){
    WXAPI.bySort({
      tagIndex:index,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      this.setData({
        categoryActivity:res.result
      })
    })
  },
  toDetail(event){
    let index=event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?activityId='+index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index=options.index;
    this.setData({
      collegeCur:index - 1,
    })
    WXAPI.bySort({
      tagIndex:index,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      this.setData({
        categoryActivity:res.result
      })
    })
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
        this.setData({
      pageNum: this.data.pageNum + 1
    });
    let index=this.data.collegeCur+1;
    WXAPI.bySort({
      tagIndex:index,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      let array=this.data.categoryActivity
      for (var index = 0; index < res.result.length; index++) {
        array.push(res.result[index])
      }
      this.setData({
        categoryActivity:array
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})