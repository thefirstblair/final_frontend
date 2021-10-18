<template>
  <v-container>
    <v-row style="margin-top: 5px">
      <v-col cols="3">
        <span>Dashboard</span>
        <h1 style="text-align: right; background: #e0fff4">Admin</h1>

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
        <manageShop v-if="current_component == 'manage_shop'" />
        <manageService v-else-if="current_component == 'manage_service'" />
        <manageUser v-else-if="current_component == 'manage_user'" />
        <manageDiscount v-else-if="current_component == 'manage_discount'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import manageShop from "@/components/admin/manage_shop.vue";
import manageService from "@/components/admin/manage_service.vue";
import manageUser from "@/components/admin/manage_user.vue";
import manageDiscount from "@/components/admin/manage_discount.vue";

export default {
  components: { manageShop, manageService, manageUser, manageDiscount },
  data() {
    return {
      current_component: "manage_shop",
      lists_select: 0,
      list_compo: [
        {
          name: "manage_shop",
          name_l: "จัดการบริการ",
        },
        {
          name: "manage_service",
          name_l: "จัดการประวัติการจองของลูกค้า",
        },
        {
          name: "manage_user",
          name_l: "จัดการผู้ใช้งาน",
        },
        {
          name: "manage_discount",
          name_l: "จัดการคูปองส่วนลด",
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
