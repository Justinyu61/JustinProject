<template>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openModal()">
      新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ otem.title }}</td>
        <td class="text-right">
          {{ item.origin_price }}
        </td>
        <td class="text-right">
          {{ item.price }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="productModal" :product="tempProduct" @upDate-product="upDateProduct"></ProductModal>
</template>

<script>
import ProductModal from '@/components/ProductModal'
export default {
  name: 'Products-view',
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {}
    }
  },
  components: {
    ProductModal
  },
  methods: {
    getProducts () {
      const productsApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=:page`
      // console.log(productsApi)
      this.$http.get(productsApi)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            // console.log(res.data)
          }
        })
    },
    openModal () {
      this.tempProduct = {}
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    upDateProduct (item) {
      // this.tempProduct = item
      // const updateProductsApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      // const productComponent = this.$refs.productModal
      // this.$http.post(updateProductsApi, { data: this.tempProduct })
      //   .then((res) => {
      //     console.log(res)
      //     productComponent.hideModal()
      //     this.getProducts()
      //   })
      console.log(item)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
