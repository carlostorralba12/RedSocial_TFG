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

            <v-card-title class="headline grey lighten-2">
                Añadir Comunidad
            </v-card-title>

            <v-card-text>

                <v-container>

                    <v-form v-model="communityForm">

                        <v-text-field
                            v-model= name
                            label="Nombre"
                            placeholder="Enfermedad rara"
                            :rules="rules"
                            outlined
                            rounded
                            dense
                        ></v-text-field>
                         <v-textarea
                            :rules="rules"
                            v-model=description
                            outlined
                            label="Descripción"
                        ></v-textarea>
                        <v-row>

                           <v-col
                                cols="12"
                                md="6"
                            >
                                <v-textarea
                                    v-model=symtoms
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
                                    v-model=causes
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
                                    v-model=treatment
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
                                    v-model=other
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
                    @click=saveCommunity()
                    color="primary"
                    text
                    type="submit"
                    :disabled="!communityForm"
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
    name: 'AddCommunity',
    data: () => ({
        communityForm: false,
        dialog: false,
        name: undefined,
        symtoms: undefined,
        description: undefined,
        causes: undefined,
        treatment: undefined,
        other: undefined,
        rules: [
            v => !!v || 'Este campo es obligatorio'
        ],
        communityService: new CommunityService()
    }),
    methods:{
        saveCommunity(){
            this.dialog = false;
            const community = JSON.stringify({
                name: this.name,
                description: this.description,
                symtoms: this.symtoms,
                causes: this.causes,
                treatment: this.treatment,
                other: this.other
            })
            console.log(community);
            this.communityService.saveCommunity(community).then((res) => {
                if(res){
                    if(res.message){
                        alert(res.message);
                    }
                    else{
                        alert('Comunidad guardada');
                        location.reload();
                    }
                }
            });
        }
    }
}
</script>