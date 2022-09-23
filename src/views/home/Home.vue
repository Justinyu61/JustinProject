<template>
  <div class="wrap">
    <div class="main">
      <div class="banner"></div>
      <div class="introduction"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>

export default {
  name: 'Home-view',
  data () {
    return {
      brandDiptyque: [],
      brandBamford: [],
      brandMZ: []
    }
  },
  methods: {
    getProducts () {
      const getProductsApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(getProductsApi)
        .then((res) => {
          // console.log(res) // ok
          this.brandDiptyque = res.data.products.filter((products) => products.category === 'diptyque')
          this.brandDiptyque = res.data.products.filter((products) => products.category === 'bamford')
          this.brandDiptyque = res.data.products.filter((products) => products.category === 'MALIN+GOETZ')
          this.isLoading = false
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";
.wrap {
  //width: 100vw;
  width: 100%;
  height: 100vh;
  //background: $customBackground;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  width: 270px;
  height: 3000px;
  margin: 0 auto;
  //background: #000;
}
</style>
