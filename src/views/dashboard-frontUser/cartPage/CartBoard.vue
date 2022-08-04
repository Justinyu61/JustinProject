<template>
  <UserHeader></UserHeader>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import UserHeader from '@/components/UserHeader'
import emitter from '@/methods/getEmitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  name: 'UserCart',
  data () {
    return {
      products: [],
      isLoading: false
    }
  },
  components: {
    UserHeader,
    ToastMessages
  },
  provide () {
    // 內層元件都能用外層的功能+inject
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
