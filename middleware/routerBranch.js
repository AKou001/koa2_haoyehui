// 路由水平分支
module.exports = (middleware, branch) => {

   return async (ctx) => {
      await middleware(ctx, async (name, data) => {
         await branch[name](ctx, data)
      })
   }

}