<template>

  <v-app>
    
    <!--NAVBAR-->
    <Navbar/>

    <!--MAIN COMPONENTS CONTAINER-->
    <v-main>
       
      <router-view>
      </router-view>

    </v-main>
    
    <div class="footer-app">

      <Footer/>

    </div>

  </v-app>

</template>

<style scoped lang="scss">
  @import './styles/global.scss';
</style>

<script>
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

export default {
  name: 'App',
  data: () => ({
     
  }),
  components: {
    Footer,
    Navbar,
  }
}
</script>
