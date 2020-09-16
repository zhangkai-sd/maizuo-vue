<template>
   <div>
     <div class="cinema-list">
       <ul>
         <li v-for='data in change'
          :key='data.cinemaId'
         ><h4>{{data.name}}</h4>
          <p>{{data.address}}</p>
         </li>

       </ul>
     </div>
  </div>
</template>

<script>
export default {
  props: ['change']
}
</script>

<style lang='scss' scoped>

  .cinema-list{
    position: relative;
    top: 0;
    left: 0;
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

</style>
