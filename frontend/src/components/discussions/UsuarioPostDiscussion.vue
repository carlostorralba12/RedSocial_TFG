<template>

    <v-container>

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
        {{user.email}}

    </v-container>


</template>

<script>
import UserService from '../../services/user.service';
export default {
    name: 'UsuarioPostDiscussion',
    props: ['idUser'],
    data: () => ({
        userService:  new UserService('users/'),
        user: {},
        image: false,
    }),

    created(){
        var _this = this;
        this.userService.getUser(this.idUser).then((res) => {
            if(res){
                if(res.message){
                    alert(res.message);
                }
                else{
                    _this.user = res.user;
                    if(_this.user.image != null){
                        _this.image = true;
                    }
                }
            }
        });
    }
    
}
</script>