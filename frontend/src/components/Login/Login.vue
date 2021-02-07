<template>
    
    <div class="login-wrapper">

        <v-container fluid fill-height>

            <v-layout align-center justify-center>

               <v-flex xs12 sm8 md4>

                  <v-card class="elevation-12">

                     <v-toolbar dark color="primary">

                        <v-toolbar-title class="header-auth">Inicia Sesión</v-toolbar-title>

                     </v-toolbar>

                     <v-card-text>

                        <v-form v-model="loginForm">

                           <v-text-field
                              prepend-icon="fas fa-user"
                              v-model="email"
                              :rules="emailRules"
                              label="Email"
                              type="text"
                              outlined
                              shaped
                           ></v-text-field>

                           <v-text-field
                              v-model="password"
                               :rules="[rules.min]"
                              prepend-icon="fas fa-lock"
                              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showPassword ? 'text' : 'password'"
                              label="Contraseña"
                              outlined
                              shaped
                              @click:append="showPassword = !showPassword"
                           ></v-text-field>

                        </v-form>

                     </v-card-text>

                     <v-card-actions class="buttons-footer"> 

                        <span>¿No estás registrado? <router-link to="register">Regístrate</router-link></span>
                        <v-btn color="accent" @click="login()" type="submit" :disabled="!loginForm">Acceder</v-btn>

                     </v-card-actions>

                  </v-card>
                  
                  <v-alert v-if="errorLogin" class="error-login" 
                     transition="scale-transition"
                     dismissible
                     dense 
                     type="error">
                     Email y contraseña incorrectos. Prueba otra vez...
                  </v-alert>
                  
               </v-flex>

            </v-layout>
            
         </v-container>

    </div>

</template>

<style scoped lang="scss">
  @import './login.scss';
</style>

<script>
 import AuthService from '../../services/auth.service';
export default {
   name: 'Login',
   data: () => ({
      errorLogin: false,
      loginForm: false,
      email: null,
      emailRules: [
         v => /.+@.+/.test(v) || 'El email debe ser válido'
      ],
      showPassword: false,
      showRePassword: false,
      password: null,
      rePassword: null,
      rules: {
         min: v => !!v && v.length >= 8 || 'Mínimo 8 caracteres',
         emailMatch: () => ("The email and password you entered don't match")
      },
      authService : new AuthService('login')
   }),
   methods: {
      login: function(){
            var user = JSON.stringify({
                email: this.email,
                password: this.password,
                //image: this.image
            })
            var _this = this
            this.authService.loginAndRegister(user).then(function(res){
                if(res){
                   if(res.message){
                      _this.errorLogin =  true;
                   }
                   else{
                      window.location = "http://localhost:8080/";
                   }
                }
                else{
                     _this.errorLogin = true;
                }
            });
            this.errorLogin = false;
                
        },
   }
    
}
</script>