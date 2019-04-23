<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script>
import Index from "views/index";

export default {
  name: "app",
  components: {
    Index
  }
};
</script>

<style lang="stylus" >
@import 'common/stylus/index.styl';

#app {
}
</style>
