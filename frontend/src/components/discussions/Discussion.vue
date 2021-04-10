<template>
    <v-container>

         <v-card style="margin: 0 5%">

            <v-img  max-height="450" src='../../assets/discussions.jpg'></v-img>

            <v-card-title>

                <div class="title-card">

                    <div class="title-logo">
                        <v-img
                            alt="Vuetify Logo"
                            class="shrink mr-2"
                            contain
                            :src="require('../../assets/iconoRadis.png')" 
                            transition="scale-transition"
                            width="45"
                        />

                        <span class="headline font-weight-bold">{{discussion.title}} </span>

                    </div>

                   <div v-if="userRole == 'admin'">  <DeleteDiscussion/></div>
                  
                </div>
               
            </v-card-title>

            <v-card-text>
                {{discussion.description}}

                <v-card
                    class="mx-auto"
                    color="teal darken-1"
                    dark
                    style="margin: 2%"
                >
                    <v-card-title>
                        
                        <div class="title-card">

                            <span>Posts</span>
                            <v-btn>Añadir</v-btn>

                        </div>
                        
                    </v-card-title>

                    <v-card-text>
                        <!--Array de posts-->
                    </v-card-text>

                </v-card>

            </v-card-text>

            <v-card-actions>

                <div class="title-card">

                    <v-btn
                        rounded
                        color="blue-grey lighten-3"
                        dark
                        :to="{ name: 'Discussions', params: {id: idCom } }"
                        
                    >
                        <v-icon
                            dark
                            left
                        >
                            mdi-arrow-left
                        </v-icon>
                        <span> Discusiones</span> 

                    </v-btn>

                    <div v-if="userRole == 'admin'">

                        <UpdateDiscussion v-bind:discussion="discussion"></UpdateDiscussion>

                    </div>

                </div>

            </v-card-actions>

         </v-card>

    </v-container>
</template>

<script>
import DiscussionsService  from '../../services/discussions.service'
import UpdateDiscussion from './UpdateDiscussion';
import DeleteDiscussion from './DeleteDiscussion';
export default {
    name: 'Discussion',
    components: {
        UpdateDiscussion,
        DeleteDiscussion
    },
    data: () => ({
        discussionsService: null,
        discussion: {},
        idCom: null,
        userRole: localStorage.getItem('role'),
    }),
    created(){
        this.idCom = this.$route.params.idCom;
        var idDis = this.$route.params.idDis;
        this.discussionsService = new DiscussionsService(this.idCom);
        var _this = this;
        this.discussionsService.getDiscussion(idDis).then((res) => {
             if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.discussion = res.discussion;
                }
            }
        });
    }
}
</script>