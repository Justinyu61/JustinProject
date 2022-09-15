<template>
  <div class="wrap">
    <div class="banner">
      <div class="banner__text">
        <h2>讓居家的時光<br>從休憩昇華成享受</h2>
      </div>
    </div>
    <SideCart/>
    <div class="container">
    <div class="showProduct ">
      <template v-for="item in products" :key="item.id">
      <div class="showProduct__card" style="width: 18rem;">
        <div class="showProduct__card--img">
        <a href="#" @click.prevent="viewMore(item.id)">
        <img :src="item.imageUrl" alt="">
        </a>
        </div>
        <div class="showProduct__info">
          <p class="showProduct__info--content">{{ item.category }}</p>
          <p class="showProduct__info--title">{{ item.title }}</p>
        <div class="showProduct__info--price">
          <h6>價格</h6>
          <p >NT: {{ item.origin_price }} 元</p>
        </div>
        </div>
        <div class="showProduct__footer">
          <button type="button" class="view-more btn btn-outline-secondary" @click="viewMore(item.id)">
            <font-awesome-icon :icon="['fas', 'search']"/>
            查看更多
          </button>
          <button type="button" class="add-cart btn btn-outline-secondary" @click="addToCart(item.id)">
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
import SideCart from '@/components/SideCart'
export default {
  name: 'ProductItem',
  data () {
    return {
      products: [],
      status: { // 對應的品項id
        loadingItem: ''
      }
    }
  },
  components: {
    SideCart
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
    viewMore (id) {
      this.$router.push(`/products/product/${id}`)
      // console.log('index:', id)
    },
    addToCart (id) {
      // console.log(id)
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
          this.status.loadingItem = ''
        })
    }
    // getCart () {
    //   const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
    //   this.$http.get(getCartApi)
    //     .then((res) => {
    //       console.log('getCart', res.data)
    //     })
    // }
  },
  created () {
    this.getProducts()
    // this.getCart()
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
  background-image: url("../../../assets/image/mediamodifier-V49ntT_Wusw-unsplash.jpg");
  background-size: cover;
  background-position: 50% 60%;
  background-repeat: no-repeat;
  opacity: 75%;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 40vh;
  }
  &__text {
    position: absolute;
    top: 30%;
    right: 10%;
    left: 5%;
    color: $customTextColor;
    @media screen and (max-width: 768px) {
      h2 {
        font-size: 1.2em;
      }
    }
  }
}

.container{
  padding: 0;
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
