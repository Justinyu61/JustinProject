<template>
  <Loading :active="isLoading"></Loading>
  <div class="wrap">
    <div class="product-img">
      <div class="product-title-img__img-place">
        <img :src="product.imageUrl" alt="">
      </div>
    </div>
    <div class="product-info">
      <h2>{{ product.content }}</h2>
      <p>{{ product.title }}</p>
      <br>
      <h3>{{ product.description }}</h3>
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
</template>

<script>
export default {
  name: 'ProductItem',
  data () {
    return {
      product: {},
      // 暫時強制寫入ID
      // id: '-N8SGAoLdPmoRP77xI5N',
      id: '',
      isLoading: false
    }
  },
  inject: ['emitter'],
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
          console.log(res)
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
@import "src/assets/helpers/customVariables";

.wrap {
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}

.product-img {
  //border: 1px solid $customGray;
  display: flex;
  justify-content: center;
  align-items: center;
  //width: 50%;
  &__img-place {
    display: flex;
    justify-content: center;
    width: 100%;
    img {
      width: 60%;
    }
  }
}

.product-info {
  //border: 1px solid $customGray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }

  h2 {
    text-align: center;
    position: relative;
    font-size: 1.8em;
    &:after {
      content: '';
      width: 100%;
      border-bottom: 2px solid #000;
      position: absolute;
      bottom: -10px;
      left: 0;
    }
  }

  p {
    font-size: 1.2em;
  }

  h3 {
    font-size: 1.5em;
  }

  h4 {
    font-size: 1.8em;
    color: $customGray-Blue;
  }

  &__btn-place {
    display: flex;
    margin: 10px 0;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 10px;
    }
  }
}
</style>
