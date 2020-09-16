<template>
    <div>
        <div class="header">
            <van-nav-bar
            :title="'当前城市 -'+ cityName"
            left-arrow
            @click-left="onClickLeft"
            />
        </div>
        <div class="search">
            <form action="/">
            <van-search v-model="value" placeholder="输入城市或拼音"
            show-action
            
            background="#f4f4f4"
            class="inputs"
             />
            </form>
        </div>
        <div v-if="value">
          <ul class="searchuL">
            <li v-for="city in searchFilter"
            :key="city.cityId"
            @click="routers(city)"
            >
              {{ city.name }}
            </li>
          </ul>
        </div>
        <div v-else>
             <div class="recommend-city">
            <div class="hostCity">
              <p>热门城市</p>
              <ul>
                <li v-for="(city,index) in hotCity"
                :key='index'
                @click="routers(city)"
                >{{city.name}}</li>
              </ul>
            </div>
        </div>
     <div class="data">
        <van-index-bar :index-list="indexList">
        <div v-for='(data,index) in cities'
        :key='index'
        >
             <van-index-anchor :index='data.indexs'
             />
            <van-cell :title="item.name"  v-for="(item,index) in data.list"
             :key="index"
             @click='routers(item)'

             />
        </div>

         </van-index-bar>
    </div>
        </div>
        
    </div>

</template>

<script>
import Vue from 'vue'
import { instance } from '@/utils/http'
import { mapMutations, mapState } from 'vuex'
import { IndexBar, IndexAnchor, Cell, Form, NavBar, Search } from 'vant'
Vue.use(IndexBar).use(Cell).use(NavBar).use(Search)
Vue.use(IndexAnchor)
export default {
  data () {
    return {
      cities: [],
      indexList: [],
      value: '',
      hotCity: [],
      citylists: []
    }
  },
  computed: {
    ...mapState('city',['cityName']),
    searchFilter(){
    return this.citylists.filter(item=>{
    if (item.name.includes(this.value) || item.pinyin.includes(this.value.toLowerCase())) {
          return true
        }
        return false
      
    })
    }
  },
  created () {
    instance.get('/gateway?k=7228220', {
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
       //console.log(res.data.data.cities)
      this.filterCities(res.data.data.cities)
      this.citylists= res.data.data.cities
      //console.log(this.citylists)
    })
  },
  methods: {
    ...mapMutations('city', ['setCityName', 'setCityId']),
    ...mapMutations('cinema', ['setCinemaList']),
    routers (item) {
      this.$router.back()
      this.setCityName(item.name)
      this.setCityId(item.cityId)
      this.setCinemaList([])
    },
    offClickHandler(){
      this.$router.back()
    },
  
    onClickLeft () {
      this.$router.back()
    },
    filterCities (city) {
      const azArr = []
      const citylist = []
      // console.log("Z".charCodeAt())
      for (var i = 65; i <= 90; i++) {
        azArr.push(String.fromCharCode(i))
      }
      // console.log(azArr)
      // console.log(city)
      azArr.forEach(item2 => {
        const tempArr = city.filter(item => {
          return item.pinyin.substring(0, 1).toUpperCase() === item2
        })
        if (tempArr.length > 0) {
          citylist.push({
            indexs: item2,
            list: tempArr
          })
          this.indexList.push(item2)
        }
      })
      this.cities = citylist
      //console.log('list====>', this.cities)

    citylist.forEach(item=>{
      let arr=  item.list.filter(lists=>{
           if(lists.isHot === 1){
             return true
           }   
        })
      if(arr.length>0){
         this.hotCity.push(...arr)
      }
      
      })
      
    }
  },
  mounted(){
    let inputs=document.querySelector('.inputs')
   console.log( )
   let off=inputs.lastChild
   off.addEventListener('click',this.offClickHandler)
  },
  beforeDestroy(){
    document.removeEventListener('click',this.offClickHandler)
  }

}
</script>

<style lang='scss' scoped>
  /deep/.inputs{
      .van-search__content{
            background: #fff;
      }

    }

.recommend-city{
        background-color: #fff;
    padding-left: 15px;
    padding-top: 15px;
   .hostCity {
     p{
       height: 0.3rem;
       line-height: 0.3rem;
     }
     ul{
     height: 1.2rem;
     li{
       float: left;
       width: 0.94rem;
       height: 0.3rem;
       background: #f4f4f4;
      margin: 10px 7.5px;
      font-size: 14px;
      color: #191a1b;
      text-align: center;
      line-height: 0.3rem;
     }
   }
}
}
.searchuL{
  li{
      height: 0.44rem;
      line-height: 0.44rem;
  }
}

 
</style>
