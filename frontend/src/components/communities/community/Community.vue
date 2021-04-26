<template>

    <v-container>
        
        <v-card>

            <v-img  max-height="300" src='../../../assets/Comunidad.jpg'></v-img>
            <v-card-title>

               
                <div class="title-card">
                    
                    <div class="title-community">
                        <v-img
                            alt="Vuetify Logo"
                            class="shrink mr-2"
                            contain
                            :src="require('../../../assets/iconoRadis.png')" 
                            transition="scale-transition"
                            width="60"
                        />

                        <span class="headline font-weight-bold">{{community.name}} </span>
                        <v-btn
                            rounded
                            color="blue-grey lighten-3"
                            dark
                            style="margin-left: 2%"
                            :to="{ name: 'Discussions', params: {idCom: community._id } }"
                            
                        >
                            <span> Debates</span> 
                            
                        </v-btn>
                    </div>
                    <DeleteCommunity v-if="userRole == 'admin'" v-bind:idCommunity="community._id"></DeleteCommunity>
                </div>
                
            </v-card-title>

            <v-card-text class="title font-weight-bold">
                {{community.description}}
                <div class="card-row">

                    <div class="card" v-if="community.symtoms">
                        <v-card
                            class="mx-auto"
                            color="#26c6da"
                            dark
                        >
                            
                            <v-card-title>Síntomas</v-card-title>
                            <v-card-text class="title font-weight-bold">
                                {{community.symtoms}}
                            </v-card-text>

                        </v-card>
                    </div>

                    <div class="card" v-if="community.causes">
                         <v-card
                            class="mx-auto"
                            color="#26c6da"
                            dark
                        >
                            <v-card-title>Causas</v-card-title>
                            <v-card-text class="title font-weight-bold">
                                {{community.causes}}
                            </v-card-text>
                        </v-card>
                    </div>
                    
                </div>
                <div class="card-row">
                   <div class="card" v-if="community.treatment">
                         <v-card
                            class="mx-auto"
                            color="#26c6da"
                            dark
                        >
                            <v-card-title>Tratamiento</v-card-title>
                            <v-card-text class="title font-weight-bold">
                                {{community.treatment}}
                            </v-card-text>
                        </v-card>
                    </div>
                    <div class="card" v-if="community.other">
                         <v-card
                            class="mx-auto"
                            color="#26c6da"
                            dark
                        >
                            <v-card-title>Otros</v-card-title>
                            <v-card-text class="title font-weight-bold">
                                {{community.other}}
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
                   
            </v-card-text>

            <v-card-actions>

                <div style="width: 100%">

                    <v-btn
                        rounded
                        color="orange darken-2"
                        dark
                        to="/communities"
                    >
                        <v-icon
                            dark
                            left
                        >
                            mdi-arrow-left
                        </v-icon>Comunidades
                    </v-btn>

                </div>

                <div v-if="userRole == 'admin'">

                    <UpdateCommunity v-bind:community="community"></UpdateCommunity>

                </div>

                <div v-else>

                   <template v-if="checkFollow">

                        <v-btn
                            rounded
                            color="error"
                            dark
                            @click="unfollowCommunity(community._id)"
                        >
                            <v-icon left color="secondary">mdi-heart-broken</v-icon>
                            
                            <span> Dejar de seguir</span> 
                            
                        </v-btn> 

                    </template>

                    <template v-else>

                        <v-btn
                            rounded
                            color="error"
                            dark
                            @click="followCommunity(community._id)"
                        >
                            <v-icon left color="secondary">mdi-heart</v-icon>
                            
                            <span> Seguir</span> 
                            
                        </v-btn> 
                        
                    </template>

                </div>
            
            </v-card-actions>

        </v-card>
        
  <v-footer padless v-if="community.orphaCode">
    <v-col
      class="text-center"
      cols="12"
    >

      Para más información accede a 
        <v-btn color="#d42c56" dark rounded :href="'https://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=ES&Expert=' + community.orphaCode" target="_blank">Orphanet</v-btn> 
    </v-col>
  </v-footer>


    </v-container>   
            
</template>

<style lang="scss">
    @import './community.scss';
</style>
<script>
import DeleteCommunity from '../DeleteCommunity'
import UpdateCommunity from '../UpdateCommunity'
import CommunityService from '../../../services/community.service'
import UserService from '../../../services/user.service';
export default {
    name: 'Community',
    components: {
        DeleteCommunity,
        UpdateCommunity
    },
    data: () => ({
        community: {},
        communityService: new CommunityService(),
        userRole: localStorage.getItem('role'),
        userService: new UserService('users/'),
        checkFollow: false,
        userLogged: localStorage.getItem('idUser')
    }),
    created(){
        var id = this.$route.params.id;
        var _this = this;
        this.communityService.getCommunity(id).then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.community = res.community;
                }
            }
        });
         
        this.userService.getUser(this.userLogged).then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                    
                }
                else{
                        
                    for(var community of res.user.communities){
                        
                        if(_this.community._id == community._id){
                            //console.log(community._id);
                            _this.checkFollow = true;
                            break;
                            
                        }
                    }

                }
            }
        });
          
    },
    methods:{
        unfollowCommunity(communityId){
            const communityToUnfollow = JSON.stringify({
                id: communityId
            });
            this.userService.unfollowCommunity(communityToUnfollow,this.userLogged).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else {
                        if(res.communities){
                            alert('Has dejado de seguir a la comunidad');
                            location.reload();
                        }
                      
                    }
                }
            });
        },
        followCommunity(communityId){
            const communityToFollow = JSON.stringify({
                id: communityId
            });
            this.userService.followCommunity(communityToFollow,this.userLogged).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else {
                        if(res.communities){
                            //alert('Has dejado de seguir al usuario');
                            location.reload();
                        }
                      
                    }
                }
            });
        },
    }
}
</script>