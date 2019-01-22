module.exports = {
  host: "https://app.hyhit.net",
  apiHost: "https://api.hyhit.net",
  fileHost: "https://files.hyhit.net/",
  mongodb: {
    connurl: 'mongodb://biao:biao@localhost/biao',
  },
  postgre: {
    connurl: 'postgres://biao:biao@localhost:5432/biao',
  },
  wechatApp: {
    // appid: "wx315d9aa53ff40321",
    // mch_id: "1354885202",
    // mch_key: "A20d8eir93ofEG93049koP30E8FKZM4d",
    appid: "wxde11332b5353c4c5",
    mch_id: "1502250351",
    mch_key: "szshyhhlwkjyxgspatrick2290923888",
    notifyUrl: (() => {
      if (process.env.PORT === "3000") {
        return "https://api.hyhit.net:3000/api/v1/notify/wxpay/"
      } else {
        return "https://api.hyhit.net/api/v1/notify/wxpay/"
      }
    })()
  },
  alipay: {
    appId: "2018040402500819",
    notifyUrl: (() => {
      if (process.env.PORT === "3000") {
        return "https://api.hyhit.net:3000/api/v1/notify/alipay/"
      } else {
        return "https://api.hyhit.net/api/v1/notify/alipay/"
      }
    })()
  },
  wechatCommonInfo: {
    appid: 'wx141da10967726105',
    appSecret: 'b87ff358d02f0f3c53481e35cdd2fb9d'
  },
  wechatMiniProgram: {
    appid: 'wx8565507cce9238d7',
    appSecret: '73a00f2f133c0e6c87ca0dc7e78b1837'
  },
}