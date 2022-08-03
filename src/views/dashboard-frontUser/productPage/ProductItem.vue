<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
      </article>
      <div class="col-4">
        <div class="h5" v-if="product.price">{{ product.origin_price }} 元</div>
        <hr>
        <button type="button" class="btn btn-outline-danger"
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
      // id: '-N8RuQkExvgSYPpdQUSb',
      id: '',
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      const getProductItemApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      console.log('id:', this.id)
      this.$http.get(getProductItemApi)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product
          }
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getProduct()
  }
}
</script>

<style scoped>

</style>
