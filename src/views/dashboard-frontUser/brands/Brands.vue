<template>
  <div class="wrap">
    <div class="banner">
      <div class="banner__text">
        <h2>讓居家的時光<br>從休憩昇華成享受</h2>
      </div>
    </div>
    <SideCart/>
    <div class="container">
    <div class="showProduct">
      <template v-for="item in filterProducts" :key="item.id">
        <div class="showProduct__card" >
          <div class="showProduct__card--img">
            <a href="#" @click.prevent="viewMore(item.id)">
              <img :src="item.imageUrl" alt="">
            </a>
          </div>
          <div class="showProduct__footer">
            <div class="showProduct__footer--info">
              <p class="showProduct__footer--info--content">{{ item.category }}</p>
              <p class="showProduct__footer--info--title">{{ item.title }}</p>
              <div class="showProduct__footer--info--price">
                <p >NT: {{ item.origin_price }} 元</p>
              </div>
            </div>
            <div class="showProduct__footer--btn">
                          <button type="button" class="add-cart btn btn-outline-secondary" @click="addToCart(item.id)">
                            <font-awesome-icon class="spinner-color" :icon="['fas', 'spinner']" v-if="this.status.loadingItem === item.id"/>
                            <i class="bi bi-cart2" v-else></i>
                            加到購物車
                          </button>
            </div>
          </div>
<!--          <a class="nav-link" href="#" @click.prevent="logout">登出</a>-->
        </div>
      </template>
    </div>
    </div>
  </div>
</template>

<script>
import SideCart from '@/components/SideCart'

export default {
  name: 'BrandsView',
  data () {
    return {
      allProducts: [],
      products: [],
      brand: {},
      productCategory: '',
      filterProducts: [],
      status: {
        loadingItem: ''
      }
    }
  },
  components: {
    SideCart
  },
  inject: ['$httpMessageState', 'emitter'],
  watch: {
    productCategory () {
      this.filterBrands()
    }
  },
  methods: {
    getProducts (page = 1) {
      const getProductItemApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      // console.log('id:', this.id)
      this.isLoading = true
      this.$http.get(getProductItemApi)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            this.filterProducts = this.products
            this.productCategory = this.$route.query.productCategory
            console.log(this.productCategory)
            // this.$httpMsgState(res, '顯示')
            this.isLoading = false
          }
        })
    },
    filterBrands () {
      const getProductsApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(getProductsApi)
        .then((res) => {
          this.allProducts = res.data.products
          // console.log(res) // ok
          if (this.productCategory !== '') {
            this.filterProducts = this.allProducts.filter((item) => item.category === this.productCategory)
            console.log(this.filterProducts)
          } else {
            this.filterProducts = this.products
          }
          this.isLoading = false
        })
    },
    addToCart (id, qty = 1) {
      const addToCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      const toCary = { product_id: id, qty }
      this.$http.post(addToCartApi, { data: toCary })
        .then((res) => {
          // console.log('itemToCart', res)
          if (!res.data.success) {
            this.$httpMsgState(res, '加入購物車')
            this.isLoading = false
          }
          this.$httpMsgState(res, '加入購物車')
          this.emitter.emit('update-cart')
          // this.$router.push('/cart/cartPage')
        })
    }
  },
  created () {
    this.getProducts()
    this.filterBrands()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";
.wrap {
  height: auto;
  background: $customWrapBGColor;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
}

.banner {
  width: 100%;
  height: 65vh;
  background-image: url("../../../assets/image/jessica-delp-smNzhFQRktg-unsplash.jpg");
  background-size: cover;
  background-position: 50% 80%;
  background-repeat: no-repeat;
  opacity: 75%;
  position: relative;
  &__text {
    position: absolute;
    top: 30%;
    right: 10%;
    left: 5%;
    color: $customTextColor;
  }
  @media screen and (max-width: 768px) {
    height: 40vh;
  }
}

.container{
.showProduct {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: $customTextColor-white;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    background: $customBackground;
    justify-content: center;
    align-items: center;
  }

  &__card {
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;
    text-align: left;
    width: 24rem;

    &--img {
      width: 100%;
      transition: .3s ease-in-out;
      margin-bottom: 3px;

      &:hover {
        transform: scale(1.05);
      }

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;

    &--info {
      color: $customBtnTextColor;
      //margin: 0 80px;
      margin: 0 auto;

      @media screen and (max-width: 768px) {
        color: $customTextColor-white;
      }
      &--content {
        font-size: 1.2em;
        font-weight: bold;
        margin: 5px 0;
      }

      &--title {
        font-size: .8em;
        font-weight: bolder;
        margin: 0 0 20px 0;
      }

      &--price {
        margin: 20px 0;

        h6 {
          font-size: 1.5em;
          font-weight: bolder;
        }

        p {
          font-size: .9em;
        }
      }
    }

    &--btn {
      margin: 0 auto;
    }
  }

  .spinner-color {
    color: #0dcaf0;
  }
}
}
</style>
