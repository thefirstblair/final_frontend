<template>
  <v-container>
    <v-row>
      <v-col cols="3">
         <span>Dashboard</span>
          <h2 style="text-align: right">Admin</h2>
        <div class="type_select_btn" @click="current_component = 'manage_shop'">
          ตัวจัดการบริการ
        </div>
        <div class="type_select_btn" @click="current_component = 'manage_service'">
          จัดการการจอง / ประวัติ ของลูกค้า
        </div>

        <div class="type_select_btn" @click="current_component = 'manage_user'">
          จัดการผู้ใช้งาน
        </div>
        <div class="type_select_btn" @click="current_component = 'manage_discount'">
          จัดการคูปองส่วนลด
        </div>
        <div class="type_select_btn" @click="current_component = 'manage_employee'">
          จัดการพนักงาน
        </div>
      </v-col>
      <v-col>
        <manageShop v-if="current_component == 'manage_shop'" />
        <manageService v-else-if="current_component == 'manage_service'" />
        <manageUser v-else-if="current_component == 'manage_user'" />
        <manageDiscount v-else-if="current_component == 'manage_discount'" />
        <manageEmployee v-else-if="current_component == 'manage_employee'" />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import manageShop from "@/components/admin/manage_shop.vue";
import manageService from "@/components/admin/manage_service.vue";
import manageUser from "@/components/admin/manage_user.vue";
import manageDiscount from "@/components/admin/manage_discount.vue";
import manageEmployee from "@/components/admin/manage_employee.vue";

export default {
  components: { manageShop, manageService, manageUser, manageDiscount, manageEmployee},
  data() {
    return {
      current_component: "manage_shop",
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
