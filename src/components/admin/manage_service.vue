<template>
  <v-row>
    <v-col>
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
        <template v-slot:[`item.action`]="{ item }">
          <v-btn color="success" @click="createPacks(item)">เปลี่ยนสถานะ</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ชื่อ Service",
          align: "start",
          sortable: false,
          value: "service_name",
        },
        { text: "ชื่อ Coupon", value: "coupon_name" },
        { text: "Username", value: "username" },
        { text: "วันเวลาที่จอง", value: "date" },
        { text: "สถานะ", value: "status" },
        { text: "Action", value: "action" },
      ],
      items: [
        {
          service_name: "สระผม",
          coupon_name: "test",
          username: "Thidaporn",
          date: "9/29/2021",
          status: "ใช้แล้ว",
        },
        {
          service_name: "ทำเล็บ",
          coupon_name: "test",
          username: "Nichatitra",
          date: "9/29/2021",
          status: "ยังไม่ได้ใช้งาน",
        },
        {
          service_name: "นวดแผนโบราณ",
          coupon_name: "test",
          username: "Yokky",
          date: "9/28/2021",
          status: "ยังไม่ได้ใช้งาน",
        },
      ],
    };
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
