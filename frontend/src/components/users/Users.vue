<template>
    <v-container>
        <div class="header-users">

            <h1>Usuarios</h1>

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
        
        <v-btn
            rounded
            color="success"
            dark
            to="/addUser"
        >
            Añadir 
            <v-icon right>
                mdi-plus
            </v-icon>
        </v-btn>
            
        <div class="body-users">
            <div  v-for="user in paginatedData" :key="user.id">

                <template >
             
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
                                color="info"
                                dark
                                :to="{ name: 'detailUser', params: {id: user._id } }"
                                style="margin: 0 0 0 auto"
                                >
                                Ver perfil
                            </v-btn>
                        </v-card-title>

                        <v-card-text>
                           
                            <span class="title font-weight-bold">{{user.email}}</span>
                          
                        </v-card-text>
                        
                    </v-card>
                    
                </template>

            </div>
        
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

<style lang="scss">
    @import "./users.scss";
</style>

<script>

import UserService from '../../services/user.service'
export default {
    name: 'Users',
    data: () => ({
        pageNumber: 1,
        size: 10,
        image: false,
        lengthItemsPagination: 0,
        userRole: localStorage.getItem('role'),
        userService: new UserService('users'),
        users: []
    }),
    created(){
        var _this = this;
        this.userService.getUsers().then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else {
                    _this.users = res.users;
                     var usersLength = _this.users.length;
                    if(usersLength > _this.size){
                        if(usersLength % _this.size == 0){
                            _this.lengthItemsPagination = parseInt(usersLength/_this.size);
                        }
                        else {
                            _this.lengthItemsPagination = parseInt(usersLength/_this.size) + 1;
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
            let l = this.users.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
                end = start + this.size;
            return this.users.slice(start, end);
        }
    }
}
    
</script>