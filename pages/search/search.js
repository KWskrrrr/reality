// pages/search/search.js
const WXAPI=require('../../wxapi/main.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    activityList:[],
    pageNum:0,
    pageSize:10,
    userId:null
  },
  keyInput(e){
    this.data.key = e.detail.value
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  toDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?activityId=' +index,
    })
  },
//搜索结果
search(n) {
  let that = this;
  let key = that.data.key;
  if (key == '') {
        wx.showToast({
              title: '请输入关键词',
              icon: 'none',
        })
        return false;
  }
  wx.setNavigationBarTitle({
        title:'"'+ that.data.key + '"的搜索结果',
  })
  wx.showLoading({
        title: '加载中',
  })
WXAPI.search({
  keyword:key,
  userId:that.data.userId
}).then(res=>{
  wx.hideLoading();
  console.log("搜索结果：",res.result)
        that.setData({
          activityList:res.result
        });
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.setData({
  userId:app.globalData.userId
})
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