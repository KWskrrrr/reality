// pages/myPublish/myPublish.js
const WXAPI = require('../../wxapi/main')
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPublish:[],
    pageNum:0,
    pageSize:10,
    userId:null,
    myUserId:null,
    _options:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:options.userId,
      myUserId:app.globalData.userId,
      _options:options
    })
    if(options.userId!=app.globalData.userId){
      wx.setNavigationBarTitle({
        title: 'Ta的发布',
      })
    }
      wx.showLoading({
        "mask": true
      })
      WXAPI.myPublish({
        userId:this.data.userId,
        pageNum:this.data.pageNum,
        pageSize:this.data.pageSize
      }).then(res=>{
        wx.hideLoading()
        this.setData({
          myPublish:res.result
        });
      })
  },
  getMyPublish(){
    wx.showLoading({
      "mask": true
    })
    WXAPI.myPublish({
      userId:this.data.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let myPublish = [];
      myPublish = this.data.myPublish;
      for (var i = 0; i < res.result.length; i++) {
        myPublish.push(res.result[i]);
    }
      this.setData({
        myPublish:myPublish
      });
    })
  },
  toDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?activityId=' +index,
    })
  },
  goPersonal(e){
    let userId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
  deleteActivity(event){
    let index = event.currentTarget.dataset.index;

    wx.showModal({
      cancelColor: 'cancelColor',
      content:'确定要删除该活动？',
      success:(res)=>{
        if(res.confirm){
          if(this.data.userId==this.data.myUserId){
            WXAPI.deleteActivity({
              activityId:index
            }).then(res=>{
              wx.showToast({
                title: '活动已删除',
              })
              this.onLoad(this.data._options)
            })
          }else{
            wx.showModal({
              cancelColor: 'cancelColor',
              title:'您不能删除别人的活动噢~'
            })
          }
        }else if(res.cancel){
          console.log("用户取消删除活动")
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNum:0
    })
    this.getMyPublish()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.getMyPublish()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})