<template>
  <div class="wrap">
    <div class="banner">
      <div class="banner__text">
        <h2>讓居家的時光<br>從休憩昇華成享受</h2>
      </div>
    </div>
    <div class="container">
    <div class="showProduct ">
      <template v-for="item in products" :key="item.id">
      <div class="showProduct__card">
        <div class="showProduct__card--img">
        <a href="#" @click.prevent="viewMore(item.id)">
        <img :src="item.imageUrl" alt="">
        </a>
        </div>
        <div class="showProduct__info">
          <div class="infoBox">
          <p class="showProduct__info--content">{{ item.category }}</p>
          <p class="showProduct__info--title">{{ item.title }}</p>
          </div>
        <div class="showProduct__info--price priceBox">
          <h6>價格</h6>
          <p >NT: {{ item.origin_price }} 元</p>
        </div>
        </div>
        <div class="showProduct__footer">
          <button type="button" class="viewMore btn btn-outline-secondary" @click="viewMore(item.id)">
            <font-awesome-icon :icon="['fas', 'search']"/>
            查看更多
          </button>
          <button type="button" class="addCart btn btn-outline-secondary" @click="addToCart(item.id)">
            <font-awesome-icon class="spinner-color" :icon="['fas', 'spinner']" v-if="this.status.loadingItem === item.id"/>
            <i class="bi bi-cart2" v-else></i>
            加到購物車
          </button>
        </div>
      </div>
      </template>
    </div>
  </div>
  </div>
</template>

<script>
import emitter from '@/methods/getEmitter'

export default {
  name: 'ProductItem',
  data () {
    return {
      products: [],
      status: { // 對應的品項id
        loadingItem: ''
      },
      cart: {}
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      const getProductsApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(getProductsApi)
        .then((res) => {
          // console.log(res) // ok
          this.products = res.data.products
          this.isLoading = false
        })
    },
    getCart () {
      const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(getCartApi)
        .then((res) => {
          // console.log('getCart:', res.data.data.carts)
          this.cart = res.data.data
          this.isLoading = false
        })
    },
    viewMore (id) {
      this.$router.push(`/products/product/${id}`)
      // console.log('index:', id)
    },
    addToCart (id) {
      // console.log(id)
      this.isLoading = true
      const CartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(CartApi, { data: cart })
        .then((res) => {
          // console.log('addToCart', res)
          this.$httpMsgState(res, '加入購物車')
          this.isLoading = false
          this.status.loadingItem = ''
          emitter.emit('updateCart', this.cart)
        })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/pruductCss/sameCssForproduct";
@import "src/assets/css/pruductCss/producePage";
</style>
