// const CONFIG=require('./config.js');
const API_BASE_URL="https://www.realityclub6.com"


const request= (url,method,data) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method:method,
      data: data,
      header: {
        'Content-Type': 'application/json;charset=utf-8'
        // "token":wx.getStorageSync('token')
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}
const requestPost = (url, method,data) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

module.exports={
  request,
  requestPost,
  // get请求
  login: (code) => {
    return request('/user/auth', 'get', code)
  },
  activitybyTime: (data) => {
    return request('/activities/byTime','get',data)
  },
  activitybyDistance: (data) => {
    return request('/activities/byDistance','get',data)
  },
  activitybyHot: (data) => {
    return request('/activities/byHot','get',data)
  },
  recommendActivity:(data)=>{
    return request('/activities/recommend','get',data)
  },
  activityDetail:(data)=>{
    return request('/activity/detail','get',data)
  },
  dynamicDetail:(data)=>{
    return request('/dynamic/detail','get',data)
  },
  allDynamic:(data)=>{
    return request('/dynamics/byTime','get',data)
  },
  commentList:(data)=>{
    return request('/comments','get',data)
  },
  replyList:(data)=>{
    return request('/replies','get',data)
  },
  followedList:(data)=>{
    return request('/follow/meFollow','get',data)
  },
  fansList:(data)=>{
    return request('/follow/followMe','get',data)
  },
  memberList:(data)=>{
    return request('/activity/member','get',data)
  },
  search:(data)=>{
    return request('/search','get',data)
  },
  // 申请加入
  myActivity:(data)=>{
    return request('/activities/tryJoined','get',data)
  },
  //我发布的活动
  myPublish:(data)=>{
    return request('/activities/createdByMe','get',data)
  },
  myDynamic:(data)=>{
    return request('/dynamics/my','get',data)
  },
  disagreeJoin:(data)=>{
    return requestPost('/activity/disagreeJoin','post',data)
  },
  agreeJoin:(data)=>{
    return requestPost('/activity/agreeJoin','post',data)
  },
  // 消息
  noticeApply:(data)=>{
    return request('/notice/apply','get',data)
  },
  noticeLike:(data)=>{
    return request('/notice/like','get',data)
  },
  noticeReply:(data)=>{
    return request('/notice/reply','get',data)
  },
  noticeFollow:(data)=>{
    return request('/notice/follow','get',data)
  },
  userProfile:(data)=>{
    return request('/user/profile','get',data)
  },
  bySort:(data)=>{
    return request('/activities/bySort','get',data)
  },

// post请求
  userInfo: (data) => {
    return request('/user/info', 'post', data)
  },

  publishActivity:(data)=>{
    return request('/activity/add','post',data)
  },
  publishDynamic:(data)=>{
    return request('/dynamic/add','post',data)
  },

  reply:(data)=>{
    return request('/reply/add','post',data)
  },
  comment:(data)=>{
    return request('/comment/add','post',data)
  },
  delComment:(data)=>{
    return requestPost('/comment/delete','POST',data)
  },
  delReply:(data)=>{
    return requestPost('/reply/delete','POST',data)
  },
  like:(data)=>{
    return requestPost('/dynamic/like','post',data)
  },
  join:(data)=>{
    return requestPost('/activity/join','post',data)
  },
  exit:(data)=>{
    return requestPost('/activity/exit','post',data)
  },
 deleteActivity:(data)=>{
   return requestPost('/activity/delete','post',data)
 },
 deleteDynamic:(data)=>{
  return requestPost('/dynamic/delete','post',data)
},
  follow:(data)=>{
    return requestPost('/follow','post',data)
  },
  cancelFollow:(data)=>{
    return requestPost('/cancelFollow','post',data)
  },
}