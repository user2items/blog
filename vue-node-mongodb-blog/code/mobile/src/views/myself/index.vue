<script setup lang="ts">
</script>

<template>
  <div class="app-container">
    <div class="my-bg">
      <img class="img-avatar" src="@/assets/avatar.png" />
      <img class="img-bg" src="@/assets/bg4.jpg" />
    </div>
    <div class="my-body">
      <div class="my-name">I'm sum | 我是杉木 </div>
      <div class="my-job">Pain past is pleasure | 彩虹总在风雨后 </div>
      <div class="my-desc">
        爱阅读、爱技术、爱分享的好青年 ^_^ 。
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  .my-bg {
    height: 150px;
    border-radius: 4px;
    position: relative;
    .img-avatar {
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -50px;
      left: calc(50vw - 50px);
      border-radius: 50%;
      z-index: 99;
    }
    .img-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .my-body {
    margin-top: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .my-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .my-job {
      font-size: 14px;
      color: $mainColor;
    }
    .my-desc {
      font-size: 14px;
      color: $baseFontColor;
      padding: 16px 24px;
      line-height: 24px;
    }
  }
  .my-footer {
    background: $baseBackColor;
    border-radius: 12px;
    margin: 0 16px;
    padding: 12px;
    text-align: left;
    line-height: 24px;
    color: $subFontColor;
    font-size: 14px;
    a {
      color: $baseLinkColor;
      text-decoration: underline;
    }
  }
}
</style>