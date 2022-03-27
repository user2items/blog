import blogModel from "../../models/blog";
import marked from "marked";
import visitMondel from "../../models/visit";


marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, //允许 Git Hub标准的markdown.
  tables: true, //允许支持表格语法。该选项要求 gfm 为true。
  breaks: true, //允许回车换行。该选项要求 gfm 为true。
  pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: function(code) {
    return require("highlight.js").highlightAuto(code).value;
  },
});

module.exports = {
  async list(ctx, next) {
    console.log(
      "----------------获取博客列表 blog/list-----------------------"
    );
    let { keyword, pageindex = 1, pagesize = 10 } = ctx.request.query;
    console.log("ctx.request =>", ctx.request);
    console.log(
      "keyword:" +
        keyword +
        "," +
        "pageindex:" +
        pageindex +
        "," +
        "pagesize:" +
        pagesize
    );
    try {
      let reg = new RegExp(keyword, "i");
      let data = await ctx.findPage(
        blogModel,
        {
          $or: [{ type: { $regex: reg } }, { title: { $regex: reg } }],
        },
        null,
        { limit: pagesize * 1, skip: (pageindex - 1) * pagesize }
      );
      ctx.send(data);
    } catch (e) {
      console.log(e);
      ctx.sendError(e);
    }
  },

  async add(ctx, next) {
    console.log("----------------添加博客 blog/add-----------------------");
    let paramsData = ctx.request.body;
    try {
      let data = await ctx.findOne(blogModel, { title: paramsData.title });
      if (data) {
        ctx.sendError("数据已经存在, 请重新添加!");
      } else {
        paramsData.html = marked(paramsData.html);
        let data = await ctx.add(blogModel, paramsData);
        ctx.send(paramsData);
      }
    } catch (e) {
      ctx.sendError(e);
    }
  },

  async update(ctx, next) {
    console.log("----------------更新博客 blog/update-----------------------");
    let paramsData = ctx.request.body;
    try {
      paramsData.html = marked(paramsData.html);
      let data = await ctx.update(
        blogModel,
        { _id: paramsData._id },
        paramsData
      );
      ctx.send();
    } catch (e) {
      if (e === "暂无数据") {
        ctx.sendError(e);
      }
    }
  },

  async del(ctx, next) {
    console.log("----------------删除博客 blog/del-----------------------");
    let id = ctx.request.query.id;
    try {
      ctx.remove(blogModel, { _id: id });
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },

  async info(ctx, next) {
    console.log(
      "----------------获取博客信息 blog/info-----------------------"
    );
    let _id = ctx.request.query._id;
    try {
      let data = await ctx.findOne(blogModel, { _id });
      return ctx.send(data);
    } catch (e) {
      return ctx.sendError(e);
    }
  },

  async addVisitInfo(ctx, next) {// 2022-3-16添加: 将getBlogTotal信息写入数据库
    console.log(
      "----------------添加博客统计 pv, likes 等 信息 blog/visit-----------------------"
    );
    try {
      
      let conditions = [{
        $group: {  _id : null, // 对pv, likes, comments 按照列求和 + 总博文条数
                    pv : { $sum: "$pv" }, 
                    likes : { $sum: "$likes" }, 
                    comments : { $sum: "$comments" },
                    count: { $sum: 1 }
                }
              }];
      
      let blogDat = await ctx.aggregate(blogModel, conditions);
      var now = new Date().toLocaleDateString();
      blogDat[0].update_time = now;
      
      let visitDat = {};// 回写入visit
      visitDat.update_time = blogDat[0].update_time;
      visitDat.pv = blogDat[0].pv;
      visitDat.likes = blogDat[0].likes;
      visitDat.comments = blogDat[0].comments;
      visitDat.numblog = blogDat[0].count;

      // console.log("visitDat: ", visitDat);
      
      // 判断数据是否存在: 存在则进行更新--调用update，不存在直接添加-- 调用add
      // 1. 查询当日数据是否存在：调用封装方法findOne, 如果已存在进行更新
      let dateStr = { update_time: now };
      let is_exist = await ctx.findOne(visitMondel, dateStr);
      
      if (is_exist) { // 如果当日已有数据，则进行更新
        let _updateVisit = await ctx.update(visitMondel, dateStr, visitDat);
      } 
      // 2. 如果不存在：直接添加数据, 调用db.js 中的add方法
      else {
        let _addVisit = await ctx.add(visitMondel, visitDat);
      }

      // console.log("blogDat: ", blogDat);//
      return ctx.send(blogDat);
    } catch (e) {
      return ctx.sendError(e);
    }

  },

  async getVisitInfo(ctx, next) { // 返回 visit 数据库统计信息
    console.log(
      "----------------显示博文每日访问信息： pv, likes 等 信息 blog/visit-----------------------"
      );
    let {pageindex = 1, pagesize = 10 } = ctx.request.query;
    try {
          let visitDat = await ctx.findPage( 
              visitMondel,
              {},
              null,
              { limit: pagesize * 1, skip: (pageindex - 1) * pagesize }
              );

          // console.log("visitDat: ", visitDat);
          ctx.send(visitDat);
        } catch (e) {
          console.log(e);
          ctx.sendError(e);
        };
    }

};


