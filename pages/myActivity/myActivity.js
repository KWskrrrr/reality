// pages/myActivity/myActivity.js
const WXAPI=require('../../wxapi/main.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    college: [{
      name: '全部',
      id: -1
    },
    {
      name: '已同意',
      id: 0
    },
    {
      name: '未同意',
      id: 1
    }
    ],
    collegeCur: -1,
    userId:null,
    myActivity:[],
    finished:[],
    unfinished:[],
    pageNum:0,
    pageSize:10,
    _options:{}
  },
  collegeSelect(e) {
    this.setData({
      collegeCur: e.currentTarget.dataset.id - 1,
    })
  },
  getMyActivity(){
      WXAPI.myActivity({
        userId:this.data.userId,
        pageNum:this.data.pageNum,
        pageSize:this.data.pageSize
      }).then(res=>{
        let myActivity = [];
        myActivity = that.data.myActivity;
      for (var i = 0; i < res.result.length; i++) {
        myActivity.push(res.result[i]);
    }
      that.setData({
        myActivity:myActivity
      });
      })
  },
  toDetail(e){
    let index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?activityId=' +index
    })
  },
  exit(e){
    let index=e.currentTarget.dataset.index;
    WXAPI.exit({
      activityId:index,
      userId:this.data.userId
    }).then(res=>{

      wx.showToast({
        title: '退出成功',
      })
      this.onLoad(this.data._options)
    })
  },
  onLoad:function(options){
    this.setData({
      userId:app.globalData.userId
    })
    WXAPI.myActivity({
      userId:app.globalData.userId,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize
    }).then(res=>{
    this.setData({
      myActivity:res.result,
      _options:options
    })
    console.log("我的参与",res.result)
    let finished = [];
    let unfinished = [];
    for (var i = 0; i < res.result.length; i++) {
      if(res.result[i].applyStatus==2){
        finished.push(res.result[i]);
        this.setData({
          finished:finished
        })
        console.log("finished",this.data.finished)
      }else{
        unfinished.push(res.result[i]);
        this.setData({
          unfinished:unfinished
        })
      }
  }
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
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.getMyActivity();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})