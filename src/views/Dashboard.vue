<template>
<Navbar></Navbar>
  <div class="container-fluid">
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Dashboard-view',
  components: {
    Navbar
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
  }
}
</script>

<style scoped>

</style>
