<template>
  <div class="wrap">
    <div class="showProduct mt-4">
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
</template>

<script>
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
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
.showProduct {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &__card {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 12px;
    overflow: hidden;
    box-shadow: 0 0 5px $customGray;
    border-radius: 6px;
    text-align: center;
    &--img {
      display: flex;
      align-items: center;
      width: 100%;
      height: 300px;
      transition: .3s ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
      img{
        width: 80%;
        object-fit: cover;
      }
    }
  }
  &__info{
    &--content {
      font-size: 1em;
      font-weight: bold;
      margin: 5px 0;
    }
    &--title {
      font-size: .8em;
      font-weight: bolder;
      margin: 0 0 20px 0;
    }
    &--price {
      color: $customGray-Blue;
      margin: 20px 0;
      h6 {
        font-size: 1em;
        font-weight: bolder;
      }
      p {
        font-size: 1.2em;
      }
    }
  }
  &__footer{
    display: flex;
    justify-content: space-around;
    margin-bottom: 2em;
    .view-more, .add-cart{
      transition: .5s ease-in-out;
      &:disabled{
        opacity: 0.3;
      }
      &:hover {
        background-color: $customGray;
        color: white;
      }
    }
  }
  .spinner-color{
    color: #0dcaf0;
  }
}
</style>
