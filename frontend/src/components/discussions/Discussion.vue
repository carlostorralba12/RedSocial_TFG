<template>
    <v-container>

         <v-card>

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

                   <div v-if="userRole == 'admin' || userId == adminCommunity">  <DeleteDiscussion/></div>
                  
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

                            <span>Comentarios</span>
                            <AddPost v-bind:idUser="userId"></AddPost>

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

                                            <UserAvatar v-bind:idUser="item.idUser"></UserAvatar>
                                            <div v-if="userRole == 'admin' || userId == item.idUser || userId == adminCommunity">
                                                 <DeletePost v-bind:idPost="item._id"></DeletePost>
                                            </div>
                                           
                                        </div>
                                        
                                    </v-card-title>
                                    <v-card-text class="title font-weight-bold">
                                        {{item.body}}
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
                        <span> Debates</span> 

                    </v-btn>

                    <div v-if="userRole == 'admin' || userId == adminCommunity">

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
import CommunityService from '../../services/community.service'
import UserAvatar from '../users/UserAvatar'
import AddPost from '../posts/AddPost'
import DeletePost from '../posts/DeletePost'
export default {
    name: 'Discussion',
    components: {
        UpdateDiscussion,
        DeleteDiscussion,
        UserAvatar,
        AddPost,
        DeletePost
    },
    data: () => ({
        pageNumber: 1,
        size: 3,
        lengthItemsPagination: 0,
        discussionsService: null,
        discussion: {},
        posts: [],
        idCom: null,
        adminCommunity: null,
        communityService: new CommunityService(),
        userRole: localStorage.getItem('role'),
        userId: localStorage.getItem('idUser')
    }),
    created(){
        this.idCom = this.$route.params.idCom;
        var idDis = this.$route.params.idDis;
        this.discussionsService = new DiscussionsService(this.idCom);
        var _this = this;

        this.communityService.getCommunity(this.idCom).then((res) => {
            if(res.message){
                alert(res.message);
            }
            else{
                console.log(res.community.adminUser);
                console.log(_this.userId);
                _this.adminCommunity = res.community.adminUser;
            }
        });
        this.discussionsService.getDiscussion(idDis).then((res) => {
             if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.discussion = res.discussion;
                    _this.posts = _this.discussion.posts;
                    var postsLength = _this.posts.length;
                    if(postsLength > 3){
                        if(postsLength % 3 == 0){
                            _this.lengthItemsPagination = parseInt(postsLength / 3);
                        }
                        else {
                            _this.lengthItemsPagination = parseInt(postsLength / 3) + 1;
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
            let l = this.posts.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
                end = start + this.size;
            return this.posts.slice(start, end);
        }
    }
}
</script>