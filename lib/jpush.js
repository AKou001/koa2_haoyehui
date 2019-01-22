const { appKey, masterSecret } = App.Config.JPush

let JPush = require('jpush-sdk')

let Client = JPush.buildClient(appKey, masterSecret)

JPush.Client = Client

JPush.pushOne = function({ userId, title, alert, data }) {
  let ios = JPush.ios(alert, undefined, 1, undefined, data)

  let android = JPush.android(alert, title, 1, data)

  let setAudience = []

  // 非生产环境加debug
  if (process.env.NODE_ENV !== 'prd') {
    setAudience.push(JPush.tag_and('debug'))
  }

  setAudience.push(JPush.alias(String(userId)))

  Client.push()
    .setPlatform(JPush.ALL)
    .setOptions(null, 86400 * 3, null, true, null)
    .setAudience(...setAudience)
    .setNotification(ios, android)
    .send(function(err, res) {
      if (err) {
        console.log(err.message)
      }
    })
}

module.exports = JPush
