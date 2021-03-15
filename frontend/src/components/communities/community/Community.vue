<template>

    <v-container>
        
        <v-card>

            <v-img  max-height="300" src='../../../assets/Comunidad.jpg'></v-img>
            <v-card-title>

                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    :src="require('../../../assets/iconoRadis.png')" 
                    transition="scale-transition"
                    width="50"
                    />
                <span class="headline font-weight-bold">{{community.name}}</span>

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
                        color="info"
                        dark
                        >
                        Detalles
                    </v-btn>

                </div>

                <div>

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
import CommunityService from '../../../services/community.service'
export default {
    name: 'Community',
    data: () => ({
        community: {},
        communityService: new CommunityService()
    }),
    created(){
        var id = this.$route.params.id;
        console.log(id);
        var _this = this;
        this.communityService.getCommunity(id).then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.community = res.community;
                    console.log(res.community);
                }
            }
        });
    }
}
</script>