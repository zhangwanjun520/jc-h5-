<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
      // screenWidth: "",
      // screenHeight: ""
    };
  },
  methods: {},
  // mounted() {
  //   this.screenWidth = document.body.clientWidth;
  //   this.screenHeight = document.body.clientHeight;
  //   window.onresize = () => {
  //     return (() => {
  //       this.screenWidth = document.body.clientWidth;
  //       this.screenHeight = document.body.clientHeight;
  //     })();
  //   };
  // },
//   watch: {
// // 解决ie浏览器缓存页面，样式混乱
//     screenWidth() {
//       this.$forceUpdate();
//       console.log("宽度变化了");
//     },
//     screenHeight() {
//       this.$forceUpdate();
//       // console.log("高度变化了");
//     }
//   }
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  width:100%;
  /* max-width: 1920px;
  margin: auto; */
  height: 100%;
    /* background-color: #f7f7f7; */
    position: absolute;
    font-family:"Microsoft Yahei";
}
#app {


  width: 100%;

  height: 100%;

}
* {
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
</style>
