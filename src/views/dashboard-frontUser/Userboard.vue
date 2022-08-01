<template>
      <userNavbar></userNavbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/getEmitter'
import userNavbar from '@/components/UserNavbar'
export default {
  name: 'Userboard-view',
  components: {
    ToastMessages,
    userNavbar
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
