<template>

    <v-container>

        <div class="header-communities">

            <h1>Comunidades</h1>

            <v-responsive max-width="400">
                <v-text-field
                dense
                flat
                hide-details
                rounded
                solo-inverted
                outlined
                ></v-text-field>
            </v-responsive>

        </div>
        
        <div v-if="userRole == 'admin'">
          
            <AddCommunity/>

        </div>
            
        <div class="body-communities" v-for="item in paginatedData" :key="item.id">

            <template>
                    
                <v-card
                    class="mx-auto"
                    color="#26c6da"
                    dark
                    style="margin:1%"
                >
                    <v-card-title>

                        <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        :src="require('../../assets/iconoRadis.png')" 
                        transition="scale-transition"
                        width="50"
                        />
                        <span class="headline font-weight-bold">{{item.name}}</span>
                        <div style="margin: 0 0 0 auto" v-if="userRole=='admin'">
                             <SetAdminCommunity v-if="!item.adminUser" v-bind:idCom="item._id" />
                             <v-btn
                                v-if="item.adminUser"
                                color="blue-grey"
                                class="ma-2 white--text"
                                @click="quitAdmin(item._id)"
                                >
                                Quitar Administrador
                             </v-btn>

                        </div>

                    </v-card-title>

                    <v-card-actions>

                        <div style="margin: 0 0 0 auto">

                            <v-btn
                                rounded
                                color="info"
                                dark
                                :to="{ name: 'Community', params: {id: item._id } }"

                                >
                                Detalles
                            </v-btn>

                        </div>
                    
                    </v-card-actions>

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
          
    </v-container>
 
</template>

<style scoped lang="scss">
    @import './communities.scss';
</style>

<script>
import AddCommunity from './AddCommunity';
import DeleteCommunity from './DeleteCommunity';
import CommunityService from '../../services/community.service';
import UserService from '../../services/user.service';
import SetAdminCommunity from './SetAdminCommunity';
export default {
    name: 'Communities',
    components: {
        AddCommunity,
        DeleteCommunity,
        SetAdminCommunity
    },
    data: () => ({
        pageNumber: 1,
        size: 3,
        dialog: false,
        communityService: new CommunityService(),
        communities: [],
        lengthItemsPagination: 0,
        userRole: localStorage.getItem('role'),
        userLogged: localStorage.getItem('idUser'),
        userService: new UserService('users/')

    }),
    created(){
        var _this = this;
        this.communityService.getCommunities().then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else {
                    _this.communities = res.communities;
                    var communitiesLength = _this.communities.length;
                    if(communitiesLength > 3){
                        if(communitiesLength % 3 == 0){
                            _this.lengthItemsPagination = parseInt(communitiesLength / 3);
                        }
                        else {
                            _this.lengthItemsPagination = parseInt(communitiesLength / 3) + 1;
                        }
                     
                    }
                }   
            }
        });
    },
    methods: {
        nextPage(page) {
            this.pageNumber = page;
        },
        followCommunity(communityId){
            console.log(this.checkFollow(communityId));
            const communityToFollow = JSON.stringify({
                id: communityId
            });
            this.userService.followCommunity(communityToFollow,this.userLogged).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else {
                        if(res.users){
                            //alert('Has dejado de seguir al usuario');
                            location.reload();
                        }
                      
                    }
                }
            });
        },
        quitAdmin(idCom){
            this.communityService.quitAdminCommunity(idCom).then((res) => {
                if(res.message){
                    alert(res.message);
                }
                else{
                    location.reload();
                }
            });
        }
    },
    computed: {
        pageCount() {
            let l = this.communities.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
                end = start + this.size;
            return this.communities.slice(start, end);
        }
    }
}
</script>