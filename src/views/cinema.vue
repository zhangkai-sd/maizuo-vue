<template>
  <div>
     <div class="header">
         <div class="left" @click='toPath("/city")' >{{cityName}}</div>
        <div class="center">影院</div>
        <div class="iconfont icon-search" @click="toPath('/cinema/search')"></div>
     </div>

     <div class="cinema-list-tag">
       <div @click="isShow=!isShow" :class="{active: isShow}">{{districtName}}</div>
       <div>APP订票</div>
       <div>最近去过</div>
     </div>
       <van-loading size="24px" vertical
       class="load"
        v-show="cinemaList.length<=0"
        >加载中...</van-loading>
       <cinemaList :change='filterArea' class="searchlist"></cinemaList> 
   <!--   <div class="cinema-list">
       <ul>
         <li v-for='data in filterArea'
          :key='data.cinemaId'
         ><h4>{{data.name}}</h4>
          <p>{{data.address}}</p>
         </li>

       </ul>
     </div> -->
     
      <div class="area-box" v-if='isShow' >
       <ul>
         <li
         v-for='data in areaList'
         :key='data'
         @click='districtName=data,isShow=false'
         :class="{active: districtName== data}"
         >{{data}}</li>
       </ul>
     </div>

  </div>

</template>

<script>
import { instance } from '@/utils/http'
import cinemaList from '@/components/cinemaList'
import { mapState, mapActions, mapMutations } from 'vuex'
import Vue from 'vue'
import { Toast, Loading } from 'vant'
Vue.use(Toast).use(Loading)
export default {
  components: {
    cinemaList
  },

  methods: {
    toPath (path) {
      this.$router.push(path)
    },
    ...mapActions('cinema', ['getCinemaList']),
    ...mapMutations('city', ['setCityId']),
    ...mapMutations('cinema', ['setCinemaList'])
  },
  data () {
    return {
      districtName: '全城',
      isShow: false,
      clickCity: '',
      load: true
    }
  },
  created () {
    // console.log('cinemaList',this.cinemaList)
    /*     instance.get('/gateway?cityId=310100&ticketFlag=1&k=8779191',{
      headers:{
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res=>{
      console.log(res)
      this.cinemaList = res.data.data.cinemas
    }) */

    // this.$store.dispatch('getCinemaList')
    // console.log(this.$store.state.cinemaList)
    // this.cinemaList=this.$store.state.cinemaList
    if (this.cinemaList.length > 0) {
    } else {
      /*  Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:0
    }); */
      this.load = true
      this.getCinemaList(this.cityId).then(res => {
      // console.log(res)
      // Toast.clear();
        this.setCinemaList([])
      })
    }
  },
  computed: {
    ...mapState('city', ['cityName', 'cityId']),
    ...mapState('cinema', ['cinemaList']),
    areaList () {
      const arr = this.cinemaList.map(item => {
        return item.districtName
      })
      const arr1 = ['全城', ...Array.from(new Set(arr))]
      //console.log(arr1)
      return arr1
    },
    filterArea () {
      if (this.districtName === '全城') return this.cinemaList
      return this.cinemaList.filter(item => {
        if (item.districtName === this.districtName) {
          return true
        }
        return false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
 .header{
    display: flex;
    justify-content: space-between;
    height: 0.44rem;
    width: 100%;
    //line-height: 0.44rem;
    padding: 0.15rem;
    border-bottom: 1px solid #ededed;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 100;
    .center{
      font-size: 17px;
    }
  }

  .cinema-list-tag{
    display: flex;
    position: fixed;
    top: 0.44rem;
    left: 0;
    width: 100%;
    justify-content: space-around;
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #ededed;
    background: #fff;
    z-index: 10;
    div{
      flex: 1;
      text-align: center;
    }
  }
  .area-box{
    width: 100%;
    position: absolute;
    top: 0.88rem;
    background: #fff;
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 22%;
        margin: 0.055rem;
        text-align: center;
        border: 1px solid rgba(210,214,220,.5);

      }
    }

  }
  .active{
    color: orange;
  }

  .cinema-list{
    position: relative;
    top: 0.88rem;
    left: 0;
    z-index: 0;
    li{
      padding: 0.15rem;
      background: #fff;
      font-size: 15px;
      color: #18191a;

      p{
        max-width: 80%;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;

        margin-top: 0.05rem;
        font-size: 13px;
       color: #797d82;
      }
    }
  }

  .load{
    position: relative;
    top: 3rem;
   /*  transform: translateX(-50%);
    transform: translateY(-50%); */
    z-index: 100;
  }


  .searchlist{
  /deep/ .cinema-list{
    padding-top: 0.8rem;
  }
}
</style>
