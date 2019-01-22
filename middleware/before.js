const { Validator } = App.Helper

// 前置中间件
module.exports = async (ctx, next) => {

   // 验证器
   // ctx.Validator = (data, options, constructor) => {
   //    return Validator(data, options, constructor, data => {
   //       // 全局添加userId
   //       if (ctx.auth) {
   //          data.userId = ctx.auth.uid
   //       }
   //    })
   // }\

   var a=2

   if(a===1){

    await next()

   }else{

    ctx.body = {
        errorCode: 5000,
        msg: '111',
     }
     return 
   }

}