<template>
    
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <!--BUTON HOME-->
      <v-btn class="d-flex align-center" height="50px" to="/">

        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('../../assets/RADIS.png')" 
          transition="scale-transition"
          width="100"
        />


      </v-btn>

      <v-spacer></v-spacer>

      <!--BUTON COMMUNITIES-->
      <v-btn class="d-flex align-center" height="50px" to="/communities">
        Comunidades
      </v-btn>
      <!--BUTON ADMIN-->
      <v-btn class="d-flex align-center" height="50px" to="/admin">
        Administración
      </v-btn>
 
      <v-btn
        class="button-register"
        color="primary"
        to="/register"
        v-if="!isAuthenticated()"
      ><i class="fas fa-user-plus" style="margin-right: 7%"></i> Regístrate</v-btn>

      <v-btn
        class="button-login"
        color="primary"
        to="/login"
        v-if="!isAuthenticated()"
      ><i class="fas fa-sign-in-alt" style="margin-right: 7%"></i> Accede</v-btn>

      <v-menu rounded=b-xl offset-y b-xl v-if="isAuthenticated()">

        <template v-slot:activator="{ on, attrs }">

          <div v-bind="attrs"
                v-on="on">
              <v-list-item-avatar size="50">

                <template v-if="image">
              
                  <v-img :src="'http://localhost:3000/api/image/show/' + user.image"></v-img>
                        
                </template>
        
                <template v-else>

                    <v-avatar color="indigo">
                  
                      <v-icon dark>

                        mdi-account-circle

                      </v-icon>
          
                  </v-avatar>

                </template>

              </v-list-item-avatar>
              <!--{{user.name}}-->


          </div>
          
        </template>
        
        <v-list>

          <v-list-item link>

            <v-list-item-title @click="toProfile()">Cuenta</v-list-item-title>

          </v-list-item>

           <v-list-item link>
            
            <v-list-item-title @click="logout()">Cerrar sesión</v-list-item-title>

          </v-list-item>
        </v-list>

      </v-menu>
     
    </v-app-bar>

</template>

<style lang="scss" scoped>
    @import './navbar.scss';
</style>

<script>
import UserService from '../../services/user.service';
export default {
    name: 'Navbar',
    data: () => ({
      user: {},
      image: false,
      userService: new UserService('user')
    }),
    created() {
        var _this = this;
        let token = localStorage.getItem('token');

        if(token != null){
            this.userService.getUser().then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else{
                        _this.user = res.user;
                        if(_this.user.image != null){
                            _this.image = true;
                        }
                    }
                }else {
                    alert(res.message);
                }
            });
        }
        
    },
    methods: {
      isAuthenticated(){
        let token = localStorage.getItem('token');
        if(token != null){
           return true
        }
        else{
          return false;
        }
      },
      logout() {
        localStorage.clear();
        window.location = '/login';
      },
      toProfile() {
         window.location = '/user/profile';
      }
    }
};
</script>