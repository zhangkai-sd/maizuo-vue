<template>
     <div >
      <ul>
       <!--  <router-link
          tag='li'
          v-for='data in dataList'
          :key='data.filmId'
           :to='"/detail/"+ data.filmId'
        >
        <filmItem :data='data' type='comingsoon'></filmItem>
        </router-link> -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- <van-cell v-for= "data in dataList" :key="data.filmId" :title="data.name" ></van-cell> -->
       <router-link
          tag='li'
          v-for='data in dataList'
          :key='data.filmId'
           :to='"/detail/"+ data.filmId'
        >
        <filmItem :data='data' type='comingsoon'></filmItem>
        </router-link>
      </van-list>
      </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import { List, Cell } from 'vant'
import { instance } from '@/utils/http'
import filmItem from '@/components/filmItem'
import { mapState } from 'vuex'
Vue.use(List).use(Cell)
export default {

  data () {
    return {
      dataList: [],
      finished: false,
      loading: false,
      pageNum: 1
    }
  },
  created () {
  /*   instance.get('/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=1161682', {
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res)
      this.dataList = res.data.data.films
    }) */
  },
  components: {
    filmItem
  },
  methods: {

    onLoad () {
      console.log('aaa')
      instance.get('/gateway?cityId=' + this.cityId + '&pageNum=' + this.pageNum + '&pageSize=10&type=2&k=1161682', {
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        console.log(res)
        this.dataList = this.dataList.concat(res.data.data.films)
        this.loading = false
        if (this.pageNum * 10 >= res.data.data.total) {
          this.finished = true
        }
        this.pageNum++
      })
    }
  },
  computed: {
    ...mapState('city', ['cityId'])
  }
}
</script>

<style lang='scss' scoped>
     li{
    padding: 0.1rem;
    display: flex;
    font-size: 13px;
    color: #797d82;
    img{
      width: 0.66rem;
      height: 0.9rem;
    }
    h4{
      font-size:0.16rem ;
     color: black;
     padding-bottom: 0.2rem;
     .filmType{
        font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
     }
    }
  }
   .content{
    margin-left:0.1rem ;
    .actors{
       width:2.2rem;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
   }
</style>
