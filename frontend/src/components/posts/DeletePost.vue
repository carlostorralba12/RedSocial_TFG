<template>
    
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="error"
            rounded
            dark
            v-bind="attrs"
            v-on="on"
            >
               
                Eliminar
                <v-icon right>mdi-delete</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-card-title class="error lighten-2" dark>
                Eliminar Post
            </v-card-title>

            <v-card-text style="text-align: center; font-size: 16px; margin-top: 7px">
                ¿Quieres eliminar el post?
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
                    @click="deletePost()"
                >
                Aceptar
                </v-btn>

            </v-card-actions>
            
        </v-card>

    </v-dialog>

</template>

<script>
import PostsService from '../../services/posts.service';
export default {
    name: 'DeletePost',
    props: ['idPost'],
    data: () => ({
        dialog: false,
        body: undefined,
        postsService: null
    }),
    methods: {
          deletePost(){
            var idCom = this.$route.params.idCom;
            var idDis = this.$route.params.idDis;
            this.postsService = new PostsService(idCom, idDis);
            this.dialog = false;
            var _this = this;

            this.postsService.deletePost(this.idPost).then((res) => {
                 if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else{
                        alert('Post eliminada');
                        location.reload();
                    }
                }
            });
        }
    }
}
</script>