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
                Eliminar Debate
            </v-card-title>

            <v-card-text style="text-align: center; font-size: 16px; margin-top: 7px">
                ¿Quieres eliminar el debate?
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
                    @click="deleteDiscussion()"
                >
                Aceptar
                </v-btn>

            </v-card-actions>
            
        </v-card>

    </v-dialog>
</template>

<script>
import DiscussionsService from '../../services/discussions.service'
export default {
    name: 'DeleteDiscussion',
    data: () => ({
        dialog: false,
        discussionsService: null,
    }),
    methods: {
        deleteDiscussion(){
            var idCom = this.$route.params.idCom;
            var idDis = this.$route.params.idDis;
            this.discussionsService = new DiscussionsService(idCom);
            this.discussionsService.deleteDiscussion(idDis).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                        location.reload();
                    }
                    else {
                        alert("Debate eliminado");
                        location.href = '/community/' + idCom + '/discussions';
                    }
                }
            });
        }
    }
    
}
</script>