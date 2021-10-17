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
          <v-card-title>
            ยอดรวมทั้งหมด {{ $store.getters.getTotalPrice }} บาท
          </v-card-title>

          <!-- <v-card-title>
            ยอดรวมหลังใช้คูปองทั้งหมด {{ this.cost }} บาท
          </v-card-title> -->

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
                v-for="(v, index) in $store.getters.getCarts"
                :key="index"
              >
                <v-row>
                  <v-col cols="10" style="">
                    <v-row style="padding: 3px">
                      Coupon name : {{ v.item.name }}
                    </v-row>
                    <v-row style="padding: 3px">
                      Price : {{ v.item.price }} บาท
                    </v-row>
                    <v-row style="padding: 3px">
                      Employee : {{ v.employee.name }}
                    </v-row>

                    
                  </v-col>

                  

                  <!-- <v-col cols="2" style="">
                    <v-row> </v-row>
                    <v-row style="text-align: right" class="align-right">
                      {{ v.count }} ชิ้น
                    </v-row>
                  </v-col> -->
                </v-row>
              </v-col>
            </v-col>
          </div>
          <v-divider></v-divider>

          <div style="overflow: auto; max-height: 62vh">
            <v-col style="
                  margin-right: 5px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                ">
              <v-col cols="10" style="">
                <v-row style="padding: 3px">
                  {{ this.textDiscount }} {{ this.codeName }}
                </v-row>
                <!-- <v-row style="padding: 3px">
                  
                </v-row> -->
                <!-- <v-row style="padding: 3px">
                  {{ this.percent }}
                </v-row> -->
              </v-col>
               <v-card-title>
                {{ this.textTotalDis }} {{ this.costText }} 
              </v-card-title>
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
                <v-btn v-bind="attrs" v-on="on" :disabled="countUse == true"> ใช้โค้ดส่วนลด </v-btn>
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
                      @click="checkCode(code_user)"
                      :disabled="code_user == ''"
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
          <v-form
            ref="creditCard"
            @submit.prevent="confirmTest"
            v-model="isFormValid"
            lazy-validation
          >
            <v-card max-width="800" max-height="350">
              <v-card-title
                class="green darken-1 white--text font-weight-black title"
              >
                PAYMENT DETAILS<v-spacer></v-spacer>
              </v-card-title>

              <v-card-text class="pb-10">
                <v-row>
                  <v-col cols="6">
                    <v-subheader
                      class="grey--text text--lighten-1 pl-0 subheader"
                      >CARDHOLDER’S NAME</v-subheader
                    >
                    <v-text-field
                      v-model="credit.cardHolderName"
                      :rules="[rules.required]"
                      hint="At least 8 characters"
                      required
                      single-line
                      outlined
                      label="Johny Relative"
                      hide-details
                    />
                  </v-col>

                  <v-col cols="6">
                    <v-subheader
                      class="grey--text text--lighten-1 pl-0 subheader"
                      >CARD NUMBER</v-subheader
                    >
                    <v-text-field
                      v-model="credit.cardNumber"
                      :rules="[rules.required, rules.minNumber]"
                      hint="At least 8 characters"
                      required
                      single-line
                      outlined
                      mask="credit-card"
                      label="**** **** **** ****"
                      hide-details
                    />
                  </v-col>

                  <v-col col="4">
                    <v-subheader
                      class="grey--text text--lighten-1 pl-0 subheader"
                      >EXPIRE DATE</v-subheader
                    >
                    <v-select
                      required
                      :rules="[rules.required]"
                      v-model="credit.expireMonth"
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
                      required
                      :rules="[rules.required]"
                      hint="At least 8 characters"
                      v-model="credit.expireYear"
                      :items="yearlist"
                      label="Year"
                      outlined
                      hide-details
                    />
                  </v-col>

                  <v-col col="4">
                    <v-subheader
                      required
                      class="grey--text text--lighten-1 pl-0 subheader"
                      >CVV</v-subheader
                    >
                    <v-text-field
                      v-model="credit.cvv"
                      :rules="[rules.required, rules.minCVV]"
                      hint="At least 8 characters"
                      single-line
                      outlined
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-row
              align="center"
              justify="space-around"
              style="margin-top: 5px"
            >
              <v-btn
                :disabled="
                  !isFormValid ||
                    this.credit.cardHolderName == '' ||
                    this.credit.cardNumber == '' ||
                    this.credit.expireMonth == '' ||
                    this.credit.expireYear == '' ||
                    this.credit.cvv == ''
                "
                type="submit"
                x-large
                color="success"
                style="margin-top: 10px"
                >ยืนยันการสั่งซื้อ
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
        <v-row
          v-if="selected == 'Cash'"
          align="center"
          justify="space-around"
          style="margin-top: 5px"
        >
          <v-btn
            @click="confirmTest"
            x-large
            color="success"
            style="margin-top: 10px"
            >ยืนยันการสั่งซื้อ</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DiscountCoupon from "@/store/DiscountCouponStore";
