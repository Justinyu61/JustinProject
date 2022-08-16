<template>
  <div class="wrap">
    <div class="stepper">
      <ul>
        <li>Step 1 <br>確認購物車</li>
        <li>Step 2 <br>填寫資料</li>
        <li>Step 3 <br>完成訂單</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCheck'
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";
.stepper {
  ul {
    display: flex;
    justify-content: space-around;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      bottom: -30px;
      left: 0;
      width: 100%;
      border-top: 3px solid #ffffff;
    }
  }

  li {
    background: $customLightGray;
    border-radius: 15px;
    padding: 20px 80px;
    font-size: 1em;
    text-align: center;
    line-height: 30px;
    color: white;

    &:nth-child(2) {
      background-color: $customGray-Blue;
    }
  }
}
</style>
