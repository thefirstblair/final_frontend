<template>
  <v-container>
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

    <!-- EDIT USER (EDIT ได้แค่ Name และ Permission)-->
    <v-row justify="center">
      <v-dialog v-model="dialog_editUser" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            แก้ไขผู้ใช้
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">แก้ไข</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Name" required></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select :items="items" label="Permission" dense></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_editUser = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog_editUser = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- Add User for Admin -->
      <v-dialog v-model="dialog_AddUser" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            เพิ่มผู้ใช้
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">เพิ่มผู้ใช้</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Username"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Passowrd"></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select :items="items" label="Permission" dense></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_AddUser = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog_AddUser = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog_AddUser: false,
      dialog_editUser: false,
      search: "",
      items: ['ADMIN','USER']
    ,
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
