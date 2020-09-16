<template>
   <ul class='border-1px'>
        <router-link v-for="item in list"
      :key="item.id"
      :to="item.path"
      tag="li"
      active-class="active"
      ><i class="iconfont" :class="item.icon"></i>
      {{item.title}}
      </router-link>
   </ul>

</template>

<script>
export default {
  data () {
    return {
      list: [
        { id: 1, title: '电影', path: '/films', icon: 'icon-all' },
        { id: 2, title: '影院', path: '/cinema', icon: 'icon-electronics' },
        { id: 3, title: '个人中心', path: '/center', icon: 'icon-account' }
      ]

    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/stylesheet/border-1.scss';
 ul{background: #fff;
    @include border-top(1px,#ccc);
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        height:0.5rem;
        display: flex;
        z-index: 10;
        li{
            flex:1;
            text-align: center;
            line-height:0.25rem;
            display: flex;
            flex-direction: column;

        }
    }
    .active{
        color:orange;
    }
</style>
