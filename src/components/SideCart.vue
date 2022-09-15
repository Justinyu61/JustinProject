<template>
  <div class="small-cart-wrap">
    <div class="container">
      <div class="cartIcon">
      <button class="cartIcon__img" @click="sideCartToggle">
        <img src="../assets/image/shopping-cart1.png" alt="">
      </button>
      <button class="cartIcon__text" @click="sideCartToggle">
        查看<br />購物車
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
                XX購物車
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
</template>

<script>
import emitter from '@/methods/getEmitter'

export default {
  name: 'SideCart',
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
  methods: {
    getCart () {
      const getCartApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(getCartApi)
        .then((res) => {
          // console.log('getCartLen:', res.data.data.carts)
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
    }
  },
  created () {
    this.getCart()
    emitter.on('updateCart', (data) => {
      this.cart = data
    })
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";
.small-cart-wrap{
  background: #000;
  .container {
    margin: auto;
    max-width: 1200px;
    width: 100%;
    height: 100%;
  }
}
img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

.cartIcon:hover {
  .cartIcon__img {
    transform: perspective(1000px) rotateY(-180deg);
  }

  .cartIcon__text {
    transform: perspective(1000px) rotateY(0deg);
  }
}
.cartIcon__img,
.cartIcon__text {
  backface-visibility: hidden;
  transition: 1s ease-in-out;
  position: fixed;
  right: 10px;
  bottom: 120px;
  z-index: 2;
  border: none;
  width: 100px;
  height: 100px;
}
.cartIcon__img {
  background-color: transparent;
  transform: perspective(1000px) rotateY(0deg);

  @media screen and (max-width: 768px) {
    right: -10px;
    bottom: -10px;
    width: 80px;
    height: 80px;
  }
}
.cartIcon__text {
  //font-size: ;
  background-color: #554236;
  border-radius: 50%;
  color: white;
  line-height: 25px;
  transform: perspective(1000px) rotateY(180deg);
  opacity: 75%;
  @media screen and (max-width: 768px) {
    right: -10px;
    bottom: -10px;
    width: 80px;
    height: 80px;;
  }
}
.icon-num,.icon-null {
  position: fixed;
  right: 0;
  width: 35px;
  height: 35px;
  bottom: 190px;
  z-index: 2;
  border: none;
  background-color: $customCartNumColor;
  font-size: 1em;
  padding: 6px;
  color: white;
  border-radius: 50%;
  text-align: center;
  opacity: 75%;
  @media screen and (max-width: 768px) {
    bottom: 45px;
    right: 45px;
    width: 40px;
    height: 40px;
  }
}

.cart-wrap {
  width: 350px;
  height: 100%;
  background: $customBackground;
  position: fixed;
  top: 11vh;
  right: 0;
  z-index: 3;
  @media screen and (max-width: 768px) {
    overflow-y: auto;
  }

  .cart-container {
    width: 310px;
    margin: 50px 20px;
  }

  h2 {
    font-size: 2em;
    color: white;
    position: relative;
    margin-bottom: 50px;

    &:after {
      content: '';
      position: absolute;
      bottom: -25px;
      left: 0;
      width: 310px;
      border-bottom: 3px solid white;
    }
  }

  h3 {
    font-size: 1.2em;
    color: white;
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
    font-size: 3em;
    background: $customBackground;
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
      width: 30%;
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
    font-size: 1em;
    color: #000;
    padding-right: 10px;
  }

  h5 {
    font-size: 1em;
    color: #000;
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
      border-bottom: 3px solid white;
    }
  }

  .cart-checkout {
    border: none;
    border-radius: 10px;
    font-size: 1em;
    background-color: #B4A582;
    transition: .3s ease-in-out;
    text-align: center;
    padding: 10px 0;

    a {
      text-decoration: none;
      color: white;
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
