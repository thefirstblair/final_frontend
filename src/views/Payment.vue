<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <h1>รายการสินค้า</h1>

        <v-divider></v-divider>
      </v-col>

      <v-col cols="7">
        <h1>ชำระสินค้า</h1>

        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row style="margin-top:1vh">
      <v-col cols="5">
        <v-card
          max-width="550"
          max-height="700"
          style="margin-top:1vh"
          class="scroll"
        >
          <v-card-title>
            ยอดรวมทั้งหมด {{ cost }} บาท
          </v-card-title>

          <v-divider></v-divider>

          <div style="overflow:auto; max-height:62vh;">
            <v-col>
              <v-col
                style="
                  background: #f1f1f1;
                  margin-right: 5px;
                  margin-top: 10px;
                  margin-bottom: 10px;"
                v-for="(v, index) in service_lists"
                :key="index"
              >
                <v-row>
                  <v-col cols="10" style="">
                    <v-row style="padding: 3px">
                      Coupon name : {{ v.coupon }}
                    </v-row>
                    <v-row style="padding: 3px">
                      Price : {{ v.price }} บาท
                    </v-row>
                    <v-row style="padding: 3px">
                      Time : {{ v.time }} นาที
                    </v-row>
                  </v-col>

                  <v-col cols="2" style="">
                    <v-row> </v-row>
                    <v-row style="text-align: right" class="align-right">
                      {{ v.count }} ชิ้น
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-col>
          </div>
        </v-card>
      </v-col>

      <v-col>
        <v-col cols="12">
          <h2>เลือกช่องทางการชำระเงิน</h2>
          <v-select
            v-model="selected"
            :items="payments"
            label="ช่องทางการชำระเงิน"
            dense
            solo
            return-object
            style="margin-top:10px;"
          ></v-select
        ></v-col>
        <v-col cols="12" v-if="selected === 'Credit Card'">
          <v-card max-width="800" max-height="350">
            <v-card-title
              class="green darken-1 white--text font-weight-black title"
            >
              PAYMENT DETAILS<v-spacer></v-spacer>
            </v-card-title>

            <v-card-text class="pb-10">
              <v-row>
                <v-col cols="6">
                  <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                    >CARDHOLDER’S NAME</v-subheader
                  >
                  <v-text-field
                    single-line
                    outlined
                    label="Johny Relative"
                    hide-details
                  />
                </v-col>

                <v-col cols="6">
                  <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                    >CARD NUMBER</v-subheader
                  >
                  <v-text-field
                    single-line
                    outlined
                    mask="credit-card"
                    label="**** **** ****"
                    v-model="valueOfCardNumber"
                    hide-details
                  />
                </v-col>

                <v-col col="4">
                  <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                    >EXPIRE DATE</v-subheader
                  >
                  <v-select
                    :items="monthList"
                    label="Month"
                    outlined
                    hide-details
                  />
                </v-col>

                <v-col col="4">
                  <v-subheader
                    class="grey--text text--lighten-1 pl-0 subheader"
                  ></v-subheader>
                  <v-select
                    :items="yearlist"
                    label="Year"
                    outlined
                    hide-details
                  />
                </v-col>

                <v-col col="4">
                  <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                    >CVV</v-subheader
                  >
                  <v-text-field single-line outlined hide-details />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-divider></v-divider>
        </v-col>
        <v-row align="center" justify="space-around">
          <v-btn x-large color="success" style="margin-top:10px"
            >ยืนยันการสั่งซื้อ</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cost: 0.0,
      selected: "Cash",
      payments: ["Cash", "Credit Card"],
      yearlist: ["2030", "2029", "2028", "2027"],
      monthList: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      service_lists: [
        {
          coupon: "สระไดร์ + ตัดผม",
          price: 350,
          time: 45,
          count: 1,
        },

        {
          coupon: "ทาสีเล็บมือ + เล็บเท้า",
          price: 200,
          time: 20,
          count: 2,
        },
        {
          coupon: "นวดคอ บ่า ไหล่",
          price: 300,
          time: 60,
          count: 4,
        },
        {
          coupon: "นวดคอ บ่า ไหล่",
          price: 300,
          time: 60,
          count: 4,
        },
        {
          coupon: "นวดคอ บ่า ไหล่",
          price: 300,
          time: 60,
          count: 4,
        },
        {
          coupon: "นวดคอ บ่า ไหล่",
          price: 300,
          time: 60,
          count: 4,
        },
        {
          coupon: "นวดคอ บ่า ไหล่",
          price: 300,
          time: 60,
          count: 4,
        },
        {
          coupon: "นวดคอ บ่า ไหล่",
          price: 300,
          time: 60,
          count: 4,
        },
      ],
    };
  },
};
</script>

<style scoped>
.select {
  max-width: 60px;
  max-height: 60px;
}
</style>
