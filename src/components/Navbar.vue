<template>
<!--  <nav class="navbar navbar-expand-md fixed-top " :class="{'navbar&#45;&#45;toggled': !isOpen}">-->
<!--    <div class="container-fluid">-->
<!--      <button-->
<!--        type="button"-->
<!--        class="navbar-toggler"-->
<!--        data-bs-toggle="collapse"-->
<!--        data-bs-target="#navbar1"-->
<!--        aria-controls="navbar1"-->
<!--        aria-expanded="false"-->
<!--        aria-label="Toggle navigation"-->
<!--      >-->
<!--        <span class="navbar-toggler-icon"></span>-->
<!--      </button>-->
<!--      <div class="collapse navbar-collapse" id="navbar1" >-->
<!--        <ul class="navbar-nav me-auto">-->
<!--          <li class="nav-item"><router-link to="/" class="nav-link" >最新消息</router-link></li>-->
<!--          <li class="nav-item"><router-link to="/" class="nav-link" >品牌</router-link></li>-->
<!--          <li class="nav-item"><router-link to="/" class="nav-link" >香氛小知識</router-link></li>-->
<!--          <li class="nav-item"><router-link to="/" class="nav-link" >關於我們</router-link></li>-->
<!--          <li class="nav-item"><router-link to="/" class="nav-link" >購物車</router-link></li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
<!--  </nav>-->
  <div class="nav-container" :class="{'navbar--toggled': !isOpen}">

  </div>
</template>

<script>
import emitter from '@/methods/getEmitter'

export default {
  name: 'Navbar-view',
  data () {
    return {
      isOpen: true
    }
  },
  mounted () {
    emitter.on('toggle-nav', isOpen => {
      this.isOpen = isOpen
      console.log('isOpen', this.isOpen)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/helpers/customVariables";

.navbar {
  margin-top: 100px;
@media screen and (max-width: 768px) {
  width: 30%;
  position: fixed;
  top: -70px;
  left: 20px;
}
ul {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
&:after{
   content: '';
   position: absolute;
   bottom: 0;
   width: 100%;
   margin: 0 auto;
   border-bottom: 4px solid #000;
 }
}
li {
  margin: 0 20px;
  font-size: 1.1em;
  font-weight: bolder;
}
}
</style>
