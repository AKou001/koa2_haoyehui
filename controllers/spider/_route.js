"use strict"

const { Router, Middleware } = App



// 客户端
const spider = require('./spider')

Router.get('spider',spider.get_title)