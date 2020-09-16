<template>
 <div>
     <div class="search">
         <div>
              <span class="iconfont icon-search"></span>
         <input type="text" name="" id="search"  v-model="isShow">
         </div>
           <span @click="goback">取消</span>
         </div>

         <div>
     </div>
     <div class="distance">离你最近</div>
      <ul class="record" v-if='!isShow'>
          <li v-for='data in cinemaListfive'
          :key='data.cinemaId'
          >{{data.name}}</li>
      </ul>

    <cinemaList :change='searchCinemaList' v-if="isShow" class="searchlist"></cinemaList>

 </div>
</template>

<script>
import cinemaList from '@/components/cinemaList'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    cinemaList
  },

  data () {
    return {
      isShow: ''
    }
  },
  computed: {
    ...mapState('cinema', ['cinemaList']),
    ...mapGetters('cinema', ['cinemaListfive']),
    /*  cinemaListfive () {
      return this.$store.state.cinemaList.slice(0, 5)
    }, */
    searchCinemaList () {
      return this.cinemaList.filter(item => {
        // console.log(item.name)
        if (item.name.toLowerCase().includes(this.isShow.toLowerCase())) {
          return true
        }
        return false
      })
    }
  },
  created () {
    //console.log(this.cinemaList)
    this.hide()
    if (this.cinemaList.length === 0) {
      this.getCinemaList()
    }
  },
  
  methods: {
    goback () {
      this.$router.push('../cinema')
    },
    ...mapActions('cinema', ['getCinemaList']),
    ...mapMutations('bottom', ['hide', 'show'])
  },
  beforeDestroy () {
    this.show()
  }
}
</script>

<style lang='scss' scoped>
.search{
     height: 0.49rem;
      padding: 0.15rem;
      width: 100%;
  div{
      width: 90%;
      float: left;
      float: left;
          border-radius: 3px;
          background-color: #f4f4f4;
      .iconfont{
    position: absolute;
    left: 0.3rem;
    line-height: 30px;
    color: #797d82;
    z-index: 10;
    top: 0.08rem;
      }
      #search{
          width: 75%;
         height: 0.3rem;
          display: block;
            background-color: #f4f4f4;
            position: relative;
            left: 0.5rem;
            outline: none;
            border: 0;
      }

  }
  span{
         float: right;
    margin-top:0.07rem ;
  }

}

.distance{
    font-size: 13px;
    line-height: 13px;
    color: #bdc0c5;
    margin: 0.18rem 0.15rem;

}

.record{
    padding: 0 0.15rem;
    display: flex;
    flex-wrap: wrap;
    li{
        height: 30px;
    background-color: hsla(0,0%,96%,.6);
    line-height: 14px;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 13px;
    padding: 8px 12px;
    margin: 0.03rem;
    }
}


</style>
