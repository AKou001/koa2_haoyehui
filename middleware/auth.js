const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js")
const { tokenKey, aesKey } = App.Config

module.exports = async (ctx, next) => {

   let token = ctx.get('authorization')


   if (!token) {
      ctx.body = {
         errorCode: 5000,
         msg: '找不到token',
      }
      return
   }

  //  if(token.indexOf(',') !== -1){
  //    token = token.slice(0, token.indexOf(','))
  //  }

   let verifyToken = jwt.decode(token)

   if (!verifyToken || !verifyToken.key) {
      ctx.body = {
         errorCode: 5000,
         msg: '签名无效',
      }
      return
   }

   try {
      // 解密随机码
      let random = CryptoJS.AES.decrypt(verifyToken.key, aesKey).toString(CryptoJS.enc.Utf8)
      // 验证签名
      jwt.verify(token, random + tokenKey)
   } catch (err) {
      if (new Date() > new Date(verifyToken.exp * 1000)) {
         ctx.body = {
            msg: '签名已过期',
            errorCode: 5000,
         }
      } else {
         ctx.body = {
            msg: '签名无效',
            errorCode: 5000,
            error: err,
         }
      }
      return
   }

   // 将解码后的token参数保存到ctx中，方便跨模块读取
   ctx.auth = verifyToken



   
   await next()

}