<template>
  <div class="position-relative ">
    <ToastMessages></ToastMessages>
  </div>
  <SideCart/>
  <router-view/>
</template>

<script>
import emitter from '@/methods/getEmitter'
import ToastMessages from '@/components/toastMessageController/ToastMessages.vue'
import SideCart from '@/components/SideCart'

export default {
  name: 'ProductBoard',
  components: {
    ToastMessages,
    SideCart
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
