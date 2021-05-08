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
                Añadir Debate
            </v-card-title>

            <v-card-text>

                <v-container>

                    <v-form v-model="discussionForm">

                         <v-text-field
                            v-model= title
                            label="Título"
                            placeholder="Debate"
                            outlined
                            rounded
                            :rules="rules"
                            dense
                        ></v-text-field>

                           <v-textarea
                                v-model= description
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
                    @click="saveDiscussion()"
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
    data: () => ({
        discussionForm: false,
        dialog: false,
        title: undefined,
        description: undefined,
        discussionsService: null,
        rules: [
            v => !!v || 'Este campo es obligatorio'
        ],
    }),

    methods: {
        saveDiscussion(){
            var id = this.$route.params.id;
            this.discussionsService = new DiscussionsService(id);
            this.dialog = false;
            var _this = this;
            const discussion = JSON.stringify({
                title: this.title,
                description: this.description
            });
            this.discussionsService.saveDiscussion(discussion).then((res) => {
               if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else{
                        alert('Debate almacenado');
                        location.reload();
                    }
                }
            });
        }
    }
}
</script>