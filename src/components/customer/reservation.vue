<template>
  <v-container>
    <span style="font-size:40px;">การจองของฉัน</span>
    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-row>
          <v-col ref="vcol" v-for="item in items" :key="item.id" cols="12">
            <v-card color="blue" dark style="margin:10px;">
              <v-card-title class="text-h6">
                <label>
                  <td>{{ item.user_coupon.name }}</td>
                </label>
              </v-card-title>
              <v-card-subtitle>
                <label>
                  <td>
                    {{ item.coupon }}
                  </td></label
                >
              </v-card-subtitle>

              <label>
                <v-card-subtitle
                  >สถานะ:
                  <td>{{ item.status }}</td>
                </v-card-subtitle>
              </label>

              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      รีวิวเลย!
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">รีวิวบริการ</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-col cols="12" md="6">
                          <v-textarea
                            outlined
                            label="Outlined textarea"
                            rows="5"
                          ></v-textarea>
                        </v-col>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                      </v-btn>

                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
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
      items: [
       
      ],

      dialog: false,
    };
  },
  created() {
    const token =AuthUser.getters.user.api_token
      // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjMsImlhdCI6MTYzMzgxMzA5NCwiZXhwIjoxNjMzODQ5MDk0fQ.Y-nTmX0AXnFR8yCGDUSy2tKH7e4DkrLc2ei5y4G4o6A";

    this.$http
      .get("http://127.0.0.1:8000/api/user/me", {
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
};
</script>

<style></style>
