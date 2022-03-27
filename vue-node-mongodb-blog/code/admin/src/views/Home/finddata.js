
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test2';


/* 汇总博客数据：
1. 访问数据库，以日为单位统计博文浏览量，点赞量及博文数量
2. 以上数据通过查询数据库blogs表获得
3. 统计结果存储在vists表;
*/

var feadBack = function(db, callback) { // 访问数据库、获取数据
  var collection = db.collection('blogs');
  collection.aggregate([{
    $group: { _id : null, // 对pv, likes, comments 按照列求和 + 总博文条数
                pv : { $sum: "$pv" }, 
                likes : { $sum: "$likes" }, 
                comments : { $sum: "$comments" },
                count: { $sum: 1 }
            }
    }]).toArray(function(err, result) {
      if (err) throw err;
      var now = new Date().toLocaleDateString();
      data = {};
      data.updatetime = now;
      data.pv = result[0].pv;
      data.likes = result[0].likes;
      data.comments = result[0].comments;
      data.numblog = result[0].count;
      
      updateDB(db, data, function(res){// 更新博客数量及pv, likes等信息
        var finalData = res;
        callback(finalData)
      }); 
    });
};




/* 更加数据：
更新vists表信息： 每日博文pv,likes,comment及博文数量
*/

var iscollectionExist = function(db, Table, callback){ //判断collection是否存在: 存在直接更新，否则将数据插入
  db.listCollections({name: Table}).next(function(err, collinfo) {
    var isExist = collinfo ? true: false;
    callback(isExist);
  });
};

var insertdb = function(collection, data, callback) {// 插入collection
  data.update = 1;
  collection.insertOne(data, function(err, res){ 
    if(err) {
      data.update = 0;
    } else {
      data.update = 1;
    };
    callback(data)
  });
};


var updateDB = function(db, data, callback) { // 更加数据
  const Table = "visits";
  var collection = db.collection(Table);

  // 写入collection： 判断is_exist: false 将数据插入， true: 如数据已有直接更新、否则插入。
  iscollectionExist(db, Table, function(isExist){
    var is_exist = isExist;
    if(!is_exist) { // collection不存在，创建并写入数据
      insertdb(collection, data, function(inserData){
        data = inserData;})
    }
    else { // collection已存在，判断数据是否存在
      var now = new Date().toLocaleDateString();
      var whereStr = { updatetime: now };
      var updateStr = {$set: data };
      collection.findOne(whereStr).then(res=>{
        if(!res){ // 数据不存在，写入
          insertdb(collection, data, function(inserData){
            data = inserData;})}
        else{ // 已存在，更新数据
          collection.updateOne( whereStr, updateStr, function(err, res){
          data.update = err ? 0 : 1;
          })
        }
      })  
    };
  callback(data);
  
  });
  
};


// 测试

const visitMondel = function(callback) {
  MongoClient.connect(url,function(err,db){
    if(err) throw err;
      feadBack(db, function(data) {
        var fead_date = data;
        // console.log("data结果：", fead_date);
        callback(fead_date)
      });
  });
}



// visitMondel(function(data){
//   console.log(data);
// })

module.exports = visitMondel;









