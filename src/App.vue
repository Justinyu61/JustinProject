<template>
  <UserHeader/>
    <router-view/>
  <UserFooter/>
</template>

<script>
import UserHeader from '@/components/UserHeader'
import UserFooter from '@/components/UserFooter'

export default {
  components: {
    UserHeader,
    UserFooter
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
