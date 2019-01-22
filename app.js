"use strict"

const Koa = require('koa')
const app = new Koa()
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const staticFile = require('koa-static')
const Router = require('koa-router')

// 公共库
const Lib = require('./lib/')
for (let name in Lib) {
   App[name] = Lib[name]
}

App.Router = new Router({ prefix: '/api/v1/' })

App.Models = require('./models/')

App.Middleware = require('./middleware/')

// 控制器必须在所有依赖导出完毕后加载
App.Controllers = require('./controllers/')

// error handler
onerror(app)

app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))

//跨域
app.use(cors())

app.use(logger())

// 静态资源
app.use(staticFile(__dirname + '/public'))

app.use(App.Router.routes())

app.use(App.Router.allowedMethods())

module.exports = app
