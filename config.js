
var fileHost = "https://lidongming.oss-cn-shenzhen.aliyuncs.com/";//你的阿里云OSS地址  在你当前小程序的公众号后台的uploadFile 合法域名也要配上这个域名
var config = {
   uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
   AccessKeySecret: 'kZPRwzyujczOQgFaEHRxvYw4Y9pNeX',        // AccessKeySecret 去你的阿里云上控制台上找
   OSSAccessKeyId: 'LTAI4FoBWqMurswJhBAPHUzP',         // AccessKeyId 去你的阿里云上控制台上找
   timeout: 80000 //这个是上传文件时Policy的失效时间
};
module.exports = config
