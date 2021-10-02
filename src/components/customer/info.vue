<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ข้อมูลของฉัน</h1>
        <v-divider></v-divider>

        <div style="margin:auto;padding:2vh;">
          <v-row>
            <v-col>
              <v-avatar style="margin-top=1vh" color="primary" size="128"
                ><v-icon dark x-large>
                  mdi-account-circle
                </v-icon></v-avatar
              >
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col col="5">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: "John",
        lastName: "Doe",
        contactEmail: "john@doe.com",
        avatar: "MALE_CAUCASIAN_BLOND_BEARD",
      },
    };
  },
};
</script>

<style></style>
