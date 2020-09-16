<template>
    <div v-if='filmInfo  ' class="zong" >
        <!-- <router-view></router-view> -->
      <mz-title  v-title='50' @change='back2'>
        <span class="title-name">{{filmInfo.name}}</span>
      </mz-title>
    <div class="img-wrap"><img :src="filmInfo.poster"  class="img"></div>
    <div class="content">
      <h4>{{filmInfo.name}} <i>{{filmInfo.filmType.name}} </i> <span>{{filmInfo.grade}}</span></h4>
      <p>{{filmInfo.category}}</p>
      <p>{{filmInfo.premiereAt | time}}上映</p>
      <p :style='{height: txh+"px"}' style="transition:height 0.5s; overflow:hidden" :class="{text:bool}"><strong v-textHeight='{height:set}'>{{filmInfo.synopsis}}</strong></p>
      <p class="iconfont icon" @click="bool=!bool" :class="bool ? 'icon-moreunfold' : 'icon-less'"></p>
      <div class="actios">
      <h4 v-show="filmInfo.actors">演职人员</h4>
      <SwiperCom cName="act-banner" v-show="filmInfo.actors" class="actor-wrap">
        <div
        class="swiper-slide"
        v-for="(actor,index) in filmInfo.actors"
        :key="actor.name"
        v-swiper='{index: index,value: filmInfo.actors,slidesPerView: 4,cName: "act-banner"}'
        >
          <div class="actios-imgwrap"  @click="actimagebig(index)"> <img :src="actor.avatarAddress" class="actios-img"></div>
          <p class="name name-one">{{actor.name}}</p>
          <p class="name">{{actor.role}}</p>
        </div>
      </SwiperCom>
      <h4 v-show="filmInfo.photos">剧照 <b @click="isShow='true'">全部（{{filmInfo.photos && filmInfo.photos.length}}）<strong class="iconfont icon-more"></strong></b></h4>

      <SwiperCom cName='photos' v-show="filmInfo.photos">
        <div
        class="swiper-slide"
        v-for="(photo,index) in filmInfo.photos"
        :key="index"
        v-swiper='{index: index,value: filmInfo.photos,slidesPerView:2.5,cName: "photos"}'
       
        >
          <div class="photo-wrap"  @click="imagebig(filmInfo.photos,index)"> <img :src="photo" class="photo-img"></div></div>
      </SwiperCom>

    </div>
       <transition name='apps'>
    <photo v-if="isShow" >
      <div>
        <mz-title @change='back'>
        <span class="title-name">剧照</span>
      </mz-title>
        <div class="pho-jz">
        <img :src="pho" alt="" v-for='(pho,index) in filmInfo.photos' @click='imagebig(filmInfo.photos,index)'
        :key='index'
        >
        </div>
      </div>
    </photo>
     </transition>
    </div>
      <van-button type="primary" class="btns" color='#ff5f16' size="large" @click="goCinema" >选座购票</van-button>

    </div>
    <img src="http://static.oschina.net/uploads/img/201409/26073947_j9gz.gif" alt="" v-else class="gif">
</template>

<script>
import Vue from 'vue'
import SwiperCom from '@/components/swiper'
import { instance } from '@/utils/http'
import moment from 'moment'
import photo from './details/photo'
import { mapActions, mapMutations } from 'vuex'
import { Button,ImagePreview } from 'vant'
Vue.use(Button).use(ImagePreview)
Vue.filter('time', time => {
  const date = new Date(time * 1000)
  return moment(date).format('YYYY-MM-DD')
})

export default {
  directives: {
    textHeight (el, binding) {
      //  console.log(el.offsetHeight)
    // console.log( binding.value.height(70))
      binding.value.height(el.offsetHeight)
    }
  },
  methods: {
   imagebig(photo,index){
     ImagePreview({images:photo,
     startPosition:index, 
     closeable: true,
     closeIconPosition: 'top-left',
     closeIcon: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2790265655,369508182&fm=26&gp=0.jpg'
     });
     
   },
   actimagebig(index){
      ImagePreview({images:this.actphoto, startPosition: index});
   },
    back () {
      this.isShow = false
    },
    back2 () {
      this.$router.back()
    },
    set (height) {
      this.txh = height + 10
    },
    ...mapMutations('bottom', ['hide','show']),
   goCinema(){
     let id = this.$route.params.id
     console.log(id)
       this.$router.push('/detail/'+id+'/cinema')
     }
  },
  components: {
    SwiperCom,
    photo
  },
  data () {
    return {
      filmInfo: null,
      bool: true,
      isShow: false,
      txh: 0,
    actphoto: []
    }
  },
  created () {
    //console.log(this)
    this.hide()
    instance.get(`/gateway?filmId=${this.$route.params.id}&k=3443631`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      //console.log(res)
      this.filmInfo = res.data.data.film
    // console.log( res.data.data.film.actors)
      if(this.filmInfo.actors){
           this.actphoto=this.filmInfo.actors.map(item => {
       return item.avatarAddress
     });
      }
    
    // console.log(this.actphoto)
    })
   
  },

  beforeDestroy () {
    this.show()
  }
}
</script>

<style lang='scss' scoped>
.zong{
  padding-bottom: 0.38rem;
}
.img-wrap{
  width: 100%;
  height: 2.1rem;
  overflow: hidden;
}
.img{
  width: 100%;
}
.content{

  padding: 0.15rem;
h4{
  font-size: 0.18rem;
  i{
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
    display: inline-block;
  }
  b{
    float: right;
    font-size: 0.13rem;
    color: #797d82;
    strong{
      position: relative;
      top: 0.02rem;
      left: -0.05rem;
    }
  }
  span{
    float: right;
  color: #ffb232;
  font-style: italic;

  }
}
p{
  padding-top: 0.04rem;
}
.text{
  height: 0.38rem  !important;

}
.icon{
  width: 100%;
  text-align: center;
  line-height: 0.2rem;
}

.actios{
  h4{
    padding: 0.15rem 0;
    font-size: 0.16rem;
  }
  .actios-imgwrap{
    width: 0.85rem;
    height: 0.9rem;
    padding: 0.15rem 0;
    overflow: hidden;

    .actios-img{
    width: 0.85rem;
      position: relative;
    top: -50%;
  }
  }
  .name{
    text-align: center;
  }
  .name-one{
    padding-top: 0.1rem;
  }
}
 .photo-wrap{
  width: 1.5rem;
  padding: 0.1rem;
  height: 0.8rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  .photo-img{
  width: 100%;

}
}
.pho-jz{
  display: flex;
  flex-wrap: wrap;
  img{
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.05rem;
    position: relative;
    top: 0.48rem;
  }
}
}
.gif{
  width: 100%;
}
 .apps-enter-active{
    animation: move .66s;  //调用关键帧
  }
  .apps-leave-active{
    animation: move .66s reverse;
  }
  @keyframes move{  //关键帧
    0%{
      transform:translateY(40px);
      opacity: 0;
    }
    100%{
      transform: translateY(0px);
      opacity: 1;
    }
  }
  .btns{
    z-index: 100;
    position: fixed;
    bottom: 0;
  }

  /deep/.swiper-wrapper{
    padding: 0.2rem 0;
  }

  .actor-wrap{
    height: 1.4rem;
    
  }
</style>
