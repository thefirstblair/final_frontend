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

    <v-row style="margin-top: 1vh">
      <v-col cols="5">
        <v-card
          max-width="550"
          max-height="700"
          style="margin-top: 1vh"
          class="scroll"
        >
          <v-card-title> ยอดรวมทั้งหมด {{ cost }} บาท </v-card-title>

          <v-divider></v-divider>

          <div style="overflow: auto; max-height: 62vh">
            <v-col>
              <v-col
                style="
                  background: #f1f1f1;
                  margin-right: 5px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                "
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
            style="margin-top: 10px"
          ></v-select>

          <v-row justify="end" style="margin: 1px">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on"> ใช้โค้ดส่วนลด </v-btn>
              </template>

              <v-layout column>
                <v-col style="background: #ffffff">
                  <v-row style="margin-top: 10px; margin-left: 10px">
                    <h3>ใช้โค้ดส่วนลด</h3>
                  </v-row>
                  <v-row style="margin-top: 30px">
                    <v-divider></v-divider>
                  </v-row>

                  <v-col class="d-flex" cols="12" justify="end">
                    <v-text-field
                      style="margin-right: 10px; margin-top: 5px"
                      label="กรอกโค้ดของคุณ"
                      v-model="code_user"
                    ></v-text-field>
                  </v-col>

                  <v-row justify="center">
                    <v-btn
                      
                      :disabled="
                        code_user == '' 
                      "
                    >
                      ใช้โค้ด
                    </v-btn>
                  </v-row>

                  <v-row
                    justify="end"
                    style="
                      margin-right: 10px;
                      margin-bottom: 10px;
                      margin-top: 15px;
                    "
                  >
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                  </v-row>
                </v-col>
              </v-layout>
            </v-dialog>
          </v-row>
        </v-col>

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
        <v-row align="center" justify="space-around" style="margin-top: 5px">
          <v-btn x-large color="success" style="margin-top: 10px"
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
      code_user: "",
      dialog: false,
      search: "",
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
      discount: [
        {
          code: "5345436978978",
          discount_percent: 20,
          minimum: 1,
          amount: 1,
        },

        {
          code: "80872324234",
          discount_percent: 10,
          minimum: 2,
          amount: 3,
        },
        {
          code: "054025343542542",
          discount_percent: 15,
          minimum: 1,
          amount: 4,
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
