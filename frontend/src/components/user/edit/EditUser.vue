<template>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">

        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          style="margin-right: 1%"
          v-on="on"
        >
          Editar datos
        </v-btn>

      </template>

      <v-card>

       <v-card-title class="headline primary lighten-2">
          Editar datos
        </v-card-title>

        <v-card-text>

          <v-container>

            <div class="header-section">Obligatorios</div>

            <v-form v-model="obligatoryForm">

                <v-row>

                    <v-col>

                        <v-text-field 
                            v-model="user.name" 
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
                            v-model="user.surname"
                            :rules="nameRules"
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
                            v-model="user.email"
                            :rules="emailRules"
                            label="Email"
                            placeholder="carlos@gmail.com"
                            shaped
                            outlined
                            required
                        ></v-text-field>
                        
                    </v-col>

                </v-row>

                <v-radio-group
                    v-model="user.role"
                    row
                    :rules="roleRules"
                    required
                >
                    <v-col>
                        <v-radio
                            label="Médico"
                            value="medico"
                        ></v-radio>  
                    </v-col>

                    <v-col>
                        <v-radio
                            label="Paciente"
                            value="paciente"
                        ></v-radio>
                    </v-col>

                    <v-col>
                        <v-radio
                            label="Familiar"
                            value="familiar"
                        ></v-radio>
                    </v-col>

                </v-radio-group>

            </v-form>
            

            <div class="header-section">Opcionales</div>

             <v-row>

                <v-col>

                    <v-text-field 
                        v-model="user.country" 
                        label="País"
                        placeholder="España"
                        shaped
                        outlined
                    ></v-text-field>

                </v-col>

                <v-col>

                    <v-text-field
                        v-model="user.province"
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
                        v-model="user.city"
                        label="Localidad"
                        placeholder="San Fulgencio"
                        shaped
                        outlined
                    ></v-text-field>

                </v-col>

                <v-col>

                    <v-file-input
                        :rules="imageRule"
                        v-model="user.image"
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        label="Imagen"
                        shaped
                        outlined
                    ></v-file-input>

                </v-col>

            </v-row>

          </v-container>

        </v-card-text>

        <v-card-actions>

          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            :disabled="!obligatoryForm"
            @click="updateUser()"
          >
            Guardar
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

</template>

<style lang="scss" scoped>
    @import './editUser.scss';
</style>

<script>
import UserService from '../../../services/user.service';
  export default {
    name: 'EditUser',
    data: () => ({
        obligatoryForm: false,
        dialog: false,
        name: undefined,
        surname: undefined,
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
        password: undefined,
        rePassword: undefined,
        rules: {
            min: v => !!v && v.length >= 8 || 'Mínimo 8 caracteres',
            emailMatch: () => ("The email and password you entered don't match")
        },
        roleRules: [
            v => !!v || 'Debes seleccionar una opción'
        ],
        imageRule: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
        ],
        country: undefined,
        province: undefined,
        city: undefined,
        image: undefined,
        role: undefined,
        user: {},
        userService: new UserService('user')

    }),
     created() {
        var _this = this;
        this.userService.getUser().then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.user = res.user;
                }
            }else {
                alert(res.message);
            }
        });
    },
    methods: {
          updateUser() {
            const userToUpdate = JSON.stringify({
                name: this.user.name,
                surname: this.user.surname,
                email: this.user.email,
                password: this.password,
                country: this.user.country,
                province: this.user.province,
                city: this.user.city,
                role: this.user.role,
            });
            var _this = this;
            this.userService.updateUser(userToUpdate).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else {
                        //localStorage.clear();
                        this.$emit('clicked', true);
                        _this.dialog = false;
                    }
                }
            });
        }
    }
  }
</script>