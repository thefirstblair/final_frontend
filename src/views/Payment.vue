<template>
  <v-container>

    <v-row>
      <h2 class="display-2 mb-4">ตะกร้าของฉัน</h2>
    </v-row>

    <v-card class="mx-auto" tile>
      <v-list>
        <template v-for="(coupon, index) in coupons">
          <v-list-tile :key="coupon.coupon_name">

              <v-list-tile-title v-html="coupon.title"></v-list-tile-title>
            <v-list-tile-sub-title
                v-html="coupon.sub_title"
              ></v-list-tile-sub-title>
            <v-list-tile> ราคา {{ coupon.price }}$ </v-list-tile>

            <v-list-tile-action>
              <v-text-field 
                label="Quantity"
                reverse
                :value="coupon.qty"
              ></v-text-field>
            </v-list-tile-action>

            <v-list-tile> {{ coupon.price * coupon.qty }}$ </v-list-tile>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider
            v-if="index + 1 < coupons.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </v-card>

    <v-container>
      <v-btn color="success" larger style="float: right;">Go to payment</v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    coupons: [
      {
        coupon_name: "ตัดผม",
        title: "ตัดผม",
        sub_title:
          "Our vintage kitchen utenils delight any chef. Made of bamboo by hand",
        price: 14.99,
        qty: 1,
      },
      {
        coupon_name: "kitchen-1",
        title: "QW cooking utensils",
        sub_title:
          "Our vintage kitchen utenils delight any chef. Made of bamboo by hand",
        price: 44.99,
        qty: 2,
      },
      {
        coupon_name: "kitchen-1",
        title: "QW cooking utensils",
        sub_title:
          "Our vintage kitchen utenils delight any chef. Made of bamboo by hand",
        price: 64.99,
        qty: 2,
      },
    ],
  }),
};
</script>

<style scoped></style>
