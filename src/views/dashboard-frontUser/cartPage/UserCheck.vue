<template>
  <div class="wrap">
    <div class="stepper">
      <ul>
        <li>Step 1 <br>確認購物車</li>
        <li>Step 2 <br>填寫資料</li>
        <li>Step 3 <br>完成訂單</li>
      </ul>
    </div>
    <div class="mt-5 row justify-content-center">
    <form class="col-md-6">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <Field id="email" name="email" type="email" placeholder="請輸入 Email" class="form-control"></Field>
        <ErrorMessage name="" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名:</label>
        <Field id="name" name="姓名" type="text" placeholder="請輸入 姓名" class="form-control"></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話:</label>
        <Field id="tel" name="電話" type="tel" placeholder="請輸入 電話" class="form-control"></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">收件人地址:</label>
        <Field id="address" name="地址" type="text" placeholder="請輸入 地址" class="form-control"></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'UserCheck',
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {

  }
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
