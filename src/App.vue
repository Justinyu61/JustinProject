<template>
  <UserHeader/>
    <router-view/>
</template>

<script>
import UserHeader from '@/components/UserHeader'

export default {
  components: {
    UserHeader
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
