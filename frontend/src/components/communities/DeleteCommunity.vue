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
                Eliminar comunidad
            </v-card-title>

            <v-card-text style="text-align: center; font-size: 16px; margin-top: 7px">
                ¿Quieres eliminar la comunidad?
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
                    @click="deleteCommunity()"
                >
                Aceptar
                </v-btn>

            </v-card-actions>
            
        </v-card>

    </v-dialog>
</template>

<script>
import CommunityService from '../../services/community.service';
export default {
    name: 'DeleteCommunity',
    props: ['idCommunity'],
    data: () => ({
        dialog: false,
        communityService: new CommunityService()
    }),
    methods: {
        deleteCommunity(){
            this.communityService.deleteCommunity(this.idCommunity).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                        location.reload();
                    }
                    else {
                        //alert("Comunidad eliminada");
                        location.reload();
                    }
                }
            });
        }
    }
    
}
</script>