<template>

    <div class="register-wrapper">

        <v-container fluid fill-height>

            <v-layout align-center justify-center>

                <v-flex xs12 sm8 md7>

                       <v-card class="elevation-12">

                            <v-toolbar dark color="primary" >

                                <v-toolbar-title class="header-auth">Registro</v-toolbar-title>

                            </v-toolbar>

                            <v-cart-text>

                                <div class="forms-wrapper">

                                    <!--OBLIGATORY DATA-->
                                    <div class="header-section">

                                        <span>Obligatorios</span>
                                        <v-btn color="secondary" @click="resetObligatory">Recargar formulario</v-btn>

                                    </div>

                                    <div class="data-form">

                                        <v-form v-model="obligatoryForm" ref="formObligatory">
                                            
                                            <v-container>

                                                <v-row>

                                                    <v-col>

                                                        <v-text-field 
                                                            v-model="name" 
                                                            :rules="nameRules"
                                                            :counter="10"
                                                            label="Nombre"
                                                            placeholder="Carlos"
                                                            shaped
                                                            outlined
                                                            required
                                                        ></v-text-field>

                                                    </v-col>

                                                    <v-col>

                                                        <v-text-field
                                                            v-model="surname"
                                                            :rules="nameRules"
                                                            :counter="10"
                                                            label="Apellidos"
                                                            placeholder="Torralba Ruiz"
                                                            shaped
                                                            outlined
                                                            required
                                                        ></v-text-field>

                                                    </v-col>

                                                </v-row>

                                                <v-row>

                                                    <v-col>

                                                        <v-text-field
                                                            v-model="email"
                                                            :rules="emailRules"
                                                            label="Email"
                                                            placeholder="carlos@gmail.com"
                                                            shaped
                                                            outlined
                                                            required
                                                        ></v-text-field>
                                                        
                                                    </v-col>

                                                </v-row>

                                                <v-row>

                                                    <v-col>

                                                        <v-text-field
                                                            v-model="password"
                                                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                            :rules="[rules.required, rules.min]"
                                                            :type="showPassword ? 'text' : 'password'"
                                                            label="Contraseña"
                                                            hint="Al menos 8 caracteres"
                                                            counter
                                                            outlined
                                                            shaped
                                                            @click:append="showPassword = !showPassword"
                                                        ></v-text-field>

                                                    </v-col>

                                                    <v-col>

                                                        <v-text-field
                                                            v-model="rePassword"
                                                            :append-icon="showRePassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                            :rules="[rules.required, rules.min, (password === rePassword) || 'La contraseña no coincide']"
                                                            :type="showRePassword ? 'text' : 'password'"
                                                            label="Repita la contraseña"
                                                            hint="Al menos 8 caracteres"
                                                            counter
                                                            outlined
                                                            shaped
                                                            @click:append="showRePassword = !showRePassword"
                                                        ></v-text-field>

                                                    </v-col>

                                                </v-row>

                                            </v-container>

                                        </v-form>

                                    </div>

                                    <!--OPTIONAL DATA-->
                                    <div class="header-section">

                                        <span>Opcionales</span>
                                        <v-btn color="secondary" @click="resetOptional">Recargar formulario</v-btn>
                                    </div>

                                    <div class="data-form">

                                        <v-form v-model="optionalForm" ref="formOptional">
                                            
                                            <v-container>

                                                <v-row>

                                                    <v-col>

                                                        <v-text-field 
                                                            v-model="country" 
                                                            label="País"
                                                            placeholder="España"
                                                            shaped
                                                            outlined
                                                        ></v-text-field>

                                                    </v-col>

                                                    <v-col>

                                                        <v-text-field
                                                            v-model="province"
                                                            label="Provincia"
                                                            placeholder="Alicante"
                                                            shaped
                                                            outlined
                                                        ></v-text-field>

                                                    </v-col>

                                                </v-row>

                                                <v-row>

                                                    <v-col>

                                                    <v-text-field
                                                            v-model="city"
                                                            label="Localidad"
                                                            placeholder="San Fulgencio"
                                                            shaped
                                                            outlined
                                                        ></v-text-field>

                                                    </v-col>

                                                    <v-col>

                                                    <v-file-input
                                                            :rules="imageRule"
                                                            v-model="image"
                                                            accept="image/png, image/jpeg, image/bmp"
                                                            prepend-icon="mdi-camera"
                                                            label="Imagen"
                                                            shaped
                                                            outlined
                                                        ></v-file-input>

                                                    </v-col>

                                                </v-row>

                                            </v-container>

                                        </v-form>

                                    </div>

                                    <div class="buttons-actions"> 

                                        <span>¿Ya estás registrado? <router-link to="login">Inicia sesión</router-link></span>
                                        <v-btn @click=registerUser() color="accent" type="submit" :disabled="!obligatoryForm">Registrarse</v-btn>
                                        
                                    </div> 
                                
                                </div>

                            </v-cart-text>

                        </v-card>

                </v-flex>

            </v-layout>

        </v-container>

    </div>

</template>

<style scoped lang="scss">
  @import './register.scss';
</style>

<script>

import AuthService from '../../services/auth.service'
export default {
    name: 'Register',
    data: () => ({
        obligatoryForm: false,
        optionalForm: false,
        name: null,
        surname: null,
        nameRules: [
            v => !!v || 'Este campo es obligatorio',
            v => !!v && v.length <= 10 || 'El nombre debe ser menor a 10 caracteres'
        ],
        email: null,
        emailRules: [
            v => !!v || 'Este campo es obligatorio',
            v => /.+@.+/.test(v) || 'El email debe ser válido'
        ],
        showPassword: false,
        showRePassword: false,
        password: null,
        rePassword: null,
        rules: {
            required: value => !!value || 'Esta campo es obligatorio',
            min: v => !!v && v.length >= 8 || 'Mínimo 8 caracteres',
            emailMatch: () => ("The email and password you entered don't match")
        },
        imageRule: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
        ],
        country: null,
        province: null,
        city: null,
        image: null,
        authService : new AuthService('register')
    }),
    methods: {
        registerUser: function(){
            var user = JSON.stringify({
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                country: this.country,
                province: this.province,
                city: this.city,
                //image: this.image
            })
            this.authService.loginAndRegister(user).then(function(res){
                if(res){
                    if(res.message){
                        alert('El email ya existe');
                    }
                    else{   
                        window.location = "http://localhost:8080/login";
                    }
                   

                }
                else{
                    window.alert('Registro incorrecto');
                }
            });
                
        },
        resetObligatory () {
            this.$refs.formObligatory.reset();
        },
        resetOptional () {
            this.$refs.formOptional.reset();
        }
                
    }

}

</script>
