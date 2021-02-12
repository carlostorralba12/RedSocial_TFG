<template>

    <v-container>

        <v-card class="mx-auto" max-width="1000" tile>
            <v-img height="200" src="https://www.cedars-sinai.org/content/dam/cedars-sinai/blog/2019/02/RareDiseases.jpg"></v-img>

            <v-row class="user-info-container">

                <v-list-item class="">

                    <v-list-item-avatar size="200">

                        <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>

                    </v-list-item-avatar>

                    <v-list-item-content  style="margin-top:20px;">

                        <v-list-item-title class="title">Injamamul Haque Sonet</v-list-item-title>
                        <v-list-item-subtitle>Médico</v-list-item-subtitle>

                    </v-list-item-content>

                    <v-list-item-content style="text-align: right; margin-top: 20px">

                        <v-list-item-title class="title" style="margin-top:20px;">user@gmail.com</v-list-item-title>
                        <v-list-item-subtitle>España</v-list-item-subtitle>
                        <v-list-item-subtitle>Alicante</v-list-item-subtitle>
                        <v-list-item-subtitle>San Fulgencio</v-list-item-subtitle>

                    </v-list-item-content>

                </v-list-item>

                <v-col class="text-right">
                    
                    
                    <v-btn
                        depressed
                        color="primary"
                        elevation="4"
                        style="margin-right: 1%"
                    >
                        Editar datos
                    </v-btn>
                    <!--DIALOG TO REMOVE ACCOUNT-->

                    <v-dialog
                        v-model="dialog"
                        width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="red lighten-2"
                            elevation="4"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            >
                                Eliminar cuenta
                            </v-btn>
                        </template>

                        <v-card>

                            <v-card-title class="headline red lighten-2" dark>
                                Eliminar cuenta
                            </v-card-title>

                            <v-card-text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>

                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                >
                                    I accept
                                </v-btn>

                            </v-card-actions>

                        </v-card>

                    </v-dialog>

                </v-col>

            </v-row>

        </v-card>
  
    </v-container>

</template>

<style scoped lang="scss">
    @import './profileUser.scss';
</style>

<script>
export default {
    name: 'ProfileUser',
    data: () => ({
        dialog: false,
    })
}
</script>