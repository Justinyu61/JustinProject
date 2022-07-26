<template>
    <router-view/>
</template>
<script>
export default {
  data () {
    return {
      name: process.env.VUE_APP_NAME
    }
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
