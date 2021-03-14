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
            
            
        <div class="body-communities" v-for="item in paginatedData" :key="item._id">

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
                        :src="require('../../../assets/iconoRadis.png')" 
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
                
            </template>

        </div>

        <div class="text-center">
            <v-pagination
            v-model="pageNumber"
            :length="0"
            :total-visible="7"
            @input="nextPage"
            circle
            >
            </v-pagination>                   
        </div>
          
        
       
    </v-container>
 
</template>

<style scoped lang="scss">
    @import './allCommunities.scss';
</style>

<script>

import CommunityService from '../../../services/community.service';
export default {
    name: 'AllCommunities',
    data: () => ({
        pageNumber: 1,
        size: 5,
        communityService: new CommunityService(),
        items: [],
        lengthItemsPagination: 0,
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
                    console.log(res.communities);
                    console.log(_this.items.length);
                   
                  
                    if(_this.items.length > 5){
                       _this.lengthItemsPagination = _this.lengthItemsPagination/5;    
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