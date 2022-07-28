<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="previousBtn" :class="{ 'disabled' : this.nowPage <= 1 }">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{ 'active' : page === pages.current_page}">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextBtn" :class="{ 'disabled' : this.nowPage === pages.total_pages }">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  name: 'Pagination-view',
  props: ['pages'],
  data () {
    return {
      nowPage: 1
    }
  },
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page)
      this.nowPage = page
      // console.log(this.nowPage)
    },
    previousBtn () {
      if (this.nowPage === 1) {
        return this.nowPage
      } else {
        this.nowPage = this.nowPage - 1
        this.updatePage(this.nowPage)
      }
    },
    nextBtn () {
      if (this.nowPage === this.nowPage - 1) {
        return this.nowPage
      } else {
        this.nowPage = this.nowPage + 1
        this.updatePage(this.nowPage)
      }
    }
  }
}
</script>

<style scoped>

</style>
