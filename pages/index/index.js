//index.js
const WXAPI = require('../../wxapi/main')
//获取应用实例
const app = getApp()

Page({
  data: {
   grid:[
     {
       icon:'../../icons/movie.png',
       title:'电影'
     },
     {
       icon: '../../icons/cook.png',
       title: '美食'
     },
     {
       icon: '../../icons/sport.png',
       title: '运动'
     },
     {
       icon: '../../icons/travel.png',
       title: '旅游'
     },
     {
       icon: '../../icons/sing.png',
       title: 'K 歌'
     },
     {
       icon: '../../icons/collection.png',
       title: '其他'
     },
   ],
   activity:[],
   allActivity:[],
   userInfo:{},
   activeCategoryId: 0,

   loadingMoreHidden:true,
   curPage:0,
   pageSize:10,

   search:['时间','距离','热度'],
   index:0,
   titleArray:['最新发布','离我最近','人气活动'],
   title:'最新发布'
  },
  goPersonal(event){
    let userId=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/personal/personal?userId='+userId,
    })
  },
    // 当自定义组件触发 parentEvent 事件时，调用 onParentEvent 方法
    // onParentEvent: function (event) {
    //   // 自定义组件触发事件时提供的detail对象，用来获取子组件传递来的数据
    //   var id = event.detail.tag;
    //   wx.navigateTo({
    //   url: '/pages/personal/personal?userId='+id,
    //   })
    // },
  bindPickerChange: function (e) {
    var that=this;
    that.setData({
      index: e.detail.value,
      title:that.data.titleArray[e.detail.value]
    })
    that.getAllactivity(e.detail.value);
  },
  tabClick(){
    this.setData({
      activeCategoryId: e.currentTarget.id,
    });
  },
  getAllactivity:function(index){
    var that = this;
    wx.showLoading({
      "mask": true
    })
    if(index==0){
      console.log("userId-------",app.globalData.userId)
      WXAPI.activitybyTime({
        userId:app.globalData.userId,
        pageNum: this.data.curPage,
        pageSize: this.data.pageSize
      }).then(function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (res.code == 404 || res.code == 700) {
          that.setData({loadingMoreHidden: false});
        }else{
          let allActivity = [];
          allActivity = that.data.allActivity;
        for (var i = 0; i < res.result.length; i++) {
          allActivity.push(res.result[i]);
        }
        that.setData({
          loadingMoreHidden: true,
          allActivity:allActivity
        });
        }
      })
    }else if(index==1){
      WXAPI.activitybyDistance({
        longitude:this.data.longitude,
        latitude:this.data.latitude,
        pageNum: this.data.curPage,
        pageSize: this.data.pageSize
      }).then(function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (res.code == 404 || res.code == 700) {
          that.setData({loadingMoreHidden: false});
        }else{
          let allActivity = [];
          allActivity = that.data.allActivity;
        for (var i = 0; i < res.result.length; i++) {
          allActivity.push(res.result[i]);
        }
        that.setData({
          loadingMoreHidden: true,
          allActivity:allActivity
        });
        }
      })
    }else if(index==2){
      WXAPI.activitybyHot({
        pageNum: this.data.curPage,
        pageSize: this.data.pageSize
      }).then(function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (res.code == 404 || res.code == 700) {
          that.setData({loadingMoreHidden: false});
        }else{
          let allActivity = [];
          allActivity = that.data.allActivity;
        for (var i = 0; i < res.result.length; i++) {
          allActivity.push(res.result[i]);
        }
        that.setData({
          loadingMoreHidden: true,
          allActivity:allActivity
        });
        }
      })
    }
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?activityId=' +index,
    })
  },
  toCategory(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/category/category?index=' +index,
    })
  },
  publish(){
    wx.navigateTo({
      url: '/pages/activityPub/activityPub',
    })
  },
  onLoad: function () {
    console.log("userId++++++++",app.globalData.userId)
    this.getAllactivity(0);
    wx.getLocation({
      type: 'wgs84',
      success: (res=>{
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      })
    })
  },
  onReachBottom: function() {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getAllactivity(this.data.index)
  },
  onPullDownRefresh: function() {
    this.setData({
      curPage: 0
    });
    this.getAllactivity(this.data.index)
  },
 
})
