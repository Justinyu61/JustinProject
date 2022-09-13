<template>
<!--  <div class="container-fluid">-->
<!--    <div class="row justify-content-center ">-->
<!--      <nav class="navbar navbar-expand-xl fixed-top navbar-dark bg-secondary  opacity-75 fs-6 ">-->
<!--        <router-link to="/" class="navbar-brand mx-4  text-white ">Logo</router-link>-->
<!--        <button class="navbar-toggler " type="button" @click="toggleHandler" >-->
<!--          <span class="navbar-toggler-icon" ></span>-->
<!--        </button>-->
<!--        <div class="collapse navbar-collapse "  ref="collapse">-->
<!--          <ul class="navbar-nav ms-auto  bg-secondary">-->
<!--            <li class="nav-item me-3 me-lg-2">-->
<!--              <router-link to="/" class="nav-link" @click="closeHandler">首頁</router-link>-->
<!--            </li>-->
<!--            <li class="nav-item me-3 me-lg-2">-->
<!--              <router-link to="/products/productsIndex" class="nav-link" @click="closeHandler">全部商品</router-link>-->
<!--            </li>-->
<!--            <li class="nav-item me-3 me-lg-2 position-relative">-->
<!--               <span class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">-->
<!--                  {{ cartList.length }}-->
<!--                </span>-->
<!--              <router-link to="/cart/cartPage" class="nav-link" @click="closeHandler">購物車</router-link>-->
<!--            </li>-->
<!--&lt;!&ndash;            <li class="nav-item  py-1 px-2">&ndash;&gt;-->
<!--&lt;!&ndash;              <router-link to="/user/aboutUs" class="nav-link">關於我們</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;          <a class="nav-link" href="#" @click.prevent="logout">登出</a>&ndash;&gt;-->
<!--&lt;!&ndash;            </li>&ndash;&gt;-->
<!--          </ul>-->
<!--        </div>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </div>-->
  <div class="container-fluid">
    <div class="row justify-content-center">
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-secondary opacity-75 fs-6">
        <router-link to="/" class="navbar-brand mx-4 text-white"> Logo </router-link>
        <button class="navbar-toggler" type="button" @click="toggleHandler">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" ref="collapse">
          <ul class="navbar-nav ms-auto bg-secondary">
            <li class="nav-item me-3 me-lg-2">
              <router-link to="/" class="nav-link" @click="closeHandler">首頁</router-link>
            </li>
            <li class="nav-item me-3 me-lg-2">
              <router-link to="/products/productsIndex" class="nav-link" @click="closeHandler">全部商品</router-link>
            </li>
            <li class="nav-item me-3 me-lg-2 position-relative">
              <span class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartList.length }}
              </span>
              <router-link to="/cart/cartPage" class="nav-link" @click="closeHandler">購物車</router-link>
            </li>
          </ul>
        </div>
  </nav>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/getEmitter'
import Collapse from 'bootstrap/js/dist/collapse.js'

export default {
  name: 'Navbar-view',
  data () {
    return {
      cartList: {},
      cart: {},
      navbar: '',
      collapse: ''
    }
  },
  methods: {
    getCartList () {
      const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(getCartApi)
        .then((res) => {
          // console.log('getCart:', res.data.data.carts)
          this.cartList = res.data.data.carts
        })
    },
    toggleHandler () {
      this.collapse.toggle()
    },
    closeHandler () {
      this.collapse.hide()
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
    emitter.on('update-cart', () => {
      this.getCartList()
    })
    this.collapse = new Collapse(this.$refs.collapse, { toggle: false })
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
  height: 11vh;
  padding:20px;
}
.navbar-brand{
  //font-family: 'Comforter Brush', cursive;
  font-size:2rem;
}
</style>
