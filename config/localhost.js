module.exports = {
   host: "https://localhost",
   apiHost: "https://localhost",
   fileHost: "https://localhost/",
   mongodb: {
      // connurl: 'mongodb://localhost/biao',//本地
      // connurl: 'mongodb://biao:biao@119.23.9.139/biao',//测试
      connurl: 'mongodb://biao:biao@119.23.216.58/biao',//测试
   },
   postgre: {
      connurl: 'postgres://postgres:biao@localhost:5432/biao',//本地
      // connurl: 'postgres://biao:biao@119.23.216.58:5432/biao',//测试
   },
   wechatApp: {
      // appid: "wx315d9aa53ff40321",
      // mch_id: "1354885202",
      // mch_key: "A20d8eir93ofEG93049koP30E8FKZM4d",
      appid: "wxde11332b5353c4c5",
      mch_id: "1502250351",
      mch_key: "szshyhhlwkjyxgspatrick2290923888",
      notifyUrl: 'https://api.biaojingli.com:3000/api/v1/notify/wxpay/'
   },
   alipay: {
      appId: "2018040402500819",
      notifyUrl: 'https://api.biaojingli.com:3000/api/v1/notify/alipay/'
   },
   wechatMiniProgram: {
     appid: 'wx8565507cce9238d7',
     appSecret: '73a00f2f133c0e6c87ca0dc7e78b1837'
   },
   wechatCommonInfo: {
     appid: 'wx141da10967726105',
     appSecret: 'b87ff358d02f0f3c53481e35cdd2fb9d'
   }
}