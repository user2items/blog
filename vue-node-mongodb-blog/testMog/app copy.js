// // 路由后需要在根目录的app.js中进行注册才行，代码如下： 
// const Koa = require('koa');
// const app = new Koa()
// const blogs = require('./routes/blog') // 先进行引入。
// // 随后找到router路由位置添加上
// app.use(blogs.routes(), blogs.allowedMethods()) // 即可完成注册，记得位置要添加到模版一致。


const mongoose = require('mongoose') // 引入插件
const db = mongoose.connect("mongodb://localhost/blog2")
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());  // 解析request的body

const router = require('koa-router')()
router.get('/', async (ctx, next) => {
	// todo
})
app.use(router.routes());
app.listen(3000);
console.log('http:localhost:3000')



// 账户的数据库模型
var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
var User = mongoose.model('hehe',UserSchema);

// 新增数据
var user = {
  username: 'ydj',
  password: '123123',
  email: ''
}
var newUser = new User(user);
newUser.save();

router.get('/', async (ctx, next) => {
	let val = null
	const data = await User.findOne({username: 'ydj'})
	console.log('data', data)
	const result = {
		code:200,
		response: data,
		ts: 12345
	}
	ctx.response.body = result
	return result
})

