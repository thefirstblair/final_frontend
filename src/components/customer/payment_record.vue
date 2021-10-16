<template>
  <v-container>
    <v-row>
      <v-col>
        <span style="font-size: 40px">ประวัติการชำระเงินของฉัน</span>
        <v-divider></v-divider>

        <v-col
          cols="3.5"
          style="
            background: #f1f1f1;
            margin-right: 5px;
            margin-left: 5px;
            margin-top: 10px;
          "
          v-for="(v, index) in record_payment_list"
          :key="index"
        >
            <v-row style="
                margin-left: 5px;
                padding-top: 10px;"
            >
                ประวัติการชำระเงิน 

            </v-row>

            <v-row style="
                margin-left: 5px;
                padding-top: 10px;">
                <v-divider></v-divider>
            </v-row>

            
            <v-row style="
                margin-left: 25px;
                padding-top: 1px;
                padding-bottom: 14px;"
            >
                <strong>Item</strong>
            </v-row>

            <v-col 
                style="
                    margin-left: 40px;
                    margin-bottom: 1px;
                "
                v-for="(j, index) in v.items"
                :key="index"
            >

                <v-row >
                    {{ j.name }}
                </v-row>

            </v-col>

            <!-- <v-col 
                style="
                    margin-left: 40px;
                    margin-bottom: 1px;
                "
            >
                <v-row >
                    {{ v.items.name }}
                </v-row>

            </v-col> -->

            <v-row style="
                margin-top: 3px;
                margin-bottom: 1px;
                margin-right: 10px;"
                class="justify-end"
            >
                ซื้อเมื่อ : {{ v.created_at }}
            </v-row>

        </v-col>

      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <h1>ประวัติการชำระเงินของฉัน</h1>
        <v-data-table :headers="headers" :items="record_payment_list">
        </v-data-table>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import AuthUser from "@/store/AuthUser";
export default {
  data() {
    return {
      headers: [
        { text: "ชื่อ Coupon", value: "coupon.name" },
        { text: "ซื้อเมื่อ", value: "created_at" },
        { text: "จำนวน", value: "count" },
      ],
      record_payment_list: []
      // record_payment_list: [
      //   {
      //     date: "10-9-2021",
      //     category_lists: [
      //       {
      //         coupon_name: "สระไดร์+ตัดผม",
      //         count: 2,
      //       },
      //       {
      //         coupon_name: "ทาเล็บ",
      //         count: 1,
      //       },
      //     ],
      //   },

      //   {
      //     date: "12-9-2021",
      //     category_lists: [
      //       {
      //         coupon_name: "สปา",
      //         count: 3,
      //       },
      //       {
      //         coupon_name: "นวดคอ บ่า ไหล่",
      //         count: 1,
      //       },
      //       {
      //         coupon_name: "สระไดร์",
      //         count: 2,
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    
  },
  created() {
    const token = AuthUser.getters.user.api_token

    this.$http
      .get("http://127.0.0.1:8000/api/payment_record/", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          this.record_payment_list = response.data;
          console.log(this.record_payment_list);
        } else {
          console.log(response.error);
        }
      });
  },
};
</script>