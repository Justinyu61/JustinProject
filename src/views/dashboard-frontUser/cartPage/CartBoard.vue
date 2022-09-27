<template>
<!--  <div class="container-fluid mt-3 position-relative"></div>-->
    <ToastMessages></ToastMessages>
    <router-view/>

</template>

<script>
import emitter from '@/methods/getEmitter'
import ToastMessages from '@/components/toastMessageController/ToastMessages.vue'

export default {
  name: 'UserCart',
  data () {
    return {
      products: [],
      isLoading: false
    }
  },
  components: {
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
