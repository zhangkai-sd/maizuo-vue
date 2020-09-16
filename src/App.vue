<template>
  <div id="app">
    
    <transition name="app" mode="out-in">
    <router-view></router-view>
    </transition>
     <bottom v-if='isbottom'></bottom>
  </div>
</template>

<script>
import bottom from '@/components/bottom'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    bottom
  },
  computed: {
    ...mapState('bottom', ['isbottom'])
  }
}
</script>

<style lang="scss" >
  .app-enter-active{
    animation: move .66s;  //调用关键帧
  }
  .app-leave-active{
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
</style>
