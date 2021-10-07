<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ข้อมูลของฉัน</h1>
        <v-divider></v-divider>

        <div style="margin: auto; padding: 2vh">
          <v-row>
            <v-col>
              <v-avatar style="margin-top=1vh" color="primary" size="128"
                ><v-icon dark x-large> mdi-account-circle </v-icon></v-avatar
              >
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col col="5">
            <v-container fluid style="height: 100vh">
              <v-layout column>
                <v-card>
                  <v-card-text>
                    <v-text-field
                      v-model="info.name"
                      label="Name"
                    ></v-text-field>
                    <v-text-field
                      v-model="info.username"
                      label="Username"
                    ></v-text-field>
                    <v-text-field
                      v-model="info.password"
                      label="Password"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-layout>

              <v-row justify="center" style="margin: 20px">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template>
                    <v-btn color="primary" dark>
                      แก้ไข
                    </v-btn>
                  </template>
                  <v-layout column>
                    <v-card>
                      <v-card-text>
                        <v-text-field
                          v-model="info.name"
                          label="Name"
                        ></v-text-field>
                        <v-text-field
                          v-model="info.username"
                          label="Old password"
                        ></v-text-field>
                        <v-text-field
                          v-model="info.password"
                          label="New password"
                        ></v-text-field>
                        <v-text-field
                          v-model="info.password"
                          label="Confirm new password"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          dark
                          justify="center"
                        >
                          ยืนยันแก้ไข
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-layout>
                </v-dialog>
              </v-row>
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
      info: {},
      dialog: false,
    };
  },
  created() {
    // รับ token user or admin ใหม่ทุกรอบ
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjMsImlhdCI6MTYzMzYwODk5OCwiZXhwIjoxNjMzNjQ0OTk4fQ.uumEM5lVQpUYFudCU0D35nuBMDi-8QHbs34jSrRv-qo";

    this.$http
      .get(
        "http://127.0.0.1:8000/api/user/me",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          this.info = response.data;
        } else {
          console.log(response.error);
        }
      })
      .catch((response) => {
        console.log(response.response);
      });
  },
};
</script>


<style></style>
