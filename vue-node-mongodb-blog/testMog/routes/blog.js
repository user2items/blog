// 根目录的routes路由文件夹，创建blog.js文件，代码如下： 
const router = require('koa-router')() // 引用kao的路由
const { getList, getDetail, newBlog, upDatablog, delBlog } = require('../controller/blog') // 返回关于博客的方法

// router.prefix('/api/blog') // prefix方法为下面每个路由的前面内容，比如：http://localhost:3000/api/blog/list，每个访问路由必须要包含/api/blog
// router.get('/list', async (ctx, next) => { // get方法访问链接为：http://localhost:3000/api/blog/list
//   const author = ctx.query.author // 从ctx中获取传来的author值
//   const keyword = ctx.query.keyword
//   const dataList = await getList(author, keyword) // 调用执行getList传入author，keyword，因为它的返回值也是promise所以也可以用await
//   ctx.body = { // ctx.body的值为返回给前端的值
//   	errno: 0,
//   	dataList // 把获取到数据返回给前端
//   }
// })


router.prefix('/api/blog') // prefix方法为下面每个路由的前面内容，比如：http://localhost:3000/api/blog/list，每个访问路由必须要包含/api/blog
router.get('/list', async (ctx, next) => { // get方法访问链接为：http://localhost:3000/api/blog/list
  const title = ctx.query.title // 从ctx中获取传来的author值
  const likes = ctx.query.likes
  console.log("title",title);
  const dataList = await getList(title, likes) // 调用执行getList传入author，keyword，因为它的返回值也是promise所以也可以用await
  ctx.body = { // ctx.body的值为返回给前端的值
  	errno: 0,
  	dataList // 把获取到数据返回给前端
  }
})

router.get('/detail', async (ctx, next) => { // 剩下的方法基本一致，大家可以自己动手写写
  const dataDetail = await getDetail(ctx.query.id) // 传入id，get的方法传给后端的参数都在ctx.query
  ctx.body = {
  	dataDetail,
  	errno: 0
  }
})

router.post('/new', async (ctx, next) => { // 
  let blog = ctx.request.body // post请求全部内容都在ctx.request.body
  blog.createtime = new Date().getDate()
  const data = await newBlog(blog)
  ctx.body = {
  	errno: 0,
  	data
  }
})

module.exports = router // 最后把路由返回回去
