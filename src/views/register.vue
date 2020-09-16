<template>
  <div>
      <div class="logo"><img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt=""></div>
     <form action="">
       <div class="content">
        <van-field class="input" v-model="username1" label="用户名"
        placeholder="请输入用户名"
        label-width='0.5rem'
        ></van-field>
         <van-field
         class="input"
          v-model="password1"
         label="密码"
         placeholder="请输入密码"
         label-width='0.5rem' >
         </van-field>
          <van-field
         class="input"
          v-model="password2"
         label="确认密码"
         placeholder="请输入密码"
         label-width='0.7rem' >
         </van-field>
          <van-button
          type="primary"
           color='#ff5f16'
           class="btn"
           @click='login'
           :disabled=isDis
          size="large"
          >注册</van-button>
       </div>
     </form>
<!--       <button @click='login'>登录</button> -->

  </div>
</template>

<script>
import vue from 'vue'
import { Button, Field, Cell, Dialog } from 'vant'
import axios from 'axios'
import { instance2 } from '@/utils/http'
vue.use(Button).use(Field).use(Cell).use(Dialog)
export default {
  data () {
    return {
      password1: '',
      username1: '',
      password2: '',
      disabled: true
    }
  },
  methods: {
    login () {
      instance2.post('/api/user/loginup', {
        username: this.username1, // '123',
        password: this.password1 // 'sss'
      }).then(res => {
        console.log(res)
        this.$router.push('/login')
      }).catch(res => {
        console.log('注册失败')
        // Dialog({ message: '用户名密码不正确' });
      
      })
    }
  },
  computed: {
    isDis () {
      // console.log(this.disabled)
      if (this.password1 && this.username1 && this.password1==this.password2) {
        return false
      } else {
        return true
      }
    }
  },
  created(){
     this.$nextTick(()=>{
          if(this.password1!=this.password2){
          Dialog.alert({
            title: '标题',
            message: '弹窗内容',
            theme: 'round-button',
            }).then(() => {
            // on close
            });

      }
     })
  }
}
</script>

<style lang='scss' scoped>
.logo{
  margin: 0.79rem auto 0.4rem;
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    img{
      width: 0.59rem;
      margin: auto;
    }
}
.content{
  padding: 0 0.25rem;
  .input{
    padding-top: 0.3rem;
  }
  .btn{
    margin-top: 0.7rem;
  }
}
</style>
