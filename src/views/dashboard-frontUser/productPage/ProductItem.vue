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
@import "src/assets/helpers/customVariables";

.wrap {
  width: 100vw;
  height: 100vh;
  background-color: $customWrapBGColor;
  padding-top: 10vh;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
}
.container {
  max-width: 1200px;
  width: 80%;
  color: $customTextColor;
  background: $customTextColor-white;
  //padding: 353.5px 20px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    background: $customBackground;
    width: 100%;
    height: auto;
    //padding-bottom: 78px;
  }
  .productItem {
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }

    .product-img {
      border: 1px solid $customGray;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      margin: 0 auto;

      img {
        width: 100%;
      }

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }

    .product-info {
      display: flex;
      justify-content: center;
      //align-items: center;
      flex-direction: column;
      width: 50%;
      margin: auto;
      @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0 auto;
        color: $customTextColor-white;
      }

      h2 {
        text-align: center;
        position: relative;
        //font-size: 1.8em;
        font-size: 3em;
        margin: 30px 0;

        &:after {
          content: '';
          width: 100%;
          border-bottom: 2px solid $customLightGray;
          position: absolute;
          bottom: -50px;
          left: 0;
          margin-bottom: 30px;
          @media screen and (max-width: 768px) {
            border-bottom: 2px solid $customWrapBGColor;
          }
        }
      }

      p {
        //font-size: 1.2em;
        font-size: 1.5em;
      }

      h3 {
        //font-size: 1.5em;
      }

      h4 {
        //font-size: 1.5em;
      }

      &__btn-place {
        display: flex;
        margin: 20px 0 57px 0;
        justify-content: center;
        align-items: center;

        .btn {
          margin: 0 1.5em;
          @media screen and (max-width: 768px) {
            border-color: white;
            color: white;
          }
        }
      }
    }
  }
}
</style>
