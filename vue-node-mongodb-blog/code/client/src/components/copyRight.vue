<template>
  <div class="copyright-wrapper">
    <span
      >Copyright © www.infersite.com All rights reserved.<br />
      备案号：<a href="https://beian.miit.gov.cn/" target="_blank"
        >苏ICP备2022007711号</a
      ></span
    >
  </div>
</template>

<style lang="less" scoped>
.copyright-wrapper {
  height: 80px;
  background-color: @mainColor;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    text-align: center;
    line-height: 22px;
    font-size: 14px;
    a {
      color: @thinHighlightColor;
      text-decoration: underline;
    }
  }
}
</style>