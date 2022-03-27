<template>
  <div class="content-box">
    <el-row class="article-list">
      <template>
        <span class="table-title">博客数据统计</span>
      </template>
      
      <el-table
        :data="visitArrs"
        border
        stripe
        style="width: 100%; margin-top: 20px;"
        max-height="250"
        :default-sort = "{prop: 'update_time', order: 'descending'}"
        class="VisitArrs"
        >
        <el-table-column fixed sortable v-for='item in VisitHeaders' :key="item.key" :prop="item.key" :label="item.label"  align="center" >
          <template  slot-scope="scope">
            {{scope.row[scope.column.property]}} 
          </template>
        </el-table-column>
      </el-table>

    </el-row>
    
   
  </div>
</template>

<script>

import { apiGetBlogList, apiAddVisitInfo, apiGetVisitInfo } from "src/api/blog";
import { formatTime } from "../../filters/index";


export default {
  name: "home",
  
  data() {
    return {
      blogList: [],
      visitData: [],
      visitArrs: [] ,
      feadData: {},
      VisitHeaders: [
                  {
                    key: 'update_time',
                    label: "更新日期"
                  },
                  {
                      key: "numblog",
                      label: "博文数量"
                  },
                  {
                      key: "pv",
                      label: "博文浏览量"
                  },
                  {
                      key: "likes",
                      label: "点赞量"
                  },
                  {
                      key: "comments",
                      label: "评论数"
                  },

                ],

    }
  },
  
  components: {},
  computed: {

  },
  created() {
    // this.getVistdata();
  },
  mounted() {
    this.updateVistdata();
    this.getVisitData();
    this.getBlogList();
  },

  methods: {
    updateVistdata() { // 添加博客统计只数据库
      return apiAddVisitInfo()
        .then((res) => {
          let [ list ]  = res.data; // 返回博客列表，博文篇数
          this.visitData = list;
          // console.log("博文日访问数据: ", this.visitData);
        })
      },
    
    getVisitData() { // 获取博客日访问数据
      let params = {
        pageindex: 1,
        pagesize: 10000,
      };
      return apiGetVisitInfo(params)
        .then((res) => {
          let { list }  = res.data;
          this.visitArrs = list; 
          // console.log("visitArrs: ", this.visitArrs);
        })
    },

    getBlogList() { // 博客详细统计
      let params = {pagesize: 10000};
      return apiGetBlogList(params)
        .then((res) => {
          let { list, total } = res.data;
          this.blogList = list;
          if (this.blogList && this.blogList.length > 0) {
            for(var i=0, len = this.blogList.length; i < len; i++) {
              let cnt = this.blogList[i]
              let dat = { releaseTime: formatTime(cnt.releaseTime, 'yyyy-MM-dd hh'), // 博文发布时间戳
                          pv: cnt.pv, // 浏览量（点开阅读）
                          likes: cnt.likes, // 点赞数
                          cmt: cnt.comments, // 评论数
                        };
              this.blogTmp[i] = dat };
          this.articleData = this.blogTmp;
          console.log("this.articleData: ", this.articleData)
          
          }
        })
        
        
    },

  },

}
</script>


<style lang="less" scoped>
  
.content-box {
  padding-top: 20px;
  padding-left:10px;
  padding-right: 10px;
}

.table-title {
  font-weight: bold;
  width: .4rem; 
  padding-left:30px;
}
.article-list {
  background-color: rgb(159, 104, 241);
  align-items: center;
  // text-align: center;
  font-size: 20px;
  color: rgb(251, 251, 255);
  }


</style>