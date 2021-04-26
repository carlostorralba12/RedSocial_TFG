<template>

    <v-container>

        <v-card tile>
            
            <v-img height="200" src="https://www.cedars-sinai.org/content/dam/cedars-sinai/blog/2019/02/RareDiseases.jpg"></v-img>
         
            <v-card-title style="height: 100px">
                <v-row class="user-info-container">

                    <v-list-item >

                     
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

                        <v-list-item-content  style="margin-top:45px; text-transform: capitalize">

                            <v-list-item-title class="title">{{user.name }} {{user.surname}}</v-list-item-title>
                            <v-list-item-subtitle>{{user.role }}</v-list-item-subtitle>

                        </v-list-item-content>
                        

                        <v-list-item-content style="text-align: right; margin-top: 45px">

                            <v-list-item-title class="title">{{user.email}}</v-list-item-title>
                            <div style="text-transform: capitalize">

                                <v-list-item-subtitle>{{user.country}}</v-list-item-subtitle>
                                <v-list-item-subtitle>{{user.province}}</v-list-item-subtitle>
                                <v-list-item-subtitle>{{user.city}}</v-list-item-subtitle>

                            </div>
                        

                        </v-list-item-content>

                    </v-list-item>

                </v-row>

            </v-card-title>

            <v-card-text class="card-text">

                 <v-col class="text-left" v-if="detailUser">
                      <v-btn
                        rounded
                        color="orange darken-2"
                        dark
                        to="/users"
                    >
                        <v-icon
                            dark
                            left
                        >
                            mdi-arrow-left
                        </v-icon>Usuarios
                    </v-btn>

                </v-col>

                <v-col class="text-right"  v-if="userRole != 'admin' && user._id != userLogged">
                    <template v-if="checkFollow">

                        <v-btn
                            rounded
                            color="error"
                            dark
                            @click="unfollowUser(user._id)"
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
                            @click="followUser(user._id)"
                        >
                            <v-icon left color="secondary">mdi-heart</v-icon>
                            
                            <span> Seguir</span> 
                            
                        </v-btn> 
                        
                    </template>
                  

                </v-col>

                <v-col class="text-right"  v-if="userRole == 'admin' || userLogged == user._id">
                    
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

            </v-card-text>

            <div class="follows">

                <template v-if="users.length > 0">

                    <v-card>
                        
                        <v-card-title>
                            <span>Usuarios seguidos</span>
                        </v-card-title>

                        <v-card-text>
                            
                            <div v-for="userFollow in paginatedUsers" :key="userFollow._id">

                                <template>

                                    <v-card
                                        class="mx-auto"
                                        color="secondary"
                                        style="margin-bottom: 1%"
                                        dark
                                    >

                                        <v-card-title>

                                            <div class="card-title">
                                                <UserAvatar v-bind:idUser="userFollow._id"></UserAvatar>
                                                <v-btn
                                                    rounded
                                                    color="error"
                                                    dark
                                                    @click="unfollowUser(userFollow._id)"
                                                    v-if="userLogged == user._id"
                                                >
                                                    <v-icon left color="secondary">mdi-heart-broken</v-icon>
                                                    
                                                    <span> Dejar de seguir</span> 
                                                    
                                                </v-btn> 

                                            </div>
                                           
                                            
                                        </v-card-title>

                                        <v-card-actions>
                                                <v-btn
                                                    rounded
                                                    color="info"
                                                    dark
                                                    :href="'/users/' + userFollow._id"
                                                    style="margin: 0 0 0 auto"
                                                    >
                                                    Ver perfil
                                                </v-btn>
                                        </v-card-actions>

                                    </v-card>

                                </template>

                            </div>

                            <div class="text-center">
                                <v-pagination
                                v-model="pageNumberUsers"
                                :length="lengthItemsPaginationUsers"
                                :total-visible="7"
                                @input="nextPageUsers"
                                circle
                                >
                                </v-pagination>                   
                            </div>

                        </v-card-text>

                    </v-card>

                </template>

                <template v-if="communities.length > 0">

                    <v-card style="margin-top: 2%">
                        <v-card-title>
                            <span>Comunidades seguidas</span>
                        </v-card-title>

                        <v-card-text>
                            
                            <div v-for="community in paginatedCommunities" :key="community._id">

                                <template>

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
                                                 <v-btn
                                                    rounded
                                                    color="error"
                                                    dark
                                                    v-if="userLogged == user._id"
                                                    @click="unfollowCommunity(community._id)"
                                                >
                                                    <v-icon left color="secondary">mdi-heart-broken</v-icon>
                                                    
                                                    <span> Dejar de seguir</span> 
                                                    
                                                </v-btn> 
                                            </div>
                                           

                                        </v-card-actions>

                                    </v-card>

                                </template>

                            </div>

                            <div class="text-center">
                                <v-pagination
                                v-model="pageNumberCommunities"
                                :length="lengthItemsPaginationCommunities"
                                :total-visible="7"
                                @input="nextPageCommunities"
                                circle
                                >
                                </v-pagination>                   
                            </div>

                        </v-card-text>

                    </v-card>

                </template>

            </div>

        </v-card>

    </v-container>

