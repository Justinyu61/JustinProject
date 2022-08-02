<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="col-md-5">
      <div class="sticky-top">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key=item.id>
              <td style="width: 200px">
                <div
                  style="height: 100px;background-size: cover; background-position: center"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                ></div>
              </td>
              <td>{{ item.title }}</td>
              <td>
                <div v-if="!item.price">{{ $filters.currency(item.origin_price) }}</div>
<!--                <div v-if="item.price">原價 {{ $filters.currency(item.origin_price) }}</div>-->
<!--                <div v-if="item.price">現在只要 {{ $filters.currency(item.price) }}</div>-->
              </td>
              <td></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">199</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">199</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCart',
  data () {
    return {
      products: [],
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      const getProductsApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(getProductsApi)
        .then((res) => {
          console.log(res) // ok
          this.products = res.data.products
          this.isLoading = false
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
