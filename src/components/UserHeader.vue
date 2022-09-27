<template>

  <div class="header">
    <div class="header-container" :class="{'scroll-nav' : scrollNav}">
    <div class="header__hide-box">
    </div>
    <div class="header__logo">
      <router-link to="/" >
        <img src="../assets/image/1010_APOTHECARY_LOGO-OK-01.png" alt>
      </router-link>
    </div>
    <div class="header__mini-bar">
      <div class="mini-user">
        <button class="btn mini-user__img" >
        <font-awesome-icon :icon="['fas', 'user']"/>
        </button>
      </div>
      <div class="mini-cart" >
        <div class="container">
          <div class="cartIcon">
        <button class="btn cartIcon__img" @click="sideCartToggle">
        <font-awesome-icon :icon="['fas', 'bag-shopping']"/>
        </button>
        <div class="icon-num" v-if="cartLen !== 0">
          <p>{{ cartLen }}</p>
        </div>
        <div class="icon-null" v-else>
          <p>{{ cartLen }}</p>
        </div>
          </div>
        <transition name="sideCart" v-show="sideCart">
          <div class="cart-wrap">
            <div class="cart-container" >
              <div class="cart-header">
                <h2>
                  <font-awesome-icon :icon="['fas', 'cart-shopping']"/>
                  購物車
                </h2>
                <a href="#" @click.prevent="sideCartToggle">
                  <font-awesome-icon :icon="['fas', 'xmark']"/>
                </a>
              </div>
              <h3 v-if="cartLen === 0">購物車是空的喲!</h3>
              <div class="cart-item" v-for="item in cart.carts" :key="item.id">
                <div class="cart-photo">
                  <img :src="item.product.imageUrl" alt="">
                </div>
                <div class="cart-text">
                  <h3> {{ item.product.title }} </h3>
                  <div class="num">
                    <h4> {{ item.qty }} 件</h4>
                    <h4>NT {{ $filters.currency(item.total) }} 元</h4>
                  </div>
                </div>
                <button type="button" class="cart-del"  :disabled="this.status.loadingItem === item.id" @click="removeCartItem(item.id)">
                  <font-awesome-icon :icon="['fas', 'spinner']" v-if="this.status.loadingItem === item.id"/>
                  <font-awesome-icon :icon="['fas', 'trash-can']" v-else/>
                </button>
              </div>
              <div class="cart-footer" v-if="cartLen !== 0">
                <h4>小計</h4>
                <h5>$ {{ $filters.currency(cart.total) }}</h5>
              </div>
              <div class="cart-checkout" v-if="cartLen !== 0">
                <router-link to="/cart/cartPage">
                  <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                  結帳
                </router-link>
              </div>
            </div>
          </div>
        </transition>
        </div>
      </div>
    </div>
    </div>
    <div class="nav-container" >
      <nav class="navbar navbar-expand-lg navbar-light scroll-menu" >
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item"><router-link to="/" class="nav-link" >最新消息</router-link></li>
              <li class="nav-item"><router-link to="/products/productsIndex" class="nav-link" >全部商品</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link" >香氛小知識</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link" >關於我們</router-link></li>
              <li class="nav-item"><router-link to="/cart/cartPage" class="nav-link" >購物車</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/getEmitter'
// import Navbar from '@/components/Navbar'

export default {
  name: 'Navbar-view',
  data () {
    return {
      cartLen: 0,
      cart: {},
      products: [],
      product: {},
      sideCart: '',
      status: {
        loadingItem: ''
      },
      scrollNav: false, // 控制頁面高度
      screenWidth: '' // 頁面寬度
    }
  },
  methods: {
    getCartList () {
      const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(getCartApi)
        .then((res) => {
          // console.log('getCart:', res.data.data.carts)
          this.cart = res.data.data
          this.cartLen = res.data.data.carts.length
        })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const deleteItemApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(deleteItemApi)
        .then((res) => {
          // console.log('deleteItem', res)
          this.$httpMsgState(res, '產品移除')
          this.status.loadingItem = ''
          this.getCart()
        })
    },
    sideCartToggle () {
      this.sideCart = !this.sideCart
      // console.log(this.sideCart)
    },
    screenSize () {
      this.screenWidth = window.innerWidth
    },
    updateScroll () {
      const scrollPosition = window.scrollY
      // console.log(scrollPosition)
      if (scrollPosition > 50) {
        this.scrollNav = true
        return
      }
      this.scrollNav = false
    }
    // logout () {
    //   const logoutApi = `${process.env.VUE_APP_API}logout`
    //   // console.log(logoutApi)
    //   this.$http.post(logoutApi, this.user)
    //     .then((res) => {
    //       if (res.data.success) {
    //         // console.log(res)
    //         this.$router.push('/login')
    //       }
    //     })
    // }
  },
  created () {
    this.getCartList()
    this.screenSize()
    emitter.on('updateCart', (data) => {
      this.cart = data
    })
    window.addEventListener('resize', this.screenSize)
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";
@import "src/assets/css/navbar";
@import "src/assets/css/miniCart";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.header{
  width: 100%;
  height: auto;
  margin-bottom: 0;
  z-index: 900;
  background: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  @media screen and (max-width: 768px) {
    height: 70px;
  }
  &__hide-box {
    width: 30%;
    height: 110px;
    margin: 0 auto;
  }
  .header-container {
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
      height: 70px;
    }
  }
  &__logo {
    width: 40%;
    transition: all .3s;
    margin: 0 auto;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 274px;
        height: 110px;
        aspect-ratio: auto 274 / 110;
        object-fit: contain;
        max-height: inherit;
        transition: height .3s ease-in-out;
        //display: block;
        //margin: 0 auto;
        @media screen and (max-width: 768px) {
          width: 70%;
          margin: 0 auto;
        }
      }
    }
  }
  .scroll-nav {
    height: 70px;
  }
  &__mini-bar {
    width: 30%;
    height: 110px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .cartIcon, .mini-user {
      @media screen and (max-width: 768px) {
        width: 20%;
        height: 100px;
        margin: 0 5px;
      }
      &__img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border: none;
        margin: 0 10px;
        font-size: 2.2em;
        //color: white;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    .mini-cart {
      position: relative;
      .icon-num,.icon-null {
        position: absolute;
        right: 25px;
        top: 8px;
        width: 21px;
        height: 21px;
        z-index: 2;
        border: none;
        background-color: #CB4042;
        padding: 6px;
        color: white;
        border-radius: 50%;
        text-align: center;
        opacity: 75%;
        @media screen and (max-width: 768px) {
          right: 30px;
        }
        p {
          font-size: 1em;
          position: absolute;
          top: -1px;
          left: 6px ;
        }
      }
    }
  }
}

</style>
