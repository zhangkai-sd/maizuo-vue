<template>
  <div class="title-top"> <p class="circle"><i class="iconfont icon-back dayu" @click="goback"></i></p>  <slot></slot> </div>
</template>

<script>
export default {
  methods: {
    goback () {
      this.$emit('change')
    }
  }
}
</script>

<style lang='scss'>
.title-top{
  height: .44rem;
  line-height: .44rem;
  position: fixed;
  width: 100%;
  z-index: 10;
  transition: all 0.5s;
  text-align: center;
  .circle{
    width: 0.3rem;
    height: 0.3rem;
    background: #fff;
    border-radius: 50%;
    display: block;
    position: absolute;
    left:0.1rem;
    top: 0.05rem;
    font-size: 0.16rem;
      transition: all 0.5s;
    i{
      position: relative;
      top: -0.05rem;
      font-size: 0.18rem;
    }
        }

  }
</style>
