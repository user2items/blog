# sum's blog

## 1. 项目简介

  这个一个集成了 **前端页面、后端服务及后台管理的个人博客系统**，项目采用了前后端分离的模式进行开发，其中前端分为采用vue2 + ElementUI 搭建，后端主要为Node + Koa2, 数据库为 MongoDB， 线上访问 **[sum-blog](http://www.infersite.com/)** 。


## 2. 项目启动：
  启动前需要自行安装 node, MongoDB。

### 2.1 启动本地 mongo 服务
  设置在`code/server/config.js`配置的一些必要信息， 包括数据库 名称及账号密码等。
  ```js
  cd mongo/bin && mongo // 启动mongo服务
  > show dbs // 显示数据库列表
  > use sumblog // 新建一个sumblog数据库
  > db.createUser({user:"sum",pwd:"sum",roles:[{role:"readWrite",db:'sumblog'}]}) // 设置sumblog 用户账号及密码， 用户: sum，密码：sum
  > show users // 展示该库有哪些用户
  > db.auth("sum", "sum"); // 数据库认证一下用户、密码，返回 1 认证成功
  > db.users.insert({admin, //// 往该库的users集合插入一条数据
      "pwd" : "admin",
      "username" : "admin",
      "roles" : [
          "admin"
      ]
  })

  ```

### 2.2 设置 `code/server/config.js`

// code/server/config.js
export default {
  env: process.env.NODE_ENV,
  port,
  auth,
  log,
  mongodb: {
    username: "sum", // 数据库用户
    pwd: sum, // 数据库密码
    address: "localhost:27017",
    db: "sumblog", // 数据库名
  },
};


### 2.3 启动命令：

|             命令                |              解释              |
|            ----                |               ----             |
|      npm run server            | 启动后端服务                    |
| npm run dev:admin              | 启动sum log管理后台             |
| npm run dev:client             | 启动sum log PC端页面            |
| cd code/mobile/ && npm run dev | 启动sum log 手机端页面                 |
| nodemon start.js | 同时启动 后端服务、博客pc端、博客手机端和博客管理后台   |


启动服务url：http://172.25.88.25:3000
后台管理url： http://localhost:8090
sum blog pc: http://localhost:80
sum blog mobile：http://localhost:8089


## 3. 打包：

- `npm run build:admin` // 项目打包 - 管理端
- `npm run build:client` // 项目打包 - pc客户端
- `cd code/mobile && npm run build` // 项目打包 - pc客户端


## 4. TO DO:
- 移动端整合：目前主要还是使用的PC端，移动端未做兼容，所以手机端访问时可能会页面变形；
- 留言模块：目前留言单独成一个页面，未来会在博客正文页面下也添加一个留言交流区域



## 5. 致谢与交流：

 ### 5.1 致谢：
 
 项目开发当中得到大佬 **[苏s哈](http://www.rasblog.com)** 无私帮助，也曾多次通过网络交流技术到深夜，每每想起都记忆尤深，在此感谢大佬 **[苏s哈](http://www.rasblog.com)** 。

主要参考：
（1）https://github.com/Sujb-sus/vue-node-mongodb-blog
（2）https://element.eleme.io/#/zh-CN/component/installation

 ### 5.2 ：
  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

  交流讨论：**[sum-blog](http://www.infersite.com/)** 。
