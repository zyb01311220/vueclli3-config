<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ $store.state.num }}</p>
    <button @click="handleClick">点击</button>
  </div>
</template>
<script>
export default {
  name: " About ",
  methods:{
      handleClick(){
          this.$store.state.num=456;
      }
  },
  created(){
      window.addEventListener("beforeunload", () => {
          window.sessionStorage.num=this.$store.state.num;
      });
  }
};
</script>
<style scoped lang="scss">

</style>
