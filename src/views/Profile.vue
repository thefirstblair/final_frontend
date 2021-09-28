<template>
  <v-container>
    <v-row>
      
      <v-col style="background:grey; height:750px; margin-top:5vh">
        <v-card class="mx-auto"
          style="background:white; height:650px; width:1000px; margin-top:40px"
        >
      <v-card-title class="justify-center">ข้อมูลของฉัน</v-card-title>
        <div class='d-flex align-center'>
          <v-row align="center" justify="center">
            <v-col style="margin-top:2vh; margin-left:45vh" >
              <v-avatar color="primary" size="128" 
                ><v-icon dark x-large>
                  mdi-account-circle
                </v-icon></v-avatar
              >
            </v-col>
          </v-row>
        </div>

          
          <v-row>
            <v-col col="7">
              <v-container fluid style="height: 100vh;">
                <v-layout column>
                  <v-card>
                    <v-card-text>
                      <v-text-field
                        v-model="form.firstName"
                        label="First Name"
                      ></v-text-field>
                      <v-text-field
                        v-model="form.lastName"
                        label="Last Name"
                      ></v-text-field>
                      <v-text-field
                        v-model="form.contactEmail"
                        label="Email"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="primary">
                        แก้ไข
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-layout>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
          form: {
                    firstName: 'John',
                    lastName: 'Doe',
                    contactEmail: 'john@doe.com',
                    avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
                },
    };
  },
};
</script>

<style></style>
