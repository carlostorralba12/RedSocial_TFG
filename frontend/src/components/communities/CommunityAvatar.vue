<template>

    <v-container>

        <v-list-item-avatar size="70">

            <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require('../../assets/iconoRadis.png')" 
            transition="scale-transition"
            width="50"
            />

        </v-list-item-avatar>
        {{community.name}}

    </v-container>


</template>

<script>
import CommunityService from '../../services/community.service';
export default {
    name: 'CommunityAvatar',
    props: ['idCom'],
    data: () => ({
        communityService:  new CommunityService(),
        community: {},
    }),

    created(){
        var _this = this;
        this.communityService.getCommunity(this.idCom).then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.community = res.community;
                }
            }
        });
    }
    
}
</script>