<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ $store.state.num }}</p>
    <button @click="handleClick">点击</button>
    <ul>
      <li v-for="item in $store.state.list">{{item}}</li>
    </ul>
    <p :class="$style.content">css  Module</p>
  </div>
</template>
<script>
export default {
  name: "About",
  methods:{
      handleClick(){
          this.$store.state.num=456;
          this.$store.dispatch('getInfo');
      }
  },
  created(){
      window.addEventListener("beforeunload", () => {
          window.sessionStorage.num=this.$store.state.num;
      });
  }
};
</script>
<style module>
  .content{
    color:#f66;
    font-size:30px;
  }
</style>
