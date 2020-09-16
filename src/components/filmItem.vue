<template>
  <div class="nowp">
       <img :src="data.poster" alt="">
        <div class="content">
          <h4>{{data.name}} <span class="filmType">{{data.filmType.name}}</span></h4>
          <p class="kong" v-if='type==="comingsoon"'></p>
        <p v-if='type==="nowplaying"'>观众评分：<span class="fen">{{data.grade}}</span></p>
        <p class="actors">主演：<span>{{data.actors | actios}} </span></p>
        <p  v-if='type==="nowplaying"'>中国大陆 | {{data.runtime}}分钟</p>
         <p v-if='type==="comingsoon"'>上映日期: <span>{{data.premiereAt}}</span></p>
        </div>
        <div class="ticket" v-if='type==="nowplaying"'>购票</div>
  </div>
</template>

<script>
export default {
  props: ['data', 'type']
}
</script>

<style lang='scss' scoped>
    .nowp{
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
    .fen{
      color: orange;

    }

  }

.ticket{
      line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border-radius: 2px;
    position: relative;
    }
    .ticket::after{
      content: " ";
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    position: absolute;
    border: 1px solid #ff5f16;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 4px;
    }

    .kong{
        height: 0.2rem;
    }
</style>
