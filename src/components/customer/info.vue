<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>ข้อมูลของฉัน</h1>
        <v-divider></v-divider>

        <div style="margin: auto; padding: 2vh">
          <v-row>
            <v-col>
              <v-row
                justify="center"
                style="margin-top: 4px; margin-bottom: 1px;"
              >
                <v-avatar style="margin-top=1vh" color="primary" size="128"
                  ><v-icon dark x-large> mdi-account-circle </v-icon></v-avatar
                >
              </v-row>
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col col="5">
            <v-container fluid style="height: 50vh">
              <v-layout column>
                <v-card>
                  <v-card-text>
                    <v-text-field
                      disabled
                      v-model="info.name"
                      label="Name"
                    ></v-text-field>
                    <v-text-field
                      disabled
                      v-model="info.username"
                      label="Username"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-layout>

              <v-row justify="center" style="margin: 20px">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      เปลี่ยนรหัสผ่าน
                    </v-btn>
                  </template>
                  <v-layout column>
                    <v-form
                      v-model="passwordValid"
                      @submit.prevent="updatePassword"
                    >
                      <v-card>
                        <v-card-text>
                          <v-text-field
                            label="Old password"
                            :rules="passwordRules"
                            v-model="oldpassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                          ></v-text-field>

                          <v-text-field
                            v-model="password"
                            label="New Password"
                            name="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            :rules="passwordRules"
                          ></v-text-field>
                          <v-text-field
                            v-model="confirmPassword"
                            label="Confirm New Password"
                            name="confirmPassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                             @click:append="show1 = !show1"
                            :rules="confirmPasswordRules"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            :disabled="!passwordValid"
                            color="primary"
                            dark
                            justify="center"
                            text
                            @click="updatePassword()"
                          >
                            เปลี่ยนรหัสผ่าน
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false; oldpassword='';password='';confirmPassword=''; show1=false"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-form>
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
import AuthUser from "@/store/AuthUser";
export default {
  data() {
    return {
      show1:false,
      info: {},
      dialog: false,
      passwordValid: false,
      oldpassword: "",
      password: "",
      confirmPassword: "",
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 8) || "minimum 8 characters",
      ],
      confirmPasswordRules: [
        (value) => !!value || "type confirm password",
        (value) =>
          value === this.password ||
          "The password confirmation does not match.",
      ],
    };
  },
  created() {
    // รับ token user or admin ใหม่ทุกรอบ
    const token = AuthUser.getters.user.api_token;

    this.$http
      .get("https://se-api-pond.herokuapp.com/api/user/me", {
        headers: {
          Authorization: `${token}`,
        },
      })
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
  methods: {
    updatePassword() {
      const token = AuthUser.getters.user.api_token;
      this.$http
        .put(
          "https://se-api-pond.herokuapp.com/api/user/me",
          {
            oldpassword: this.oldpassword,
            newpassword: this.password,
          },
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data.status == "error") {
            alert(response.data.error);
          } else if (response.data.status != "error") {
            this.dialog = false;
            this.oldpassword = "";
            this.newpassword = "";
            this.password="";
            this.confirmPassword="";
            alert("คุณได้ทำการเปลี่ยนพาสเวิร์ดสำเร็จ")
          }
        });
    },
  },
};
</script>

<style></style>
