<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="stepper">
      <ul>
        <li>Step 1 <br>確認購物車</li>
        <li>Step 2 <br>填寫資料</li>
        <li>Step 3 <br>完成訂單</li>
      </ul>
    </div>
  <div class="col-md-6 container">
    <div class="sticky-top">
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

    &:first-child {
      background-color: $customGray-Blue;
    }
  }
}
</style>
