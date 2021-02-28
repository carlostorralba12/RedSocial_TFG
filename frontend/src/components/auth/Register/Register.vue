<template>

    <div class="register-wrapper">

        <v-container fluid fill-height>

            <v-layout align-center justify-center>

                <v-flex xs12 sm8 md7>

                       <v-card class="elevation-12">

                            <v-toolbar dark color="primary" >

                                <v-toolbar-title class="header-auth">Registro</v-toolbar-title>

                            </v-toolbar>

                            <v-card-text>

                                <div class="forms-wrapper">

                                    <!--OBLIGATORY DATA-->
                                    <div class="header-section">

                                        <span>Obligatorios</span>
                                        <v-btn color="secondary" @click="resetObligatory">Recargar formulario</v-btn>

                                    </div>

                                    <div class="data-form">

                                        <v-form v-model="obligatoryForm" ref="formObligatory" v-on:submit.prevent="checkIfRecaptchaVerified">
                                            
                                            <v-container>

                                                <v-row>

                                                    <v-col>

                                                        <v-text-field 
                                                            v-model="name" 
                                                            :rules="nameRules"
                                                            :counter="15"
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

                                                <v-row>

                                                    <v-col>
                                                        <v-radio-group
                                                            v-model="role"
                                                            row
                                                            :rules="roleRules"
                                                            required
                                                        >
                                                            <v-radio
                                                                label="Médico"
                                                                value="medico"
                                                            ></v-radio>  
                                                        
                                                            <v-radio
                                                                label="Paciente"
                                                                value="paciente"
                                                            ></v-radio>

                                                            <v-radio
                                                                label="Familiar"
                                                                value="familiar"
                                                            ></v-radio>

                                                        </v-radio-group>

                                                    </v-col>

                                                    <!--RECAPTCHA-->
                                                    <v-col>
                                                        <vue-recaptcha sitekey="6LePvFAaAAAAAACpiPrRgyuK-NnVTL8TFq2M-ZH-" @verify="recaptchaVerified = true">
                                                        </vue-recaptcha>

                                                        <div style="color:red" v-if="showErrorRecaptcha">
                                                            <small>Este campo es obligatorio </small>
                                                        </div>
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
                                        <v-btn @click=registerUser() color="accent" type="submit" :disabled="!obligatoryForm">Enviar</v-btn>
                                        
                                    </div> 
                                
                                </div>

                            </v-card-text>

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

import AuthService from '../../../services/auth.service'
import ImageService from '../../../services/image.service'
import  VueRecaptcha  from 'vue-recaptcha'
export default {
    name: 'Register',
    components: {
        VueRecaptcha
    },
    data: () => ({
        obligatoryForm: false,
        optionalForm: false,
        recaptchaVerified: false,
        showErrorRecaptcha: false,
        name: null,
        surname: null,
        nameRules: [
            v => !!v || 'Este campo es obligatorio',
            v => !!v && v.length <= 15 || 'El nombre debe ser menor a 15 caracteres'
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
        roleRules: [
            v => !!v || 'Debes seleccionar una opción'
        ],
        imageRule: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
        ],
        country: null,
        province: null,
        city: null,
        image: null,
        role: null,
        authService : new AuthService('register'),
        imageService: new ImageService('store')
    }),
    methods: {
        registerApi (user) {
             this.authService.register(user).then(function(res){
                if(res){
                    if(res.message){
                        alert(res.message);
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
        registerUser () {
            const user = JSON.stringify({
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                country: this.country,
                province: this.province,
                city: this.city,
                role: this.role,
            });

            if(this.recaptchaVerified){
                if(this.image != null){
                    const formData = new FormData();
                    formData.append('image', this.image);
                    this.imageService.storeImage(formData);
                     const userImage = JSON.stringify({
                        name: this.name,
                        surname: this.surname,
                        email: this.email,
                        password: this.password,
                        country: this.country,
                        province: this.province,
                        city: this.city,
                        role: this.role,
                        image: this.image.name
                    });
                    this.registerApi(userImage);
                }
                else {
                    this.registerApi(user);
                }
            } else {
                this.showErrorRecaptcha = true;
                //window.alert('Selecciona el recaptcha');
            }
               
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
