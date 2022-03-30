// models文件夹里再创建Blog.js，代码如下： 
const mongoose = require('../db/mymongo') // 引入刚刚创建的mymongo

// const BlogSchema = mongoose.Schema({ // 创建集合格式
//   title: { // 集合中有title
//     type: String, // 类型为字符串
//     required: true // 必填选项
//   },
//   content: String, // 集合中有类型为字符串的content
//   author: String
// }, {timestamps: true}) // timestamps为每次添加数据都会自动添加时间值包含首次创建和更改时间值

const BlogSchema = mongoose.Schema({
  type: Array,
  title: String,
  desc: String,
  fileCoverImgUrl: String,
  html: String,
  markdown: String,
  level: Number,
  github: String,
  auth: String,
  source: Number,
  isVisible: Boolean,
  releaseTime: String,
  pv: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});



const Blog = mongoose.model('blog', BlogSchema) // 再把刚刚创建的BlogSchema添加进mongoose.model，第一个参数'blog'为你数据库的blog集合名，再blog后面会默认加s，等于blogs

module.exports = Blog // 最后返回出去
