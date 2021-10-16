<template>
  <v-container>
    <span style="font-size: 40px">การจองของฉัน</span>
    <v-divider></v-divider>

    <v-row style="overflow-y: auto; max-height: 600px" v-if="items == 0">
      <v-col>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" style="background: #f1f1f1; margin-top: 10px">
        <h3 style="text-align: center">ท่านยังไม่มีประวัติการจอง</h3>
      </v-col>
    </v-row>

    <v-row style="overflow-y: auto; max-height: 600px" v-else-if="items != []">
      <v-col ref="vcol" v-for="(item, index) in items" :key="index" cols="12">
        <v-card color="blue" dark style="margin: 10px">
          <v-card-title class="text-h6">
            <label>
              <td>{{ item.service.name }}</td>
            </label>
          </v-card-title>
          <v-card-subtitle>
            <label>
              <td>
                {{ item.coupon.name }}
              </td>
              <br />
              ช่างที่คุณเลือก : {{ item.employee.name }}
            </label>
          </v-card-subtitle>

          <label>
            <v-card-subtitle
              >สถานะ :
              {{ item.coupon_status }}
            </v-card-subtitle>
          </label>

          <v-row justify="center">
            <v-btn
              color="primary"
              v-if="item.coupon_status == 'used' && !item.reviewed"
              dark
              @click="
                review_dialog = true;
                review.service_id = item.service.id;
                review.coupon_id = item.coupon.id;
                review.user_coupon_id = item.id;
                review.index = index;
              "
            >
              รีวิวเลย!
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="review_dialog" persistent max-width="600px">
      <v-form>
        <v-card>
          <v-card-title>
            <span class="text-h5">รีวิวบริการ</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-col cols="12">
                <v-row>
                  <v-card-subtitle class="text-h5">เรตติ้ง : </v-card-subtitle>
                  <v-rating
                    required
                    v-model="review.score"
                    background-color="orange lighten-3"
                    color="yellow darken-1"
                    large
                  ></v-rating>
                </v-row>

                <v-textarea
                  v-model="review.review_detail"
                  required
                  outlined
                  label="เขียนรีวิวที่นี่"
                  style="margin-top: 30px"
                ></v-textarea>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="review_dialog = false">
              Close
            </v-btn>

            <v-btn color="blue darken-1" text @click="addReview"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script>
import AuthUser from "@/store/AuthUser";
export default {
  data() {
    return {
      rating: 0,
      items: [],
      review: {
        index: 0,
        user_coupon_id: 0,
        score: 0,
        review_detail: "",
        service_id: 0,
        coupon_id: 0,
        user_id: AuthUser.getters.user.id,
      },
      review_dialog: false,
      employees: [],
    };
  },
  methods: {
    addReview() {
      const token = AuthUser.getters.user.api_token;

      this.$http
        .post("http://127.0.0.1:8000/api/review/", this.review, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.review_dialog = false;

            this.review = {
              index: 0,
              user_coupon_id: 0,
              score: 0,
              review_detail: "",
              service_id: 0,
              coupon_id: 0,
              user_id: AuthUser.getters.user.id,
            };
            this.items[this.review.index].reviewed = true;
          } else {
            console.log(response.data.error);
          }
        });
    },
  },
  created() {
    const token = AuthUser.getters.user.api_token;
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjMsImlhdCI6MTYzMzgxMzA5NCwiZXhwIjoxNjMzODQ5MDk0fQ.Y-nTmX0AXnFR8yCGDUSy2tKH7e4DkrLc2ei5y4G4o6A";

    this.$http
      .get("http://127.0.0.1:8000/api/user/me", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          this.items = response.data.user_coupon;
          console.log(this.items);
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

<style>
</style>
