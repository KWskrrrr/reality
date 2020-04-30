let publish_activity_data=[
  {
    "activityName":'花木兰',
    "activityType":'电影',
    "locationName":'',
    "beginTime":'18:00',
    "endTime":'20:00',
    "require":'在校大学生',
    "imageList":['/images/chai.jpg','/images/exo.jpg'],
    "remark":'',
    "userId":'1',
    "longitude":'',
    "latitude":'',
    "publishTime":'2020-04-01'
  }
];
// 获取最新发表的活动列表
let activity_index_data=[
  {
    "activityId":'0',
    "avatar":'/images/ooh.jpg',
    "updateTime":'2020-04-04',
    "activityName":'花木兰',
    "activityType":'电影',
    "locationName":'',
    "beginTime":'18:00',
    "endTime":'20:00',
    "require":'在校大学生',
    "images":['/images/chai.jpg','/images/exo.jpg'],
    "viewCount":'30',
    "commentCount":'2'
  }
];
//获取活动详情
let activity_detail_data=[
  {
    "activityId":'0',
    "userId":'1',
    "isJoined":1,
    "updateTime":'2020-04-04',
    "activityName":'花木兰',
    "activityType":'电影',
    "locationName":'',
    "beginTime":'18:00',
    "endTime":'20:00',
    "require":'在校大学生',
    "images":['/images/chai.jpg','/images/exo.jpg'],
    "memberCount":'3',
    "userNickname":'KWskrrrr'
  }
];
let publish_dynamic_data=[
  {
    "content":'happy ending',
    "imageList":['/images/exo0.jpg','/images/ooh.jpg'],
    "publishLocation":'万达'
  }
];
let dynamic_index_data=[
  {
    dynamicId:'',
    content:'a nice day',
    imageList:['/images/exo.jpg'],
    publishLocation:'横店电影城',
    userId:'',
    commentCount:2,
    likeCount:1,
    publishTime:'2020-03-30',
    userNickname: 'KWskrrrr',
    avatar: '/images/chai.jpg'
  }
];
let publish_comment_data=[
  {
    "userId":'1',
    "flag":0,
    "itemId":1,
    "publishTime":'2020-03-28',
    "content":'nice',
  }
];

let myActivity_data=[
  {
    activityName: '花木兰',
    startTime: '今天7:00',
    endTime: '今天9:00',
    address: '星影国际影城',
    member: '8',
    picture: '/images/chai.jpg',
    time: '2020-03-27'
  }
];
let follow_list = [{
  "userId": 123,
  "nickName": "自明小友",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "signature": '战无不胜',
  "time":'2020-04-06 12:00'
}, {
  "userId": 124,
  "nickName": "封号斗罗",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/v2-34a3387ce1a1e5a4aa9bc48fca19a677.jpg",
  "signature": '我在新斗罗大陆等你哦，是新斗罗',
  "time":'2020-04-06 12:00'
}, {
  "userId": 125,
  "nickName": "斗皇",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "time":'2020-04-06 12:00',
  "signature": '加码帝国的一名斗皇'
}];
let fans_list = [{
  "userId": 123,
  "nickName": "自明小友",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "time":'2020-04-06 12:00',
  "signature": '战无不胜'
}, 
{
  "userId": 125,
  "nickName": "斗皇",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "time":'2020-04-06 12:00',
  "signature": '加码帝国的一名斗皇'
}];
let notice_list = [{
  "userId": 123,
  "nickName": "自明小友",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "activityName": '篮球赛',
  "time":'2020-04-06 12:00'
}, {
  "userId": 124,
  "nickName": "封号斗罗",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/v2-34a3387ce1a1e5a4aa9bc48fca19a677.jpg",
  "activityName": '篮球赛',
  "time":'2020-04-06 12:00'
}, {
  "userId": 125,
  "nickName": "斗皇",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "activityName": '篮球赛',
  "time":'2020-04-06 12:00'
}];
let good_list = [{
  "userId": 123,
  "nickName": "自明小友",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "activityPic":'/images/exo.jpg',
  "time":'2020-04-06 12:00'
}, {
  "userId": 124,
  "nickName": "封号斗罗",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/v2-34a3387ce1a1e5a4aa9bc48fca19a677.jpg",
  "activityPic":'/images/exo.jpg',
  "time":'2020-04-06 12:00'
}, {
  "userId": 125,
  "nickName": "斗皇",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "activityPic":'/images/exo.jpg',
  "time":'2020-04-06 12:00'
}];
let reply_list=[
  {
      "replyId": 1,
      "fromUserId": "123456",
      "toUserId": "123456",
      "commentId": 1,
      "replyTime": "2019-09-18",
      "fromContent": "哈哈哈",
      "toContent": "嘿嘿嘿",
      "fromNickname": "自明小友",
      "toNickname": "自明小友",
      "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
      "activityPic":'/images/exo.jpg'
  },
{
  "replyId": 2,
  "fromUserId": "123456",
  "toUserId": "123456",
  "commentId": 1,
  "replyTime": "2019-09-18",
  "fromContent": "哈哈哈",
  "toContent": "嘿嘿嘿",
  "fromNickname": "自明小友",
  "toNickname": "自明小友",
  "avatar": "https://lidongming.oss-cn-shenzhen.aliyuncs.com/images/948DD79341AF0F424EB2686FE61B77DD.jpg",
  "activityPic":'/images/exo.jpg'
}
];

module.exports = { publish_activity_data, activity_index_data,publish_dynamic_data, dynamic_index_data, myActivity_data,publish_comment_data,follow_list,fans_list,reply_list,notice_list,good_list};