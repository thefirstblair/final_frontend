<template>
  <v-container>
    <v-row>
      <v-col cols="3">
         <span>Dashboard</span>
          <h2 style="text-align: right">Customers</h2>
        <div class="type_select_btn" @click="current_component = 'Info'">
          บัญชีผู้ใช้
        </div>
        <div class="type_select_btn" @click="current_component = 'Reservations'">
          ประวัติการจองของฉัน
        </div>
        <div class="type_select_btn" @click="current_component = 'PaymentRecord'">
          ประวัติการชำระเงิน
        </div>
      </v-col>
      <v-col cols="8">
        <Info v-if="current_component == 'Info'" />
        <Reservations v-else-if="current_component == 'Reservations'" />
        <PaymentRecord v-else-if="current_component == 'PaymentRecord'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Info from "@/components/customer/info.vue";
import Reservations from "@/components/customer/reservation.vue";
import PaymentRecord from "@/components/customer/payment_record.vue";

export default {
  components: { Info, Reservations, PaymentRecord },
  data() {
    return {
      current_component: "Info",
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

.active {
  background: #f1f1f1;
}
</style>