<template>

    <v-container>
        
        <v-card>

            <v-img  max-height="300" src='../../../assets/Comunidad.jpg'></v-img>
            <v-card-title>

               
                <div class="title-card">
                    
                    <div class="title-logo">
                        <v-img
                            alt="Vuetify Logo"
                            class="shrink mr-2"
                            contain
                            :src="require('../../../assets/iconoRadis.png')" 
                            transition="scale-transition"
                            width="45"
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

                <div class="card-row">

                    <div class="card">
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

                    <div class="card">
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
                   <div class="card">
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
                    <div  class="card">
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

                    <v-btn
                        rounded
                        color="secondary"
                        dark
                    >
                        <v-icon left color="error">mdi-heart</v-icon>
                        
                        <span> Seguir</span> 
                        
                    </v-btn>

                </div>
            
            </v-card-actions>

        </v-card>

    </v-container>   
            
</template>

<style lang="scss">
    @import './community.scss';
</style>
<script>
import DeleteCommunity from '../DeleteCommunity'
import UpdateCommunity from '../UpdateCommunity'
import CommunityService from '../../../services/community.service'
export default {
    name: 'Community',
    components: {
        DeleteCommunity,
        UpdateCommunity
    },
    data: () => ({
        community: {},
        communityService: new CommunityService(),
        userRole: localStorage.getItem('role')
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
    }
}
</script>