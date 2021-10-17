<template>
  <v-row>
    <v-col>
      <!-- ดึง user coupon -->
      <h1>ประวัติการจองทั้งหมดของลูกค้า</h1>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:[`item.coupon_status`]="{ item }">
          <v-chip :color="item.coupon_status == 'used' ? 'red' : 'green'" outlined>
            {{ item.coupon_status }}
          </v-chip>
        </template>
        <template v-slot:[`item.action`]="{ item, index }">
          <v-btn
            color="success"
            @click="updateCouponStatus(item.id, index, item.coupon_status)"
            >เปลี่ยนสถานะ</v-btn
          >
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import AuthUser from "@/store/AuthUser";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ชื่อ Service",
          align: "start",
          sortable: false,
          value: "service.name",
        },

        { text: "ชื่อ Coupon", value: "coupon.name" },
        { text: "Username", value: "user.username" },
        { text: "วันเวลาที่จอง", value: "created_at" },
        { text: "สถานะ", value: "coupon_status" },
        { text: "Action", value: "action" },
      ],
      user: [],
      user_id: [],
      items: [],
    };
  },
  methods: {
    updateCouponStatus(id, index, status) {
      const token = AuthUser.getters.user.api_token;
      this.$http
        .put(
          "http://127.0.0.1:8000/api/user_coupon/" + id,
          {
            coupon_status:
              (status == "unuse" && "used") || (status == "used" && "unuse"),
          },
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.items[index].coupon_status =
              (status == "unuse" && "used") || (status == "used" && "unuse");
          } else {
            console.log(response.data.error);
          }
        });
    },
  },
  created() {
    const token = AuthUser.getters.user.api_token;
    this.$http
      .get("http://127.0.0.1:8000/api/user_coupon/", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          this.items = response.data;
        } else {
          console.log(response.error);
        }
      });
  },
};
</script>

<style scoped>
.v-card {
  width: 80%;
  max-width: 2000px;
  margin: 60px auto 0;
}
</style>
