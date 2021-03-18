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

            <v-card-title class="headline indigo lighten-2">
                Editar Comunidad
            </v-card-title>

            <v-card-text>

                <v-container>

                    <v-form v-model="communityForm">

                        <v-text-field
                            v-model= community.name
                            label="Nombre"
                            placeholder="Enfermedad rara"
                            outlined
                            rounded
                            required
                            dense
                        ></v-text-field>
                        <v-row>

                           <v-col
                                cols="12"
                                md="6"
                            >
                                <v-textarea
                                    v-model=community.symtoms
                                    outlined
                                    required
                                    label="Síntomas"
                                ></v-textarea>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-textarea
                                    v-model=community.causes
                                    outlined
                                    required
                                    label="Causas"
                                ></v-textarea>
                            </v-col>

                        </v-row>
                         <v-row>

                           <v-col
                                cols="12"
                                md="6"
                            >
                                <v-textarea
                                    v-model=community.treatment
                                    outlined
                                    required
                                    label="Tratamiento"
                                ></v-textarea>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-textarea
                                    v-model=community.other
                                    outlined
                                    label="Otros"
                                    required
                                ></v-textarea>
                            </v-col>

                        </v-row>
                       
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
                    :disabled="!communityForm"
                    @click="updateCommunity()"
                >
                    Confirmar
                </v-btn>

            </v-card-actions>
            
        </v-card>

    </v-dialog>

</template>

<script>
import CommunityService from '../../services/community.service'
export default {
    name: 'UpdateCommunity',
    props:['community'],
    data: () => ({
        communityForm: false,
        dialog: false,
        communityService: new CommunityService()
    }),
    methods:{
        updateCommunity(){
            this.dialog = false;
            const communityUpdate = JSON.stringify({
                name: this.community.name,
                symtoms: this.community.symtoms,
                causes: this.community.causes,
                treatment: this.community.treatment,
                other: this.community.other
            })
            console.log(this.community._id);
            this.communityService.updateCommunity(this.community._id,communityUpdate).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                        location.reload();
                    }
                    else{
                        alert('Comunidad actualizada');
                        location.reload();
                    }
                }
            });
        }
    }
}
</script>