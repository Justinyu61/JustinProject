<template>
  <SideCart/>
  <div class="wrap">
    <div class="banner">
      <div class="banner__text">
        <h2>讓居家的時光<br>從休憩昇華成享受</h2>
      </div>
    </div>
    <div class="main">
      <div class="introduction1">
        <div class="introduction1__img1"></div>
        <div class="introduction1__info">
          <div class="introduction1__info--text">
            <h2>About diptyque</h2>
            <p>diptyque 為一當代、標誌性的香氛精品店，以前所未有的感官體驗，
               塑造生活的藝術與雅緻的奢華，而香氛、藝術與一切密不可分。
               自 1961 創立以來， diptyque 演繹自由精神，貫徹藝術創作，
               根植於愉悅的創造力、吸引力與充滿創意的邂逅。
            </p>
          </div>
          <div class="introduction1__info--btn">
            <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'diptyque'}}">
              了解更多
            </router-link>
          </div>
        </div>
      </div>
      <div class="introduction2">
        <div class="introduction2__img4"></div>
        <div class="introduction1__info">
          <div class="introduction1__info--text">
            <h2>About BAMFORD</h2>
            <span>品味英國貴族有機生活方式</span>
            <p>
              基於「有機不只有益於自然環境，也對我們的生活有極佳的正面影響，是真正的奢華。」的理念，Carole 女爵不僅長時間投入慈善活動，更於2002年成立了Daylesford Organic，以農場、店鋪、餐廳、烹飪教室等多元事業體，全方位地推廣有機飲食與文化。4年後正式開創Bamford，精彩演繹了有機理念如何擴張至生活風格及時尚領域。「Bamford的靈感源自於大自然，我們非常珍惜這世界上所有珍稀的自然產物，因此創造一系列能真正滋養身體、肌膚及心靈的天然植萃保養產品。」透過 Bamford ，Carole 積極推動天然植萃產品，致力於保持傳統工藝並將其傳承予下一代。
            </p>
          </div>
          <div class="introduction1__info--btn">
              <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'bamford'}}">
                了解更多
              </router-link>
          </div>
        </div>
        <div class="introduction2__img2"></div>
      </div>
      <div class="introduction3">
        <div class="introduction3__img3"></div>
        <div class="introduction1__info">
          <div class="introduction1__info--text">
            <h2>About MALIN+GOETZ</h2>
            <span>高效平衡的生活態度</span>
            <p>
              創辦人Matthew Malin 及 Andrew Goetz深信 less is more，以平衡概念簡化保養程序。 結合溫和有效的技術和天然成分，「溫和清潔」、「修復保濕」兩步驟，就能提供從頭到腳的完美平衡。 所有產品均不含防腐劑、不含香料、不含著色劑，不做任何動物測試，確保配方中不含任何對皮膚造成潛在刺激的成分，是品牌一貫的堅持。
            </p>
          </div>
          <div class="introduction1__info--btn">
              <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'MALIN+GOETZ'}}">
                了解更多
              </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <ul>
        <li style="--clr: #1877f2;">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-facebook-f"/>
          </a>
        </li>
        <li style="--clr: #ff0000;">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-youtube"/>
          </a>
        </li>
        <li style="--clr: #1da1f2;">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-twitter"/>
          </a>
        </li>
        <li style="--clr: #c32aa3;">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-instagram"/>
          </a>
        </li>
        <li style="--clr: #25d366;">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-whatsapp"/>
          </a>
        </li> <li style="--clr: #228b22;">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-line" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SideCart from '@/components/SideCart'
export default {
  name: 'Home-view',
  components: {
    SideCart
  },
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
  background: $customWrapBGColor;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
}
.banner {
  width: 100%;
  height: 65vh;
  background-image: url("../../assets/image/indexpage1.jpg");
  background-size: cover;
  background-position: 50% 90%;
  background-repeat: no-repeat;
  opacity: 75%;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 40vh;
  }
  &__text {
    position: absolute;
    top: 30%;
    right: 10%;
    left: 5%;
    color: $customTextColor;
    @media screen and (max-width: 768px) {
      h2 {
        font-size: 1.2em;
      }
      left: 40%;
    }
  }
  @media screen and (max-width: 768px) {
    height: 40vh;
  }
}
.main {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  background: $customBackground;
  display: flex;
  flex-direction: column;
  align-items: center;
  .introduction1,.introduction2,.introduction3 {
    width: 100%;
    margin: 30px;
    padding: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__img1,&__img2,&__img3,&__img4 {
      background-size: cover;
      background-repeat: no-repeat;
      margin: 0 1em;
      width: 38%;
      height: 500px;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    &__img1 {
      background-position: 30% 65%;
      background-image: url("../../assets/image/johanne-kristensen-bIVj1y37EJU-unsplash.jpg");
    }
    &__img2 {
      background-position: 40%;
      background-image: url("../../assets/image/BAMFORD.jpg");
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    &__img3 {
      background-position: 98%;
      background-image: url("../../assets/image/MALIN+GOETZ.jpg");
    }
    &__img4 {
      background-position: 40%;
      background-image: url("../../assets/image/BAMFORD.jpg");
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
      }
    }
    &__info {
      padding: 10px;
      margin: 0 auto;
      width: 48%;
      text-align: center;
      color: $customTextColor-white;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &--text {
        h2 {
          font-weight: 700;
          font-size: 1.5em;
          margin-bottom: 1.2em;
        }

        span {
          font-size: 1.2em;
          font-weight: 600;
        }

        p {
          font-size: 1em;
          line-height: 2em;
        }
      }
      &--btn{
        transition: .5s ease-in-out;
        .view-more {
          &:hover {
            background-color: $customBtnBGColor;
            color: $customBtnTextColor;
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      flex-direction: column;
      margin: 0;
    }
  }
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  @media screen and (max-width: 768px) {
    display: none;
  }
  ul{
    position: relative;
    display: flex;
    gap: 50px;
  }
  ul li{
    position: relative;
    list-style: none;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: .5s;
  }
  ul li:hover{
    z-index: 10000;
    transform: scale(.75);
  }
  ul li::before{
    content: '';
    position: absolute;
    inset: 30px;
    box-shadow: 0 0 0 10px var(--clr),0 0 0 20px $customBackground,0 0 0 22px var(--clr);
    transition: .5s;
  }
  ul li:hover::before{
    inset: 0;
  }
  ul li::after{
    content: '';
    position: absolute;
    inset: 0;
    background: $customBackground;
    transform: rotate(45deg);
  }
  ul li a{
    position: relative;
    text-decoration: none;
    color: var(--clr);
    z-index: 10;
    font-size: 2em;
    transition: .5s;
  }
  ul li:hover a{
    font-size: 3em;
    filter: drop-shadow(0 0 20px var(--clr))
    drop-shadow(0 0 40px var(--clr))
    drop-shadow(0 0 60px var(--clr));
  }
}

</style>
