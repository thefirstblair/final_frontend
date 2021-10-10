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
                v-for="(j, index) in v.category_lists"
                :key="index"
            >

                <v-row >
                    {{ j.coupon_name }} x{{ j.count }}
                </v-row>

            </v-col>

            <v-row style="
                margin-top: 3px;
                margin-bottom: 1px;
                margin-right: 10px;"
                class="justify-end"
            >
                ซื้อเมื่อ : {{ v.date }}
            </v-row>

        </v-col>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      record_payment_list: [
        {
          date: "10-9-2021",
          category_lists: [
            {
              coupon_name: "สระไดร์+ตัดผม",
              count: 2,
            },
            {
              coupon_name: "ทาเล็บ",
              count: 1,
            },
          ],
        },

        {
          date: "12-9-2021",
          category_lists: [
            {
              coupon_name: "สปา",
              count: 3,
            },
            {
              coupon_name: "นวดคอ บ่า ไหล่",
              count: 1,
            },
            {
              coupon_name: "สระไดร์",
              count: 2,
            },
          ],
        },
      ],
    };
  },
};
</script>