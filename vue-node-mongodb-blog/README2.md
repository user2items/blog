# vue-node-mongodb-blog



1. 项目启动前，需要在本地安装好 MongoDB 数据库
2. 在`code/server/config.js`文件配置数据库名、用户以及密码等一些必要的信息；这些信息都可以自定义，但是需要跟`步骤 3`同步起来

```js
// code/server/config.js
export default {
  env: process.env.NODE_ENV,
  port,
  auth,
  log,
  mongodb: {
    username: "wall", // 数据库用户
    pwd: 123456, // 数据库密码
    address: "localhost:27017",
    db: "wallBlog", // 数据库名
  },
};
```

3. 启动本地的`mongo`服务，给数据库初始化在`code/server/config.js`配置的一些必要信息

```js
> mongo // 开启mongo服务
> show dbs // 显示数据库列表
> use blog2022 // 新建一个数据库, blog2022
> db.createUser({user:"qunosen",pwd:"123456",roles:[{role:"readWrite",db:'blog2022'}]}) // 在wallBlog数据库创建一个qunosen用户，密码为123456
> show users // 展示该库有哪些用户
> db.auth("qunosen", "123456"); // 数据库认证一下用户、密码，返回 1 认证成功
```

4. 登录管理后台时，需要给数据库创建`users`集合，并注册一个账号进行登录

```js
> mongo // 开启mongo服务
> show dbs // 显示数据库列表
> use blog2022 // blog2022
> db.users.insert({  // 往该库的users集合插入一条数据，账号：admin  密码：123456
    "pwd" : "e10adc3949ba59abbe56e057f20f883e",
    "username" : "qunosen",
    "roles" : [
        "admin"
    ]
})
> show collections // 查询该库下的集合（类似于mysql的表）
> db.users.find() // 查询users集合下的所有数据
```

5. 初始化好了数据库就可以开启后台接口服务`npm run server`，数据库如果连接成功会在控制台打印提示#### npm run server
6. `yarn dev:admin`启动管理后台界面，用上面注册的账号密码登录，就可以添加数据了
7. `yarn dev:client`启动客户端页面预览



启动服务： #### npm run server,  单独启动服务还可以：172.25.88.25:3000
后台管理： npm run dev:admin ， 端口号：8090: http://localhost:8090
pc: npm run dev:client, 端口号：8080, http://localhost:8080
移动端： cd code/mobile && npm run dev, 端口：http://localhost:8089

服务端部署：

cd code/server && node index.js


## 脚本命令

- `yarn dev:admin` // 本地开发管理端页面
- `yarn dev:client` // 本地开发客户端页面
- `yarn build:admin` 或者 `npm run build:admin` // 项目打包 - 管理端
- `yarn build:client` 或者 `npm run build:client` // 项目打包 - 客户端
- `cd ./code/mobile/ && npm run build` // 项目打包 - 移动客户端
- `yarn analyz` // 查看打包信息
- `yarn server` // 启动后台接口服务

