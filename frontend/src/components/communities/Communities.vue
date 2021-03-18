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
            
        <div class="body-communities" v-for="item in paginatedData">

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

                    </v-card-title>

                    <v-card-text class="title font-weight-bold">
                        {{item.causes}}
                    </v-card-text>

                    <v-card-actions>

                        <div style="width: 100%">

                            <v-btn
                                rounded
                                color="info"
                                dark
                                :to="{ name: 'Community', params: {id: item._id } }"

                                >
                                Detalles
                            </v-btn>

                        </div>

                        <div v-if="userRole == 'admin'">
                           
                           <DeleteCommunity v-bind:idCommunity="item._id"></DeleteCommunity>

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
export default {
    name: 'Communities',
    components: {
        AddCommunity,
        DeleteCommunity
    },
    data: () => ({
        pageNumber: 1,
        size: 3,
        dialog: false,
        communityService: new CommunityService(),
        items: [],
        lengthItemsPagination: 0,
        userRole: localStorage.getItem('role')
    }),
    created(){
        var _this = this;
        this.communityService.getCommunities().then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else {
                    _this.items = res.communities;
                    var communitiesLength = _this.items.length;
                    if(communitiesLength > 3){
                        if(communitiesLength % 3 == 0){
                            _this.lengthItemsPagination = parseInt(communitiesLength / 3);
                        }
                        else {
                            _this.lengthItemsPagination = parseInt(communitiesLength / 3) + 1;
                        }
                     
                       console.log(_this.lengthItemsPagination);    
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
            let l = this.items.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
                end = start + this.size;
            return this.items.slice(start, end);
        }
    }
}
</script>