<template>
  <div class="home">
    <!--<div>{{item.title}}</div>-->
    <div>{{homeCount}}</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import homeStoreModule from '../store/modules/home'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  asyncData({store,route}){
    store.registerModule('home',homeStoreModule)
    return store.dispatch('home/inc')
    // return store.dispatch('fetchItem',route.params.id)
  },
  computed:{
    item(){
      return this.$store.state.items[this.$route.params.id]
    },
    homeCount(){
      return this.$store.state.home.count
    }
  },
  destroyed(){
    this.$store.unregisterModule('home')
  }
}
</script>
