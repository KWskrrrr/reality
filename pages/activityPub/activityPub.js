// pages/activityPub/activityPub.js
const WXAPI = require('../../wxapi/main')
var uploadImage = require('../../upload.js');//地址换成你自己存放文件的位置
var util = require('../../utils/util.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    theme:['电影','美食','运动','旅游','K歌','其他'],
    index:0,
    activityName:'',
    require:'',
    beginTime:'9:00',
    endTime:'12:00',
    latitude:null,
    longitude:null,
    locationName:'',
    remark:'',
    activityType:'',
    userId:null
  },
  activityNameInput(e) {
    this.data.activityName = e.detail.value;
},
  requireInput(e) {
  this.data.require = e.detail.value;
},
  remarkInput(e) {
  this.data.remark = e.detail.value;
},
  bindPickerChange: function (e) {
    var that=this;
    console.log('选中的主题为', e.detail.value)
    that.setData({
      index: e.detail.value
    })
    that.setData({
      activityType:that.data.theme[that.data.index]
    })
    console.log(that.data.activityType)
 
  },
  chooseAddress(){
    var that = this
    wx.chooseLocation({
    success: function (res) {
    // success
    console.log(res)
    that.setData({
    locationName: res.name,
    latitude:res.latitude,
    longitude:res.longitude
    })
    }
      })
  },
  bindstartTime: function (e) {
    this.setData({
      beginTime: e.detail.value
    })
  },
  bindendTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  uploadImg(){
    var _this=this;
    if(_this.data.imageList.length>6){
      wx.showToast({
        title: '最多上传六张图片',
      })
      return
    }
    wx.chooseImage({
      count: 6, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         var tempFilePaths = res.tempFilePaths;
         var nowTime = util.formatTime(new Date());
         if(_this.data.imageList.length+res.tempFilePaths.length>6){
          wx.showToast({
            title: '最多上传六张图片',
          })
          return
        }
         //支持多图上传
         for (var i = 0; i < res.tempFilePaths.length; i++) {
            //显示消息提示框
            wx.showLoading({
               title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
               mask: true
            })

            //上传图片
            //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
            //图片路径可自行修改
            uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
               function (result) {
                  console.log("======上传成功图片地址为：", result);
                  wx.hideLoading();
                  _this.setData({imageList: _this.data.imageList.concat(result)})
               }, function (result) {
                  console.log("======上传失败======", result);
                  wx.hideLoading()
               }
            )
         }
      }
   })
   
  },
  publish(){
    var that=this;
      WXAPI.publishActivity({
        "activityName": that.data.activityName,
        "activityType": that.data.activityType,
        "beginTime": that.data.beginTime,
        "endTime": that.data.endTime,
        "images": that.data.imageList.toString(),
        "latitude": that.data.latitude,
        "locationName":that.data.locationName,
        "longitude": that.data.longitude,
        "remark": that.data.remark,
        "require": that.data.require,
        "userId": that.data.userId
      }).then(function(res){
        console.log(res);
        if(res.code!=200) {
          wx.showToast({
            title: '发布失败',
          })
        }else {
          wx.showToast({
            title: '发布成功',
          })
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})