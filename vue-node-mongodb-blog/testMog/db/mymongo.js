 
const mongoose = require('mongoose') // 引入插件

const url = 'mongodb://127.0.0.1:27017' // 设置链接端口（默认）
const dbName = 'blog2' // 数据库名字

mongoose.connect(`${url}/${dbName}`,{ // 进行连接第一个参数为链接端口和数据库名字
  useNewUrlParser: true, // 一些配置信息
  useUnifiedTopology: true
})

const db = mongoose.connection // 最后连接

db.on('error', err => { // 监听是否报错
  console.log(err)
})
db.once('open', () => { // 监听连接成功在控制台打印，打印一次知道连接成功后即可注释调即可，不然每次保存启动时都会输出。
  console.log('mongoose 启动成功')
})
// db.close() // 断开连接

module.exports = mongoose 
