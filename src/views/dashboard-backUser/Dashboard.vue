<template>
    <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import emitter from '@/methods/getEmitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  name: 'Dashboard-view',
  components: {
    Navbar,
    ToastMessages
  },
  created () {
    this.$http.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    const customerApi = `${process.env.VUE_APP_API}api/user/check`
    // console.log(customerApi)
    this.$http.post(customerApi, this.user)
      .then((res) => {
        // console.log(res)
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>

<style scoped>

</style>
