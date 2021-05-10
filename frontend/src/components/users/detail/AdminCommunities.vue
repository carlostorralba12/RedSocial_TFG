<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="750"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Comunidades Administradas
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Comunidades Administradas
        </v-card-title>

        <v-card-text>
            <div v-for="community in communities" :key="community._id">

                <template v-if="community.adminUser == idUser">

                    <v-card
                        class="mx-auto"
                        color="#26c6da"
                        dark
                        style="margin-bottom: 1%"
                    >

                        <v-card-title>
                            <CommunityAvatar v-bind:idCom="community._id"></CommunityAvatar>
                            
                        </v-card-title>

                        <v-card-actions>
                            <div class="community-actions">
                                <v-btn
                                    rounded
                                    color="info"
                                    dark
                                    :to="{ name: 'Community', params: {id: community._id } }"

                                    >
                                    Detalles
                                </v-btn>
                            </div>
                            

                        </v-card-actions>

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
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CommunityAvatar from '../../communities/CommunityAvatar'
import CommunityService from '../../../services/community.service'
  export default {
    name: 'AdminCommunities',
    props: ['idUser'],
    components: {
        CommunityAvatar
    },
    data () {
      return {
        dialog: false,
        communityService: new CommunityService(),
        userLogged: localStorage.getItem('idUser'),
        communities: []
      }
    },
     created(){
        var _this = this;
        this.communityService.getCommunities().then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else {
                    this.communities = res.communities;
                }   
            }
        });
    },
  }
</script>          
