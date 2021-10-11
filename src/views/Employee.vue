<template>
  <!-- เข้าถึงได้แค่ Employee สามารถเปลี่ยนสถานะคูปองที่ลูกค้าได้เลือกตนเองมาได้เช่นเดียวกับแอดมิน-->
  <v-container>
    <v-row>
      <v-col cols="3">
        <span>Dashboard</span>
        <h2 style="text-align: right">Employee</h2>

        <div
          class="type_select_btn"
          @click="current_component = 'manageUserCoupon'"
        >
          จัดการการจอง
        </div>
      </v-col>
      <v-col>
        <manageUserCoupon v-if="current_component == 'manageUserCoupon'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import manageUserCoupon from "@/components/employee/manage_usercoupon.vue";

export default {
  components: {manageUserCoupon},
  data() {
    return {
      current_component: "manageUserCoupon",
    };
  },
};
</script>

<style scoped>
.type_select_btn {
  padding: 1vh;
  border-radius: 4px;
  margin-bottom: 5px;
  transition: 0.5s;
  cursor: pointer;
}

.type_select_btn:hover {
  background: #d8d8d8;
}
</style>
