<template>
    <div class="swiper-container" :class="cName">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
export default {
  props: ['cName'],
  methods: {
       
  }
}
</script>
<style lang="scss" scoped>
  
</style>