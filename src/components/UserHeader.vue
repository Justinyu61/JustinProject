<template>
  <div class="container-fluid">
    <div class="row justify-content-center ">
      <nav class="navbar navbar-expand-xl fixed-top navbar-dark bg-secondary  opacity-75 fs-6 ">
        <router-link to="/" class="navbar-brand mx-4  text-white ">Logo</router-link>
        <button class="navbar-toggler " type="button" @click="toggleHandeler" >
          <span class="navbar-toggler-icon" ></span>
        </button>
        <div class="collapse navbar-collapse "  ref="collapse">
          <ul class="navbar-nav ms-auto  bg-secondary">
            <li class="nav-item me-3 me-lg-2">
              <router-link to="/" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item me-3 me-lg-2">
              <router-link to="/products/productsIndex" class="nav-link">全部商品</router-link>
            </li>
            <li class="nav-item me-3 me-lg-2 position-relative">
               <span class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger" v-if="cartList">
                  {{ cartList.length ? cartList.length : '' }}
                </span>
              <router-link to="/cart/cartPage" class="nav-link">購物車</router-link>
            </li>
            <li class="nav-item  py-1 px-2">
<!--              <router-link to="/user/aboutUs" class="nav-link">關於我們</router-link>-->
<!--          <a class="nav-link" href="#" @click.prevent="logout">登出</a>-->
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar-view',
  data () {
    return {
      cartList: {},
      cart: {}
    }
  },
  inject: ['emitter'],
  methods: {
    data () {
      return {
        navbar: '',
        collapse: ''
      }
    },
    getCartList () {
      const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(getCartApi)
        .then((res) => {
          // console.log('getCart:', res.data.data.carts)
          this.cartList = res.data.data.carts
        })
    },
    logout () {
      const logoutApi = `${process.env.VUE_APP_API}logout`
      // console.log(logoutApi)
      this.$http.post(logoutApi, this.user)
        .then((res) => {
          if (res.data.success) {
            // console.log(res)
            this.$router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.getCartList()
    this.emitter.on('update-cart', () => {
      this.getCartList()
    })
  },
  unmounted () {
    this.emitter.off('update-cart', () => {
      this.getCartList()
    })
  }
}
</script>

<style lang="scss" scoped>
*{
  padding:0;
  margin:0;
  box-sizing:border-box;
}
.navbar{
  height: 7vh;
  padding:20px;
}
.navbar-brand{
  font-family: 'Comforter Brush', cursive;
  font-size:2rem;
}
.little-cart {
  width: 1.4em;
}
</style>
