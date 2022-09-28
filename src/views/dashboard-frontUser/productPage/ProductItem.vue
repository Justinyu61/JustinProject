<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="container">
      <div class="productItem">
    <div class="product-img">
        <img :src="product.imageUrl" alt="">
    </div>
    <div class="product-info">
      <h2>{{ product.category }}</h2>
      <p>{{ product.title }}</p>
      <br>
      <h3>{{ product.description }}</h3>
      <span>{{ product.content }}</span>
      <br>
      <h4>售價 : {{ product.origin_price }} 元</h4>
      <div class="product-info__btn-place" v-if="product.price">
                <button type="button" class="btn btn-outline-secondary"
                        @click="returnProducts">
                  返回商品頁
                </button>
                <button type="button" class="btn btn-outline-danger "
                        @click="addToCart(product.id)">
                  加到購物車
                </button>
      </div>
    </div>
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
      product: {},
      id: '',
      isLoading: false
    }
  },
  provide () {
    return {
      emitter
    }
  },
  methods: {
    getProduct () {
      const getProductItemApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      // console.log('id:', this.id)
      this.isLoading = true
      this.$http.get(getProductItemApi)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product
            // this.$httpMsgState(res, '顯示')
            this.isLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    returnProducts () {
      this.$router.push('/products/productsIndex')
    },
    addToCart (id, qty = 1) {
      const addToCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      const toCary = { product_id: id, qty }
      this.$http.post(addToCartApi, { data: toCary })
        .then((res) => {
          // console.log('itemToCart', res)
          this.$httpMsgState(res, '加入購物車')
          this.isLoading = false
          // this.$router.push('/cart/cartPage')
        })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/pruductCss/productItem";
</style>
