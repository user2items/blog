
var exec = require('child_process').exec;

// 参考： https://www.cnblogs.com/vaelcy/p/10294405.html

function executeCommand(cmd){ // 执行命令
    exec(cmd, function(error, stdout, stderr) {
        if(error){
            console.error(error);
        }
        else{
            console.log("success ");
        }
    });
}


function executeStart() { // 启动 blog
    console.log(' blog 启动 ... ')
    var cmd1 = 'npm run server' ; // 启动 blog-api 服务
    var cmd2 = 'cd ./code/mobile/ && npm run dev' ; // 启动 blog-mobile web
    var cmd3 = 'npm run dev:client' ; // 启动 blog-pc web;
    var cmd4 = 'npm run dev:admin' ; // 读取 blog-后台管理 web
    executeCommand(cmd1);
    executeCommand(cmd2);
    executeCommand(cmd3);
    executeCommand(cmd4);
}


var express = require('express');
var app = express();
var routers = [];



app.get('/', function (req, res) {
    var pc_flag = true; 
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    // res.send('OK');
    // console.log('deviceAgent: ', deviceAgent)
    if(agentID){
        // console.log('请求来自手机、pad等移动端')
        res.send('请求来自手机、pad等移动端')
        this.pc_flag = false;

    }else{
        // console.log('请求来自PC')
        res.send('请求来自PC')
    }
    
    if (! pc_flag) { // blog-mobile
        routers = [
            {
                path: '/',
                redirect: 'http://localhost:8089/#/home'
            },
            {
                path: '/ui/login',
                name: 'mobileLogin',
                component: mobileLogin
            },
            {
                path: '/ui/index',
                name: 'mobileIndex',
                component: mobileIndex,
                meta: {
                    requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                },
            }
        ]
    
    } else { // blog-pc
            routers = [
                {
                    path: '/',
                    redirect: 'http://localhost:8080/#/index', // 后台：http://localhost:8080/#/index
                },
                {
                    path: '/ui/login',
                    name: 'login',
                    component: login
                },
                {
                    path: '/ui/index',
                    name: 'index',
                    component: index,
                    meta:   {
                                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                            },
                    children: [
                            {
                                path: '/ui/totalfloor',
                                name: 'totalfloor',
                                component: totalfloor,
                                meta: {
                                        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                                    },
                            },
                            {
                                path: '/ui/pointsfloor',
                                name: 'pointsfloor',
                                component: pointsfloor,
                                meta: {
                                        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                                    },
                            },    
                        ]
                }
            ]
        }
    

     
    
})
 



var server = app.listen(8081, '127.0.0.1', function () {
    var host = server.address().address
    var port = server.address().port
    var url = "http://" + host + ":" + port
    console.log(url)
})


executeStart() // 启动 blog