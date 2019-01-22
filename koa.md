# 应用程序 
koa应用程序是一个包含一组中间件函数的对象， 他是按照类似堆栈的方式组织和执行的。 
应用 
``` 
const Koa=require('koa');
const app=new Koa();
app.use(async ctx=> {
    ctx.body='Hello World';
});
app.listen(3000);
```
