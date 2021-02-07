<template>
  <v-app>
    <!--NAVBAR-->
    <v-app-bar
      app
      color="primary"
      dark
    >
      <!--BUTON HOME-->
      <router-link class="d-flex align-center" to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

         <span class="hidden-sm-and-down" style="font-weight: bold; color: white"> RADIS</span>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        depressed
        elevation="13"
        to="register"
      >Registro</v-btn>

       <v-btn
        color="primary"
        depressed
        elevation="13"
        to="login"
      >Login</v-btn>
    </v-app-bar>

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

export default {
  name: 'App',
  data: () => ({
     
  }),
  components: {
    Footer
  }
}
</script>
