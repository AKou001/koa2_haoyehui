exports._ = require('lodash')

// date日期格式化与解析
exports.fecha = require('fecha')

// 验证器
exports.Validator = require('check-data') 

// 浮点运算器
exports.Float = require('float-arithmetic') 

// 数据分组
exports.embedded = require('./embedded')

// 生成订单号
exports.orderNumber = require('./orderNumber')

// 压缩文件
exports.JSZip = require('jszip')

exports.wechatCrypt = require('./wechatCrypt')