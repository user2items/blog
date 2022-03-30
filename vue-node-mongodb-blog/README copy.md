# vue-node-mongodb-blog



3. 启动本地的`mongo`服务，给数据库初始化在`code/server/config.js`配置的一些必要信息

```js
> mongo // 开启mongo服务
> show dbs // 显示数据库列表
> use blog2022 // 新建一个数据库:blog2022
> db.createUser({user:"qunosen",pwd:"qunosen",roles:[{role:"readWrite",db:'blog2022'}]}) // 在blog数据库创建一个qunosen用户，密码为qunosen
> show users // 展示该库有哪些用户
> db.auth("qunosen", "qunosen"); // 数据库认证一下用户、密码，返回 1 认证成功
```

4. 登录管理后台时，需要给数据库创建`users`集合，并注册一个账号进行登录

```js
> mongo // 开启mongo服务
> show dbs // 显示数据库列表
> use wallBlog // 进入到wallBlog数据库
> db.users.insert({  // 往该库的users集合插入一条数据，账号：admin  密码：123456
    "pwd" : "e10adc3949ba59abbe56e057f20f883e",
    "username" : "admin",
    "roles" : [
        "admin"
    ]
})
> show collections // 查询该库下的集合（类似于mysql的表）
> db.users.find() // 查询users集合下的所有数据
```

5. 初始化好了数据库就可以开启后台接口服务`yarn server`，数据库如果连接成功会在控制台打印提示
6. `yarn dev:admin`启动管理后台界面，用上面注册的账号密码登录，就可以添加数据了
7. `yarn dev:client`启动客户端页面预览

## 脚本命令

- `yarn dev:admin` // 本地开发管理端页面
- `yarn dev:client` // 本地开发客户端页面
- `yarn build:admin` // 项目打包 - 管理端
- `yarn build:client` // 项目打包 - 客户端
- `yarn analyz` // 查看打包信息
- `yarn server` // 启动后台接口服务

## 参考目录

1. `vue-node-blog` 开源项目：[https://github.com/cd-dongzi/vue-node-blog](https://github.com/cd-dongzi/vue-node-blog)
2. `vue-color`文档：[https://www.npmjs.com/package/vue-color](https://www.npmjs.com/package/vue-color)
3. `vue-lazyload`文档：[https://www.npmjs.com/package/vue-lazyload](https://www.npmjs.com/package/vue-lazyload)
