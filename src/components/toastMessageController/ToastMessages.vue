<template>
<div class="toast-container position-absolute pe-3 top-0 end-0">
  <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"></Toast>
</div>
</template>

<script>
import Toast from '@/components/toastMessageController/Toast.vue'

export default {
  name: 'ToastMessages',
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => { // 這message外部傳入的訊息
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content }) // 推送到訊息列表
    })
  }
}
</script>
