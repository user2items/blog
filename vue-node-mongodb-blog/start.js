
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
 
app.get('/', function (req, res) {
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    // res.send('OK');

    console.log('deviceAgent: ', deviceAgent)

    if(agentID){
        console.log('请求来自手机、pad等移动端')
        res.send('请求来自手机、pad等移动端')
    }else{
        console.log('请求来自PC')
        res.send('请求来自PC')
    }       
    
})
 
var server = app.listen(8081, '127.0.0.1', function () {
    var host = server.address().address
    var port = server.address().port
    var url = "http://" + host + ":" + port
    console.log(url)
})


// executeStart() // 启动 blog