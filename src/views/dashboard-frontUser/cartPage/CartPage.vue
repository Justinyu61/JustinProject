<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="container">
      <h2>購物車</h2>
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
    <div class="cartBody">
      <table class="table align-middle">
        <thead>
          <tr>
            <th ></th>
            <th width="300">品名</th>
            <th style="width: 120px">數量</th>
            <th >單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                <i class="bi bi-x"></i>
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control" min="1" @change="updateCartItem(item)" v-model.number="item.qty">
                <div class="input-group-text">/ {{ item.product.unit }}</div>
              </div>
            </td>
            <td class="text-end">

              <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
              {{ $filters.currency(item.final_total)}}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success" v-if="cart.final_total !== cart.total">折扣價</td>
            <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>
    <div class="linkBtn">
      <router-link class="btn linkBtn__returnProduct" to="/products/productsIndex">繼續購物</router-link>
      <router-link class="btn linkBtn__goCheck" to="/cart/userCheck">送出訂單</router-link>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'CartPage',
  data () {
    return {
      isLoading: false,
      cart: {},
      status: {
        loadingItem: ''// 讀取效果
      },
      coupon_code: ''
    }
  },
  methods: {
    getCart () {
      const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(getCartApi)
        .then((res) => {
          if (res.data.data.carts.length !== 0) {
            console.log('getCart:', res.data.data)
            this.cart = res.data.data
            this.isLoading = false
          } else {
            this.$router.push('/products/productsIndex')
          }
        })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const deleteItemApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(deleteItemApi)
        .then((res) => {
          // console.log('deleteItem', res)
          this.$httpMsgState(res, '產品移除')
          this.isLoading = false
          this.status.loadingItem = ''
          this.getCart()
        })
    },
    updateCartItem (item) {
      const updateCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(updateCartApi, { data: cart })
        .then((res) => {
          // console.log('update', res)
          this.status.loadingItem = ''
          this.getCart()
        })
    },
    addCouponCode () {
      const addCouponCodeApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const couponCode = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(addCouponCodeApi, { data: couponCode })
        .then((res) => {
          // console.log('coupon', res)
          this.$httpMsgState(res, '加入優惠券')
          this.getCart()
          this.isLoading = false
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";
.wrap {
  height: auto;
  background: $customWrapBGColor;
  @media screen and (max-width: 768px) {
  }
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background: $customBackground;
  @media screen and (max-width: 768px) {
    padding: 11vh 0 150px 0;
  }
  h2 {
    font-size: 3em;
    color: white;
    position: relative;
    margin-bottom: 10px;
    text-align: center;
    &:after {
      content: '';
      width: 200px;
      border-bottom: 5px solid white;
      position: absolute;
      bottom: -30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.stepper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  ul {
    display: flex;
    justify-content: space-around;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      border-top: 3px solid #ffffff;
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
    background: $customLightGray;
    border-radius: 15px;
    padding: 20px 80px;
    font-size: 1em;
    text-align: center;
    line-height: 30px;
    color: white;
    list-style: none;
    &:first-child {
      background-color: $customGray-Blue;
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
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .arrowIconDown {
    display: none;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1em;
    }
  }
}
.linkBtn {
  display: flex;
  justify-content: center;
  &__returnProduct{
  }
  &__goCheck{
    border: 1px solid black;
  }
}
</style>