import Swal from "sweetalert2";
import AuthUser from "@/store/AuthUser"
// import axios from 'axios'

export default {
  data() {
    return {
      countUse: false,
      textTotalDis: "",
      textDiscount: "",
      costText: "",
      codeName: "",
      isFormValid: false,
      valid: true,
      code_user: "",
      dialog: false,
      search: "",
      credit: {
        cardHolderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvv: "",
      },
      cost: 0.0,
      rules: {
        required: (value) => !!value || "Required.",
        minNumber: (v) => (v && v.length == 16) || "16 digits",
        minCVV: (v) => (v && v.length == 3) || "3 digits",
      },
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
      service_lists: [],
      records: []
    };
  },

  created() {
    this.fetchDiscount();
  },
  methods: {
    // ยืนยันการสั่งซื้อ
    
    confirmTest() {
      console.log(
        this.credit.cardHolderName,
        this.credit.cardNumber,
        this.credit.expireMonth,
        this.credit.expireYear,
        this.credit.cvv
      );
      // ลบจำนวนคูปองส่วนลด
      DiscountCoupon.dispatch('useDiscountCoupon',DiscountCoupon.getters.thisCoupon.id)
      Swal.fire({
        icon: "success",
        title: "ชำระเงินสำเร็จ",
        showConfirmButton: false,
      });
      
      
      this.records.user_id = AuthUser.getters.user.id
      this.records.items = this.$store.getters.getCarts
    
      for(let i = 0 ; i < this.$store.getters.getCarts.length ; i++) {
        let d = new Date()
        let date = d.getDate()
        let month = d.getMonth() + 1
        let year = d.getFullYear()
        let dateTime = `${date}-${month}-${year}`
        this.records.items[i] = this.records.items[i].item
        this.records.items[i].date = dateTime
      }
  
      console.log(this.records);
      this.$http
      .post("http://127.0.0.1:8000/api/payment_record/", {
        user_id: AuthUser.getters.user.id,
        items: this.$store.getters.getCarts
      })
      .then((response) => {
        if (response.status == 200) {
          console.log("nice");
        } else {
          console.log(response.error);
        }
      });
      console.log(this.records);
      this.$store.commit("clearItem");
      this.$router.push('/')

    },
    fetchDiscount() {
      DiscountCoupon.dispatch("fetchCoupon");
    },
    // เช็ค code ส่วนลดว่าตรงกับใน database ไหม
    checkCode() {
      this.cost = this.$store.getters.getTotalPrice; //เอาเงินรวมทั้งหมดมา
      DiscountCoupon.dispatch("checkCoupon", this.code_user);
      if (DiscountCoupon.getters.success == true) {
        if (DiscountCoupon.getters.thisCoupon.quantity > 0) {
          if (this.cost >= DiscountCoupon.getters.thisCoupon.minimum_cost) {
            let percent = (this.cost * DiscountCoupon.getters.thisCoupon.discount_percent) / 100;
              this.cost = this.cost - percent;
              
            Swal.fire({
              icon: "success",
              title: "สามารถใช้โค้ดส่วนลดได้",
              text: "ท่านได้รับส่วนลด " + percent + " บาท",
              showConfirmButton: true,
            });
            this.countUse = true;
            this.dialog = false;
            this.codeName = this.code_user;
            this.code_user = "";
            this.costText = this.cost;
            this.textDiscount = "คูปองส่วนลด : "
            this.textTotalDis = "ยอดรวมหลังใช้คูปองทั้งหมด"
          } else {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถใช้โค้ดส่วนลดได้",
              text:
                "เนื่องจากยอดชำระไม่ถึง " +
                DiscountCoupon.getters.thisCoupon.minimum_cost +
                " บาท",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถใช้โค้ดส่วนลดได้",
            text: "เนื่องจากโค้ดส่วนลดหมด",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถใช้โค้ดส่วนลดได้",
          text: "เนื่องจากกรอกโค้ดไม่ถูกต้อง",
        });
      }
    },
  },
};
</script>

<style scoped>
.select {
  max-width: 60px;
  max-height: 60px;
}
</style>
