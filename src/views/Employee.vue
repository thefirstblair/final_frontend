<template>
  <!-- เข้าถึงได้แค่ Employee สามารถเปลี่ยนสถานะคูปองที่ลูกค้าได้เลือกตนเองมาได้เช่นเดียวกับแอดมิน-->
  <v-container>
    <v-row style="margin-top: 5px">
      <v-col cols="3">
        <span>Dashboard</span>
        <h1 style="text-align: right; background: #e0fff4">Employee</h1>

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
      <v-col>
        <manageUserCoupon v-if="current_component == 'manageUserCoupon'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import manageUserCoupon from "@/components/employee/manage_usercoupon.vue";

export default {
  components: { manageUserCoupon },
  data() {
    return {
      current_component: "manageUserCoupon",
      lists_select: 0,
      list_compo: [
        {
          name: "manageUserCoupon",
          name_l: "จัดการการจอง",
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
