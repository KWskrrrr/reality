// pages/myDynamic/myDynamic.js
const WXAPI = require('../../wxapi/main')
const util=require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myDynamic:[],
    pageNum:0,
    pageSize:10,
    userId:null,
    myUserId:null,
    _options:{}
  },
  myDynamic:function(){
    var that = this;
    wx.showLoading({
      "mask": true
    })
    WXAPI.myDynamic({
      userId:that.data.userId,
      pageNum:that.data.pageNum,
      pageSize:that.data.pageSize
    }).then(function(res){
      wx.hideLoading()
      let myDynamic = [];
      myDynamic = that.data.myDynamic;
      for (var i = 0; i < res.result.length; i++) {
      myDynamic.push(res.result[i]);
    }
      that.setData({
        myDynamic:myDynamic
      });
    })
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  deleteDynamic(event){
    let index = event.currentTarget.dataset.index;
    wx.showModal({
      cancelColor: 'cancelColor',
      content:'确定删除该动态？',
      success:(res)=>{
        if(res.confirm){
          if(this.data.userId==this.data.myUserId){
            WXAPI.deleteDynamic({
              dynamicId:index
            }).then(res=>{
              wx.showToast({
                title: '动态已删除',
              })
              this.onLoad(this.data._options)
            })
          }else{
            wx.showModal({
              cancelColor: 'cancelColor',
              title:'您不能删除别人的动态噢~'
            })
          }
        }else if(res.cancel){
          console.log("用户取消删除动态")
        }
      }
    })
  },
  toDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/dynamicDetail/dynamicDetail?dynamicId=' +index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      userId:options.userId,
      myUserId:app.globalData.userId,
      _options:options
    })
    if(options.userId!=app.globalData.userId){
      wx.setNavigationBarTitle({
        title: 'Ta的动态',
      })
    }
    wx.showLoading({
      "mask": true
    })
    WXAPI.myDynamic({
      userId:that.data.userId,
      pageNum:that.data.pageNum,
      pageSize:that.data.pageSize
    }).then(function(res){
      wx.hideLoading()
      that.setData({
        myDynamic:res.result
      });
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNum:0
    })
    this.myDynamic()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum+ 1
    });
    this.myDynamic()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})