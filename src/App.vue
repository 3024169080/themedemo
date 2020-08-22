<template>
  <div id="app">
    <Headers></Headers>
    <router-view/>
  </div>
</template>

<script>
import Headers from "@/components/Headers";
export default {
  name: "app",
  components:{
    Headers
  }
};
</script>

<style lang="scss" scoped>

</style>
