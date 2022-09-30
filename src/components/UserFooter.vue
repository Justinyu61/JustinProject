<template>
  <div class="footer">
    <div class="footer__body">
      <div class="footer__body--text">
        <p>資料、圖片來源皆來自網路，僅作為學習用途。</p>
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
