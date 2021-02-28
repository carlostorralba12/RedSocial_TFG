<template>

    <v-container>

        <v-card class="mx-auto" max-width="1000" tile>
            
            <v-img height="200" src="https://www.cedars-sinai.org/content/dam/cedars-sinai/blog/2019/02/RareDiseases.jpg"></v-img>

            <v-row class="user-info-container">

                <v-list-item class="">

                    <v-list-item-avatar size="200">

                        <template v-if="image">
                            <v-img size="200" :src="'http://localhost:3000/api/image/show/' + user.image"></v-img>
                        </template>
                       
                        <template v-else>
                             <v-avatar color="indigo" size="200">
                
                                <v-icon dark size="150">

                                    mdi-account-circle

                                </v-icon>
                    
                            </v-avatar>

                        </template>
                       

                    </v-list-item-avatar>

                    <v-list-item-content  style="margin-top:20px; text-transform: capitalize">

                        <v-list-item-title class="title">{{user.name }} {{user.surname}}</v-list-item-title>
                        <v-list-item-subtitle>{{user.role }}</v-list-item-subtitle>

                    </v-list-item-content>

                    <v-list-item-content style="text-align: right; margin-top: 20px">

                        <v-list-item-title class="title">{{user.email}}</v-list-item-title>
                        <div style="text-transform: capitalize">

                            <v-list-item-subtitle>{{user.country}}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{user.province}}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{user.city}}</v-list-item-subtitle>

                        </div>
                     

                    </v-list-item-content>

                </v-list-item>

                <v-col class="text-right">
                    
                    <EditUser @clicked="checkUpdate"/>
                    <!--DIALOG TO REMOVE ACCOUNT-->

                    <v-dialog
                        v-model="dialog"
                        width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="red lighten-2"
                            elevation="4"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            >
                                Eliminar cuenta
                            </v-btn>
                        </template>

                        <v-card>

                            <v-card-title class="headline red lighten-2" dark>
                                Eliminar cuenta
                            </v-card-title>

                            <v-card-text style="text-align: center; font-size: 16px; margin-top: 7px">
                                ¿Quieres darte de baja de nuestra web?
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>

                                <v-spacer></v-spacer>
                                 <v-btn
                                    color="secondary"
                                    text
                                    @click="dialog = false"
                                >
                                 Cancelar
                                </v-btn>

                                <v-btn
                                    color="primary"
                                    text
                                    @click="deleteUser()"
                                >
                                 Aceptar
                                </v-btn>


                            </v-card-actions>
                            
                        </v-card>

                    </v-dialog>

                </v-col>
                <div>
                     <v-alert
                        outlined
                        type="success"
                        text
                        dismissible
                        v-model="updated"
                    >
                        Ha modificado correctamente sus datos de usuario.
                    </v-alert>

                </div>
               
            </v-row>

        
        </v-card>
    
    
    </v-container>

</template>

<style scoped lang="scss">
    @import './profileUser.scss';
</style>

<script>
import UserService from '../../../services/user.service';
import ImageService from '../../../services/image.service';
import EditUser from '../edit/EditUser';
export default {
    name: 'ProfileUser',
    components: {
        EditUser
    },
    data: () => ({
        dialog: false,
        user: {},
        updated: false,
        image: false,
        imageService: null,
        imageUser: undefined,
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
                    _this.imageUser = _this.user.image;
                    if(_this.user.image != null){
                        _this.image = true;
                    }
                }
            }else {
                alert(res.message);
            }
        });
    },
    methods: {
        deleteUser() {
            // eliminamos la imagen de la base de datos
            if(this.imageUser != undefined){

                var _this = this;
                this.imageService = new ImageService(this.imageUser);
                this.imageService.getImage().then((res) => {
                    if(res){
                        _this.imageService = new ImageService(res.image._id);
                        _this.imageService.deleteImage();
                    }
                    else {
                        alert('No se ha obtenido ninguna imagen');
                    }
                });
            }
            this.userService.deleteUser().then((res) => {
                if(res){
                    if(res.message){
                        alert(message);
                    }
                    else {
                        localStorage.clear();
                        window.location = '/';
                    }
                }
            });
        },
        checkUpdate(value) {
            if(value){
                this.updated = value;
                var _this = this;
                this.userService.getUser().then((res) => {
                    if(res){
                        if(res.message){
                            alert(res.message);
                        }
                        else{
                            _this.user = res.user;
                            alert("Usuario actualizado");
                            location.reload();
                        }
                    }else {
                        alert(res.message);
                    }
                });
            }
            //this.updated = false;
           
        }
    }
}
</script>