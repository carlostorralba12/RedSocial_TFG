<template>
    
    <v-dialog
        v-model="dialog"
        width="1200"
    >

        <template v-slot:activator="{ on, attrs }">

            <v-btn
                rounded
                color="indigo"
                dark
                v-bind="attrs"
                v-on="on"
            >
                Editar 
                <v-icon right>
                    mdi-pencil
                </v-icon>
            </v-btn>

        </template>
        
        <v-card>

            <v-card-title class="headline grey lighten-2">
                Editar Debate
            </v-card-title>

            <v-card-text>

                <v-container>

                    <v-form v-model="discussionForm">

                         <v-text-field
                            v-model= discussion.title
                            label="Título"
                            placeholder="Debate"
                            outlined
                            rounded
                            :rules="rules"
                            dense
                        ></v-text-field>

                           <v-textarea
                                v-model= discussion.description
                                outlined
                                required
                                label="Descripción"
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
                    :disabled="!discussionForm"
                    @click="updateDiscussion()"
                >
                    Confirmar
                </v-btn>

            </v-card-actions>


        </v-card>

    </v-dialog>

</template>

<script>
import DiscussionsService from '../../services/discussions.service'
export default {
    name: 'AddDiscussion',
    props: ['discussion'],
    data: () => ({
        discussionForm: false,
        dialog: false,
        discussionsService: null,
        rules: [
            v => !!v || 'Este campo es obligatorio'
        ],
    }),

    methods: {
        updateDiscussion(){
            var idCom = this.$route.params.idCom;
            var idDis = this.$route.params.idDis;
            this.discussionsService = new DiscussionsService(idCom);
            this.dialog = false;
            var _this = this;
            const discussionUpdate = JSON.stringify({
                title: this.discussion.title,
                description: this.discussion.description
            });
            this.discussionsService.updateDiscussion(idDis,discussionUpdate).then((res) => {
               if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else{
                        alert('Debate actualizado');
                        location.reload();
                    }
                }
            });
        }
    }
}
</script>