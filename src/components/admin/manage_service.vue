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
          <v-chip :color="getColor(item.coupon_status)" outlined>
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
// import axios from 'axios';
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
      // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjMsImlhdCI6MTYzMzc4OTU0OSwiZXhwIjoxNjMzODI1NTQ5fQ.zHA4y82s3D55TQPcGBcNYUK-hjjDqSzkAKG2uTRbZyw";
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
    getColor(coupon_status) {
      if (coupon_status == "used") return "red";
      else return "green";
    },
  },
  created() {
    // รับ token admin ใหม่ทุกรอบ
    const token = AuthUser.getters.user.api_token;
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjMsImlhdCI6MTYzMzc4OTU0OSwiZXhwIjoxNjMzODI1NTQ5fQ.zHA4y82s3D55TQPcGBcNYUK-hjjDqSzkAKG2uTRbZyw";

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
