<template>
    <div>
         <div class="citychange" @click="goCity('/city')"  v-if="banners ? true : false "><span >{{cityName}}</span></div>
        <div class="header" v-scroll >
        <div class="leftHeader" @click="goCity('/city')">{{cityName}}</div>
        <div class="textHeader">电影</div>
        </div>
        <SwiperCom cName="films-banner" :change='cityName'  >
            <div
                class="swiper-slide"
                v-for="(banner,index) in banners"
                :key="banner.bannerId"
                v-swiper='{index: index,value: banners,cName: "films-banner",pag: true,loop: true}'
            >
              
                <img :src="banner.imgUrl" alt="">
            </div>
        </SwiperCom>
       <!--  <p>选项卡</p> -->
     
       
       <div class="nows" ref="nows">
          <router-link :to="{ name:'now'}" active-class='active'>正在热映</router-link>
        <router-link to="/films/comingsoon" active-class='active'>即将上映</router-link>
       </div>

        <!--通过router-view标签指明正在热映的位置-->
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import SwiperCom from '@/components/swiper'
import axios from 'axios'
import { instance } from '@/utils/http'
import { mapState } from 'vuex'
import { NavBar } from 'vant'
Vue.use(NavBar)
export default {
  components: {
    SwiperCom,
  
  },
  data () {
    return {
      banners: null,
    }
  },
  created () {
   
    instance.request({
      url: '/gateway?type=2&cityId=' + this.cityId + '&k=5723181',
      headers: {
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      //console.log('films======>', res.data.data)
      this.cityshow=res.config.url
      this.banners = res.data.data
    })
    
  },
  computed: {
    ...mapState('city', ['cityId','cityName']),
    ...mapState('cinema',['cinemaList']),
   
  },
  methods: {
    goCity(path){
     this.$router.push(path)
     
    },
   scrollHandler(e){
       let nows=this.$refs.nows
      // console.log('scroll')
     let scrollTop = document.documentElement.scrollTop 
      if(scrollTop>182){
        nows.style.position='sticky'
        nows.style.top='0.48rem'
     
      }else{
         nows.style.position=''
        nows.style.top='0'
    }
   }
   
  
  },
mounted(){
    document.addEventListener('scroll',this.scrollHandler)
     //console.log(this.cinemaList)
},
beforeDestroy(){
  document.removeEventListener('scroll',this.scrollHandler)
}

}

</script>

<style lang="scss" scoped>

    .swiper-slide{
        img{
            width:100%;
            height:1.9rem;
        }
    }
    /deep/ .swiper-pagination-bullet-active{
        background: #fff;
    }
    .nows{
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      display: flex;
      justify-content: space-around;
      font-weight: 600;
       background: #fff;
       z-index: 100;
 /*      position: fixed;
      top: 0;
      background: #fff; */
    }
    .active{
      color:orange
    }
    .header{
      width: 100%;
      height: 0.5rem;
      background: #fff;
      display: none;
      z-index: 100;
      //justify-content: space-around;
      align-items: center;
      position: sticky;
      top: 0;
      .leftHeader{
       margin-left: 0.2rem;
      }
      .textHeader{
     margin: auto;
      // text-align: center;
      transform: translateX(-0.2rem);
      font-size: 17px;
      }
    }

     .citychange{
  display: block;
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  background-color: (rgba($color: #000000, $alpha: 0.3));

  width: 0.51rem;
  height: 0.3rem;
  border-radius: 30%;
  text-align: center;
  line-height: 0.3rem;
  z-index: 100;
  span{
      color: #fff;
  }
}
</style>
