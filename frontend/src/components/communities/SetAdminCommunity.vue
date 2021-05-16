<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Añadir Administrador
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
            Médicos
        </v-card-title>

        <v-card-text>

             <div  v-for="user in users" :key="user.id">

                <template v-if="user.role == 'medico'">
             
                    <v-card
                        class="mx-auto"
                        color="secondary"
                        dark
                        style="margin: 1%"
                    >
                        <v-card-title>

                            <v-list-item-avatar size="50">

                                <template v-if="user.image">
                                <v-img size="50" :src="'http://localhost:3000/api/image/show/' + user.image"></v-img>
                                </template>
                            
                                <template v-else>
                                    <v-avatar color="indigo" size="50">
                        
                                        <v-icon dark size="35">

                                            mdi-account-circle

                                        </v-icon>
                            
                                    </v-avatar>

                                </template>

                            </v-list-item-avatar>
                           
                            <span class="headline font-weight-bold"> {{user.name}}</span>
                              <v-btn
                                rounded
                                color="success"
                                dark
                                @click="setAdmin(user._id)"
                                style="margin: 0 0 0 auto"
                                >
                                Asignar
                            </v-btn>
                        </v-card-title>

                        <v-card-text>
                           
                            <span class="title font-weight-bold">{{user.role}}</span>
                          
                        </v-card-text>
                        
                    </v-card>
                    
                </template>
             </div>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import UserService from '../../services/user.service'
import CommunityService from '../../services/community.service'
  export default {
    name: 'SetAdminCommunity',
    props: ['idCom'],
    data () {
      return {
        dialog: false,
        users: [],
        userService: new UserService('users'),
        communityService: new CommunityService()
      }
    },
    created(){
        var _this = this;
        this.userService.getUsers().then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else {
                    _this.users = res.users;
                }
            }
        });
       
    },
    methods: {
        setAdmin(idUser){
            var _this = this;
            //this.dialog = false;
            const admin = JSON.stringify({
                admin: idUser
            });
            this.communityService.setAdminCommunity(this.idCom,admin).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else{
                        _this.dialog = false;
                        location.reload();
                    }
                }
            });
        }
    }
  }
</script>