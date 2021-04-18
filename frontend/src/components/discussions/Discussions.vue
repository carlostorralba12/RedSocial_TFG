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
                        <v-btn
                            rounded
                            color="orange darken-2"
                            dark
                            :to="{ name: 'Community', params: {idCom: community._id } }"
                        >
                            <v-icon
                                dark
                                left
                            >
                                mdi-arrow-left
                            </v-icon>
                            <span class="headline font-weight-bold">{{community.name}} </span>

                        </v-btn>
                       

                    </div>

                    <div v-if="userRole == 'admin'"><AddDiscussion/></div>
                    
                </div>
               
            </v-card-title>

            <v-card-text>
                
                <div v-for="item in paginatedData" :key="item._id">
                    <template>

                        <v-card
                            class="mx-auto"
                            color="blue-grey lighten-3"
                            dark
                            style="margin-bottom: 2%"
                        >
                            <v-card-title>

                                <div class="title-card">

                                    <span>{{item.title}} </span>

                                    <v-btn
                                        rounded
                                        color="info"
                                        dark
                                        :to="{ name: 'Discussion', params: {idCom: community._id, idDis: item._id} }"
                                        >
                                        Detalles
                                    </v-btn>

                                </div>
                                
                            </v-card-title>
                            <v-card-text class="title font-weight-bold">
                                {{item.description}}
                            </v-card-text>

                        </v-card>

                    </template>

                </div>
                
                    <div class="text-center">
                        <v-pagination
                        v-model="pageNumber"
                        :length="lengthItemsPagination"
                        :total-visible="7"
                        @input="nextPage"
                        circle
                        >
                        </v-pagination>                   
                    </div>

            </v-card-text>

         </v-card>


    </v-container>
</template>

<style lang="scss">
    @import './discussions.scss';
</style>

<script>
import CommunityService from '../../services/community.service'
import DiscussionsService from '../../services/discussions.service'
import AddDiscussion from './AddDiscussion'
export default {
    name: 'Discussions',
    components: {
        AddDiscussion
    },
    data: () => ({
        pageNumber: 1,
        size: 3,
        lengthItemsPagination: 0,
        community: {},
        communityService: new CommunityService(),
        discussionsService: null,
        discussions: [],
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
        this.discussionsService = new DiscussionsService(id);
        this.discussionsService.getDiscussions().then((res) => {
            if(res){
                 if(res.message){
                    alert(res.message);
                }
                else{
                    _this.discussions = res.discussions;
                    var discussionsLength = _this.discussions.length;
                    if(discussionsLength > 3){
                        if(discussionsLength % 3 == 0){
                            _this.lengthItemsPagination = parseInt(discussionsLength / 3);
                        }
                        else {
                            _this.lengthItemsPagination = parseInt(discussionsLength / 3) + 1;
                        }
                     
                    }
                }
            }
        });
    },
    methods: {
        nextPage(page) {
            this.pageNumber = page;
        }
    },
    computed: {
        pageCount() {
            let l = this.discussions.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
                end = start + this.size;
            return this.discussions.slice(start, end);
        }
    }
}
</script>