const Koa = require('koa');
const blogs = require('./routes/blog') // 先进行引入。
// 随后找到router路由位置添加上

const app = new Koa();
app.use(blogs.routes(), blogs.allowedMethods()) // 即可完成注册，记得位置要添加到模版一致。
// 
