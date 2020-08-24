<template>
  <div id="app">
    <Headers></Headers>
    <router-view />
  </div>
</template>

<script>
import Headers from "@/components/Headers";
export default {
  name: "app",
  components: {
    Headers,
  },
  mounted() {
    let vs = require("../node_modules/vconsole/dist/vconsole.min.js");
    var vConsole = new vs();
  },
};
</script>

<style lang="scss" scoped>
</style>
