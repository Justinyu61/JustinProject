<template>

  <div class="header">
    <div class="header__hide-box">
      <Navbar/>
    </div>
    <div class="header__logo">
      <router-link to="/" >
<!--        <img src="../assets/image/1010_APOTHECARY_LOGO-OK-01.png" alt>-->
      </router-link>
    </div>
    <div class="header__mini-bar">
      <div class="mini-user">
        <button class="btn mini-user__img" >
        <font-awesome-icon :icon="['fas', 'user']"/>
        </button>
      </div>
      <div class="mini-cart">
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
          <div class="cart-wrap" >
            <div class="cart-container">
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
</template>

<script>
import emitter from '@/methods/getEmitter'
import Navbar from '@/components/Navbar'

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
      }
    }
  },
  components: {
    Navbar
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
    emitter.on('updateCart', (data) => {
      this.cart = data
    })
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.header{
  width: 100%;
  margin-bottom: 0;
  z-index: 900;
  //background: $customLightGray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  @media screen and (max-width: 768px) {
    height: 100px;
    margin: 5px 0;
  }
  &__hide-box {
    width: 30%;
    height: 110px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
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
        width: 90%;
      }
    }
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
      }
    }
    .mini-cart {
      position: relative;
      .icon-num,.icon-null {
        position: absolute;
        right: 10px;
        top: 8px;
        width: 21px;
        height: 21px;
        z-index: 2;
        border: none;
        background-color: $customCartNumColor;
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

.cart-wrap {
  width: 350px;
  height: 100%;
  background-color: $customLightGray;
  position: fixed;
  top: 155px;
  right: 0;
  z-index: 99999;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-y: auto;
  }

  .cart-container {
    width: 310px;
    margin: 60px 20px;
    @media screen and (max-width: 768px) {
      margin: 60px auto;
    }
  }

  h2 {
    font-size: 1.8em;
    position: relative;
    margin-bottom: 50px;

    &:after {
      content: '';
      position: absolute;
      bottom: -25px;
      left: 0;
      width: 310px;
      border-bottom: 3px solid #000;
    }
  }

  h3 {
    font-size: .9em;
    margin-top: 10px;
  }

  .cart-header a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 340px;
    width: 60px;
    height: 80px;
    font-size: 2em;
    background: $customLightGray;
    color: white;
    border-radius: 10px;
    @media screen and (max-width: 768px) {
      top: 0;
      right: 0;
      background-color: transparent;
    }

    svg {
      transition: .3s ease-in-out;
    }

    &:hover svg {
      transform: scale(1.2);
    }
  }

  .cart-item {
    display: flex;
    background-color: rgba($color: white, $alpha: .3);
    margin-bottom: 10px;
    transition: .3s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }

    .cart-photo {
      width: 32%;
      img {
        width: 100%;
      }
    }

    .cart-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 60%;
      .num {
        display: flex;
        margin: 10px 0;
        align-items: center;
      }
    }

    .cart-del {
      background-color: transparent;
      border: none;
      color: #CB4042;
      transition: .3s ease-in-out;

      &:disabled {
        opacity: .5;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  h4 {
    font-size: .7em;
    padding-right: 10px;
  }

  h5 {
    font-size: 1em;
  }

  .cart-footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    margin: 50px 0;

    &:before {
      content: '';
      position: absolute;
      top: -25px;
      left: 0;
      width: 310px;
      border-bottom: 3px solid #000000;
    }
  }

  .cart-checkout {
    border: 1px solid #000000;
    border-radius: 10px;
    font-size: 1em;
    transition: .3s ease-in-out;
    text-align: center;
    padding: 10px 0;

    a {
      text-decoration: none;
      color: #000000;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}

.sideCart-enter-active,.sideCart-leave-active {
  transition: .5s ease-in-out;
}

.sideCart-enter-from, .sideCart-leave-to {
  transform: translateX(500px);
}

.sideCart-enter-to {
  transform: translateX(0);
}

</style>
