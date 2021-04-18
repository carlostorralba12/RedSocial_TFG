<template>
    
    <v-dialog
        v-model="dialog"
        width="1200"
    >

        <template v-slot:activator="{ on, attrs }">

            <v-btn
                rounded
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
            >
                Añadir 
                <v-icon right>
                    mdi-plus
                </v-icon>
            </v-btn>

        </template>

        <v-card>

            <v-card-title class="headline success lighten-2">
                Añadir Post
            </v-card-title>

              <v-card-text>

                <v-container>

                    <v-form v-model="postForm">

                        <v-textarea
                            v-model=body
                            outlined
                            required
                            label="Cuerpo"
                        ></v-textarea>

                    </v-form>

                </v-container>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>

                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    text
                    @click="dialog = false"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    :disabled="!postForm"
                    @click="savePost()"
                >
                    Confirmar
                </v-btn>

            </v-card-actions>


        </v-card>
        
    </v-dialog>

</template>

<script>
import PostsService from '../../services/posts.service';
export default {
    name: 'AddPost',
    props: ['idUser'],
    data: () => ({
        postForm: false,
        dialog: false,
        body: undefined,
        postsService: null
    }),
    methods: {
        savePost(){
            var idCom = this.$route.params.idCom;
            var idDis = this.$route.params.idDis;
            this.postsService = new PostsService(idCom, idDis);
            this.dialog = false;
            var _this = this;

            const post = JSON.stringify({
                body: this.body,
                idUser: this.idUser
            });

            this.postsService.savePost(post).then((res) => {
                 if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else{
                        alert('Post almacenada');
                        location.reload();
                    }
                }
            });
        }
      
    }

}
</script>