<template>
  <div>
    <ul >
      <van-list

       v-model="loading"
       :finished="finished"
       finished-text="没有更多了"
       @load="onLoad"
       offset=50
       >
        <router-link
          tag='li'
          v-for='(data) in dataList'
          :key='data.filmId'
          :to='"/detail/"+ data.filmId'
        >
         <transition name="app" mode="out-in">
        <filmItem :data='data' type='nowplaying' ></filmItem>
         </transition>
      </router-link>
       <!--  <van-cell
         v-for='data in dataList'
         :key='data.filmId'
         :title="data.name"
         ></van-cell> -->
      </van-list>
    </ul>
    <!--  <img src="https://static.oschina.net/uploads/img/201409/26073953_DP0i.gif" alt v-else /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { List, Cell } from 'vant'
import { instance } from '@/utils/http'
import filmItem from '@/components/filmItem'
import { mapMutations, mapState } from 'vuex'
Vue.use(List).use(Cell)
export default {

  data () {
    return {
      dataList: [],
      loading: false,
      finished: false,
      pageNum: 1
    }
  },
  created () {
    /*     instance
       .get("/gateway?cityId=310100&"+this.pageNum+"&pageSize=10&type=1&k=7998846", {
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      })
      .then((res) => {
        this.dataList = res.data.data.films;
        this.loading=false
        if(this.pageNum>= res.data.data.total){
          this.finished= true
        }
        this.pageNum++
      });  */
  },
  components: {
    filmItem
  },
  methods: {

    onLoad () {
     // console.log('aaa')
      instance.get('/gateway?cityId=' + this.cityId + '&pageNum=' + this.pageNum + '&pageSize=10&type=1&k=7998846', {
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
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
img {
  width: 100%;
}
ul {
  padding-bottom: 0.55rem;
}

.app-enter-active {
  animation: move 0.66s; //调用关键帧
}
.app-leave-active {
  animation: move 0.66s;
}
@keyframes move {
  //关键帧
  0% {
    transform: translateY(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
