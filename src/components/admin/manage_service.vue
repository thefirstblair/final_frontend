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
        <template v-slot:[`item.action`]="{ item }">
          <v-btn color="success" @click="createPacks(item)">เปลี่ยนสถานะ</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
// import axios from 'axios';
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
        { text: "ชื่อ Coupon", value: "name" },
        { text: "Username", value: "username" },
        { text: "วันเวลาที่จอง", value: "date" },
        { text: "สถานะ", value: "coupon_status" },
        { text: "Action", value: "action" },
      ],
      user: [],
      user_id: [],
      items: [
        // {
        //   service_name: "สระผม",
        //   coupon_name: "test",
        //   username: "Thidaporn",
        //   date: "9/29/2021",
        //   status: "ใช้แล้ว",
        // },
      //   {
      //     service_name: "ทำเล็บ",
      //     coupon_name: "test",
      //     username: "Nichatitra",
      //     date: "9/29/2021",
      //     status: "ยังไม่ได้ใช้งาน",
      //   },
      //   {
      //     service_name: "นวดแผนโบราณ",
      //     coupon_name: "test",
      //     username: "Yokky",
      //     date: "9/28/2021",
      //     status: "ยังไม่ได้ใช้งาน",
      //   },
      ],
    };
  },
  methods: {
    getUser() {
      //รับ token admin ใหม่ทุกรอบ
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjEsImlhdCI6MTYzMzYzNDM3NCwiZXhwIjoxNjMzNjcwMzc0fQ.bC5nx9rZUDKv8MG-RJC8yZJLjmS6cvoOlV-T3rPeVKk"

      this.$http.get("http://127.0.0.1:8000/api/user/", {headers:{'Authorization': `${token}` }}).then((response) => {
        if(response.status == 200){
          this.items = response.data
          // console.log(this.user);
          
        }else{
          console.log(response.error)
        }
      })
    },
  //   getUser(id) {
  //     //รับ token admin ใหม่ทุกรอบ
  //     const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjEsImlhdCI6MTYzMzYzNDM3NCwiZXhwIjoxNjMzNjcwMzc0fQ.bC5nx9rZUDKv8MG-RJC8yZJLjmS6cvoOlV-T3rPeVKk"

  //     this.$http.get("http://127.0.0.1:8000/api/user/${id}", {headers:{'Authorization': `${token}` }}).then((response) => {
  //       if(response.status == 200){
  //         this.items = response.data
          
  //       }else{
  //         console.log(response.error)
  //       }
  //     })
  //   },
  },
  created() {
    // รับ token admin ใหม่ทุกรอบ
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjEsImlhdCI6MTYzMzYzNDM3NCwiZXhwIjoxNjMzNjcwMzc0fQ.bC5nx9rZUDKv8MG-RJC8yZJLjmS6cvoOlV-T3rPeVKk"

    this.$http.get("http://127.0.0.1:8000/api/user_coupon/", {headers:{'Authorization': `${token}` }}).then((response) => {
        if(response.status == 200){
          this.items = response.data
          console.log(response.data);
          
          // console.log(this.items);
          // console.log(this.items[0]['coupon_status']);
          // console.log(response.data[0]['coupon_status']);
          // console.log(response.data[1]['coupon_status']);
          // console.log(response.data[2]['coupon_status']);

          for (let i = 0 ; i < this.items.length ; i++) {
            this.user_id[i] = response.data[i]['user_id'];
            console.log(this.user_id[i]);
          }

          // this.getUser()
          // this.getUser(1)

        }else{
          console.log(response.error)
        }
      })

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
