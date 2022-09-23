<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="container">
      <h2>資料確認</h2>
    <div class="stepper">
      <ul>
        <li >Step 1 <br>確認購物車</li>
        <div class="arrowIconRight">
          <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
        </div>
        <div class="arrowIconDown">
          <font-awesome-icon  :icon="['fas', 'arrow-down']"/>
        </div>
        <li >Step 2 <br>填寫資料</li>
        <div class="arrowIconRight">
          <font-awesome-icon  :icon="['fas', 'arrow-right']"/>
        </div>
        <div class="arrowIconDown">
          <font-awesome-icon  :icon="['fas', 'arrow-down']"/>
        </div>
        <li>Step 3 <br>完成訂單</li>
      </ul>
    </div>
    <div class="mt-5 row justify-content-center">
    <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3 w-100">
        <label for="email" class="form-label text-control">Email:</label>
        <Field id="email" name="email" type="email" placeholder="請輸入 Email" class="form-control" :class="{ 'is-invalid': errors['email'] }" rules="email|required" v-model="form.user.email"></Field>
        <ErrorMessage name="" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label text-control">收件人姓名:</label>
        <Field id="name" name="姓名" type="text" placeholder="請輸入 姓名" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" rules="required" v-model="form.user.name"></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label text-control">收件人電話:</label>
        <Field id="tel" name="電話" type="tel" placeholder="請輸入 電話" class="form-control" :class="{ 'is-invalid': errors['電話'] }" rules="required" v-model="form.user.tel"></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label text-control">收件人地址:</label>
        <Field id="address" name="地址" type="text" placeholder="請輸入 地址" class="form-control" :class="{ 'is-invalid': errors['地址'] }" rules="required" v-model="form.user.address"></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label text-control">留言</label>
        <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <div class="text-end">
        <router-link class="btn" to="/cart/cartPage">返回購物車</router-link>
        <button class="btn btn-danger">送出訂單</button>
      </div>
    </Form>
  </div>
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
      },
      isLoading: false
    }
  },
  methods: {
    createOrder () {
      const postOrder = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.isLoading = false
      const order = this.form
      this.$http.post(postOrder, { data: order })
        .then((res) => {
          // console.log(res)
          this.isLoading = false
          const orderId = res.data.orderId
          this.$router.push(`./order/${orderId}`)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";
.wrap {
  width: 100vw;
  background-color: $customWrapBGColor;
  padding-top: 10vh;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
}
.container {
  display: flex;
  flex-direction: column;
  margin:0 auto;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background: $customTextColor-white;
  padding: 10px 0;
  @media screen and (max-width: 768px) {
    background: $customBackground;
    padding: 1px 0 20px 0;
  }
  h2 {
    font-size: 3em;
    color: $customBtnTextColor;
    position: relative;
    margin: 0 auto 10px auto;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: 2em;
      color: $customTextColor-white;
    }
    &:after {
      content: '';
      width: 200px;
      border-bottom: 5px solid $customBtnTextColor;
      position: absolute;
      margin: 20px auto;
      bottom: -50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 768px) {
        margin: 1px auto;
        bottom: -30%;
        border-bottom: 3px solid $customTextColor-white;
      }
    }
  }
}
.stepper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  ul {
    display: flex;
    justify-content: space-around;
    position: relative;
    padding: 0;
    &:before {
      content: "";
      position: absolute;
      bottom: -30px;
      left: 0;
      width: 100%;
      border-top: 3px solid $customBtnTextColor;
      @media screen and (max-width: 768px) {
        bottom: -10px;
        border-top: 3px solid $customTextColor-white;
      }
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
      padding: 0;
      width: 100%;
    }
  }

  li {
    width: 200px;
    background: $customTextColor;
    border-radius: 15px;
    padding: 20px 0;
    font-size: 1em;
    text-align: center;
    line-height: 30px;
    color: white;
    list-style: none;
    margin: 0;
    &:nth-child(4) {
      background-color: $customLightGray;
    }
    @media screen and (max-width: 768px) {
      font-size: 1em;
      padding: 1px;
      margin: 10px;
      border-radius: 0;
      width: 80%;
    }
  }

  .arrowIconRight {
    position: relative;
    font-size: 3em;
    top: 10px;
    margin: 0 30px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .arrowIconDown {
    display: none;
    margin: 0 30px;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1em;
    }
  }
}
.text-control{
  @media screen and (max-width: 768px) {
    margin: 3px 10px;
    font-weight: bolder;
    color: $customTextColor-white;
  }
}
.form-control {
  @media screen and (max-width: 768px) {
    width: 80%;
    margin: 0 0 0 60px;
  }
}
.text-end {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  @media screen and (max-width: 768px) {
    margin: 5px 0;
  }
  .btn {
    margin: 0 1.5em;
    @media screen and (max-width: 768px) {
      border-color: white;
      color: white;
    }
  }
}

</style>
