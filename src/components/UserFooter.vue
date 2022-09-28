<template>
  <div class="footer">
    <div class="footer__body">
      <div class="footer__body--text">
        <p>圖片僅供個人學習使用，無商業用途</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFooter'
}
</script>

<style lang="scss" scoped>
.footer{
  width: 100%;
  height: 100px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  @media screen and (max-width: 768px) {
    position: initial;
  }
  &__body{
    &--text {
      p {
        color: white;
      }
    }
  }
}
</style>
