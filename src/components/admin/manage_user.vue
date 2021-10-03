<template>
  <v-row>
    <v-col>
      <h1>รายชื่อผู้ใช้งาน</h1>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="user" :search="search">
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
          text: "Username",

          value: "username",
        },

        { text: "Name", value: "name" },
        { text: "Permission", value: "permission" },
      ],
      user: [
        {
          username: "Manowniinow",
          name: "มะนาวสวย",
          permission: "Customer",
        },
        {
          username: "Yokky",
          name: "อีอ้วน",
          permission: "Customer",
        },
        {
          username: "NooRat101",
          name: "ธิดาพร ชาวคูเวียง",
          permission: "Admin",
        },
      ],
    };
  },
};
</script>

<style></style>
