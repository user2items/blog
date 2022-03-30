// controller文件夹，里面创建blog.js文件，代码如下： 
const Blog = require('../models/Blog') // 引入刚刚我们创建的Blog
const xss = require('xss') // 引入xss防工具插件

const getList = async (title, likes) => { // 获取博客数据
  let whereObj = {} // 创建条件对象，如果有前端有传值则设置
  if (title) {whereObj.title = title}
  if (likes) {whereObj.keyword = new RegExp(likes)}
  console.log("查询：", Blog.find(whereObj))
  return await Blog.find(whereObj).sort({_id: -1}) // 最后通过Blog的find方法为查找内容，然后以_id为值倒叙排序返回数据，因为是异步所以可以使用await进行等待数据返回

}

const getDetail = async (id) => { // 获取内容
  return await Blog.findById(id) // findById方法查询id

}

const newBlog = async (newblog = {}) => { // 新建博客
  let { title, content, author } = newblog

  title = xss(title)
  content = xss(content)

  const blog = await Blog.create({ // create方法为创建数据
    title,
    content,
    author
  })
  return {
    id: blog._id
  } 
}

const upDatablog = async (id, updatablog) => { // 更新博客
  let { title, content } = updatablog
  title = xss(title)
  content = xss(content)
  const upblog = await Blog.findOneAndUpdata({ // findOneAndUpdata为查找一个数据并且更新，第一个参数为条件，第二个参数为更新的内容，第三个参数为设置
    _id: id // 条件
  }, { // 更新内容
    title,
    content
  }, {
    new: true // 返回新的值
  })
  return upblog? true:false // upblog更新成功里面有值，则返回true
}

const delBlog = async (id, author) => { // 删除某个数据
  const delblog = await Blog.findOneAndDelete({ // findOneAndDelete方法为查询一个数据并且删除
    _id: id, // 条件
    author // 条件
  })
  return delblog? true:false
}

module.exports = { // 最后把全部方法返回出去，供路由调用。
  getList,
  getDetail,
  newBlog,
  upDatablog,
  delBlog
}