</template>

<style scoped lang="scss">
    @import './profileUser.scss';
</style>

<script>
import UserService from '../../../services/user.service';
import ImageService from '../../../services/image.service';
import EditUser from './edit/EditUser';
import UserAvatar from '../UserAvatar'
import CommunityAvatar from '../../communities/CommunityAvatar'
export default {
    name: 'ProfileUser',
    components: {
        EditUser,
        UserAvatar,
        CommunityAvatar
    },
    data: () => ({
        dialog: false,
        detailUser: false,
        user: {},
        pageNumberUsers: 1,
        pageNumberCommunities:1,
        size: 3,
        lengthItemsPaginationUsers: 0,
        lengthItemsPaginationCommunities: 0,
        users: [],
        communities: [],
        updated: false,
        image: false,
        imageService: null,
        imageUser: undefined,
        checkFollow: false,
        userRole: localStorage.getItem('role'),
        userLogged: localStorage.getItem('idUser'),
        userService: new UserService('users/')
    }),
    created() {
        var _this = this;
        var id = this.$route.params.id;
        if(this.$route.name == 'detailUser'){
            this.detailUser = true;
        }
        this.userService.getUser(id).then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.user = res.user;
                    _this.imageUser = _this.user.image;
                    _this.users = _this.user.users;
                    _this.communities = _this.user.communities;
                    var usersLength = _this.users.length;
                    var communitiesLength = _this.communities.length;
                    if(usersLength > 3){
                        if(usersLength % 3 == 0){
                            _this.lengthItemsPaginationUsers = parseInt(usersLength/3);
                        }
                        else {
                             _this.lengthItemsPaginationUsers = parseInt(usersLength/3) + 1;
                        }

                    }
                    if(communitiesLength > 3){
                        if(communitiesLength % 3 == 0){
                            _this.lengthItemsPaginationCommunities = parseInt(communitiesLength/3);
                        }
                        else {
                             _this.lengthItemsPaginationCommunities = parseInt(communitiesLength/3) + 1;
                        }
                        
                    }
                    if(_this.user.image != null){
                        _this.image = true;
                    }
                }
            }
        });
        this.userService.getUser(this.userLogged).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                        
                    }
                    else{
                           
                        for(var user of res.user.users){
                            
                            if(_this.user._id == user._id){
                                //console.log(idUser)
                                _this.checkFollow = true;
                               
                            }
                        }
                    }
                }
            });
    },
    methods: {
        deleteUser() {
            var _this = this;
            // eliminamos la imagen de la base de datos
            if(this.imageUser != undefined){

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
            this.userService.deleteUser(this.user._id).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else {
                        if(_this.detailUser){
                            alert('Usuario eliminado');
                            location.href = '/users';
                        }
                        else {
                            localStorage.clear();
                            window.location = '/';
                        }
                    }
                }
            });
        },
        followUser(userId){
            const userToFollow = JSON.stringify({
                id: userId
            });
            this.userService.followUser(userToFollow,this.userLogged).then((res) => {
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
        unfollowUser(userId){
            const userToUnfollow = JSON.stringify({
                id: userId
            });
            this.userService.unfollowUser(userToUnfollow,this.userLogged).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else {
                        if(res.users){
                            alert('Has dejado de seguir al usuario');
                            location.reload();
                        }
                      
                    }
                }
            });
        },
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
        checkUpdate(value) {
            this.updated = value;
            if(value){
                alert("Usuario actualizado");
                location.reload();
            }
            
           
        },
        nextPageUsers(page) {
            this.pageNumberUsers = page;
        },
        nextPageCommunities(page){
            this.pageNumberCommunities = page;
        }
        
    },
    computed: {
        pageCountUsers() {
            let l = this.users.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedUsers() {
            const start = this.pageNumberUsers * this.size - this.size,
                end = start + this.size;
            return this.users.slice(start, end);
        },
        pageCountCommunities() {
            let l = this.communities.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedCommunities() {
            const start = this.pageNumberCommunities * this.size - this.size,
                end = start + this.size;
            return this.communities.slice(start, end);
        }
    }

}
</script>