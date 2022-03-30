<template>
  <div class="content-box">
    
    <el-row class="article-list">

      <template>
        <span class="table-title">博客数据统计</span>
        <span>(累计博文{{num_blogs}}篇)</span>
      </template>
      
      

      <!--  按照日期汇总全部博客的likes,comment等消息-->
      {{feadData}}
      
      <!--  统计单篇博文的pv,likes,comment等消息 -->
      <el-table
        :data="articleData"
        border
        stripe
        show-summary
        style="width: 100%; margin-top: 20px;"
        max-height="250">
        <el-table-column fixed v-for='item in Headers' :key="item.key" :prop="item.key" :label="item.label"  align="center" >
          <template v-if="articleData.length>0" slot-scope="scope">
            {{scope.row[scope.column.property]}} 
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    
   
  </div>
</template>

<script>

import { apiGetBlogList, apiGetBlogTotal , addVisitInfo} from "src/api/blog";
// import { apiGetBlogList, apiGetBlogTotal } from "src/api/blog";
import { formatTime } from "../../filters/index";
// import { visitMondel } from './visit';

export default {
  name: "home",
  
  data() {
    return {
      blogList: [],
      num_blogs: '',
      vistData: [],
      articleData:[],
      blogTmp: [],
      feadData: {},
      Headers:[
          {
            key: 'releaseTime',
            label: "发布日期"
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
            key: "cmt",
            label: "评论数"
          },
      ],
    }
  },
  
  components: {},
  computed: {

  },
  created() {
    this.getVistdata();
    // visitMondel(function(data){
    //   this.feadData = data;
    // })
  },
  mounted() {
    
  },

  methods: {
    getVistdata() {
      // let params = { pagesize: 100,} // 查询页面条数，设置1k万
      //  return apiGetBlogTotal()
      return addVisitInfo()
        .then((res) => {
          let { list } = res.data; // 返回博客列表，博文篇数
          this.blogList = list;
          
          if (this.blogList && this.blogList.length > 0) {
            for(var i=0, len = this.blogList.length; i < len; i++) {
              let cnt = this.blogList[i]
              let dat = {
                          releaseTime: formatTime(cnt.releaseTime, 'yyyy-MM-dd hh'), // 博文发布时间戳
                          pv: cnt.pv, // 浏览量（点开阅读）
                          likes: cnt.likes, // 点赞数
                          cmt: cnt.comments, // 评论数
                        };
              this.blogTmp[i] = dat };
          this.articleData = this.blogTmp;
          this.num_blogs = this.articleData.length;
          }
        })
      },
  }

}
</script>


<style lang="less" scoped>
  
.content-box {
  padding-top: 20px;
}

.table-title {
  font-weight: bold;
  width: .4rem; 
  padding-left:30px;
}
.article-list {
  background-color: rgb(159, 104, 241);
  // align-items: center;
    // text-align: center;
  font-size: 20px;
  color: rgb(251, 251, 255);
  }


</style>