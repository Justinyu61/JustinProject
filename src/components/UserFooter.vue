<template>
  <div class="footer">
    <div class="footer__content">
      <div class="footer__content--text">
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
  height: 120px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  @media screen and (max-width: 768px) {
    padding: 3px;
    height: 80px;
  }
  &__content{
    &--text {
      p {
        color: white;
      }
    }
  }
}
</style>
