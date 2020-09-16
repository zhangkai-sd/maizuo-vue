<template>
  <div class="photos">
     <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.photos{
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;

}
</style>
