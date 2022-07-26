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
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token)
    this.$http.defaults.headers.common.Authorization = token
    const loginApi = `${process.env.VUE_APP_API}api/user/check`
    // console.log(loginApi)
    this.$http.post(loginApi, this.user)
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
