// pages/dynamicPub/dynamicPub.js
const WXAPI = require('../../wxapi/main')
var util = require('../../utils/util.js');
const app=getApp();
var uploadImage = require('../../upload.js');//地址换成你自己存放文件的位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    publishLocation:'',
    imageList:[],
    userId:null
  },
  contentInput(e) {
    this.data.content = e.detail.value;
  },
  // bindPickerChange: function (e) {
  //   console.log('选中的主题为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  //   that.setData({
  //     activityType:that.data.theme[that.data.index]
  //   })
  // },

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
  chooseAddress(){
    var that = this
    wx.chooseLocation({
    success: function (res) {
    // success
    console.log(res)
    that.setData({
      publishLocation: res.name,
    })
    }
      })
  },
  publish(){
    var that=this;
      WXAPI.publishDynamic({
        "images": that.data.imageList.toString(),
        "publishLocation":that.data.publishLocation,
        "userId": that.data.userId,
        "content":that.data.content
      }).then(function(res){
        console.log(res);
        wx.reLaunch({
          url: '/pages/find/find',
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