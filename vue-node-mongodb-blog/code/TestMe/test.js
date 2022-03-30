const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
router.get('/mobile', (ctx, next)=> {
    ctx.response.body = '111'
});

app

    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000,()=>{
   console.log('server is start at port 3000')
});