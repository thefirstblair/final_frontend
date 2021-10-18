<template>
  <v-container>
    <v-row style="margin-top: 5px">
      <v-col cols="3">
        <span>Dashboard</span>
        <h1 style="text-align: right; background: #e0fff4">Customers</h1>

        <div
          class="type_select_btn"
          v-for="(v, index) in list_compo"
          :key="index"
          :class="{ active: index == lists_select }"
          @click="
            current_component = v.name;
            lists_select = index;
          "
        >
          {{ v.name_l }}
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
      lists_select: 0,
      list_compo: [
        {
          name: "Info",
          name_l: "บัญชีผู้ใช้",
        },
        {
          name: "Reservations",
          name_l: "ประวัติการจองของฉัน",
        },
        {
          name: "PaymentRecord",
          name_l: "ประวัติการชำระเงิน",
        },
      ],
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