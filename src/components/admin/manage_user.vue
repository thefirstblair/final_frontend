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
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      class="mx-2"
      dark
      outlined
      @click="dialog_AddUser = !dialog_AddUser"
    >
      <v-icon>
        mdi-plus
      </v-icon>
      Add New User
    </v-btn>

    <!-- ADD USER -->
    <v-dialog v-model="dialog_AddUser" max-width="600px">
      <v-card>
        <v-form
          ref="addUser"
          @submit.prevent="confirmed_addUser"
          v-model="addUserValid"
        >
          <v-card-title>
            <span class="text-h5">เพิ่มผู้ใช้</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Name"
                    v-model="addUser.name"
                    :rules="[(v) => !!v || 'โปรดใส่ชื่อผู้ใช้']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Username"
                    :rules="[(v) => !!v || 'โปรดใส่ Username']"
                    v-model="addUser.username"
                    maxlength="20"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Password"
                    :rules="[rules.required, rules.min]"
                    v-model="addUser.password"
                    hint="At least 8 characters"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="items"
                    label="Permission"
                    v-model="addUser.role"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_AddUser = false; addUser.role='USER'; addUser.name='';addUser.username='';addUser.password=''; show1=false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :disabled="!addUserValid"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="getUser" :search="search">
          <template v-slot:[`item.actions`]="{ item, index }">
            <v-icon
              small
              @click="
                dialog_editUser = !dialog_editUser;
                editUser.id = item.id;
                editUser.name = item.name;
                editUser.username = item.username;
                editUser.role = item.role;
                editUser.index = index;
              "
            >
              mdi-pencil
            </v-icon>

            <v-icon small @click="deleteUser(item.id, index)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- EDIT USER (EDIT ได้แค่ Name และ Permission)-->

    <v-dialog v-model="dialog_editUser" max-width="600px">
      <v-form ref="editinfo" @submit.prevent = "updateUser" v-model="editUserValid">
      <v-card>
        <v-card-title>
          <span class="text-h5">แก้ไข Permission</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field label="Name" v-model="editUser.name" :rules="[(v) => !!v || 'โปรดใส่ชื่อผู้ใช้']"
                >Name</v-text-field
              >
            </v-row>
            <v-row>
              <v-text-field label="Password" v-model="editUser.password" 
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                >Password</v-text-field
              >
            </v-row>
            <v-row>
              <v-select
                :items="items"
                label="Permission"
                v-model="editUser.role"
                :rules="[(v) => !!v || 'โปรดใส่ role']"
              ></v-select>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="dialog_editUser = false; editUser.password=''; show1=false">
            Close
          </v-btn>
          <v-btn
            :disabled="!editUserValid"
            color="blue darken-1"
            text
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      editUserValid: false,
      addUserValid:false,
      defaultItem: { name: "", username: "", role: "" },
      dialog_AddUser: false,
      dialog_editUser: false,
      dialogDelete: false,
      search: "",
      items: ["ADMIN", "USER", "EMPLOYEE"],
      valid: true,
      headers: [
        {
          text: "Username",
          value: "username",
        },
        { text: "Name", value: "name" },
        { text: "Permission", value: "role" },
        { text: "Action", value: "actions" },
      ],
      user: [],
      editUser: {},
      addUser: {
        name: "",
        username: "",
        password: "",
        role: "USER",
      },
      show1: false,
      rules: {
        required: (value) => !!value || "Required Password.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  computed: {
    getUser() {
      return this.user;
    },
  },
  methods: {
    confirmed_addUser() {
      const token = AuthUser.getters.user.api_token;
      this.$http
        .post("http://127.0.0.1:8000/api/user/", this.addUser, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_AddUser = false;
            Swal.fire("เพิ่มผู้ใช้งานเรียบร้อย", "", "success");
            this.user.push(response.data.data);
            console.log(response.data.data)
            console.log(this.user)
            this.addUser = {
              name: "",
              username: "",
              password: "",
              role: "USER",
            };
          } else {
            Swal.fire("ไม่สามารถเพิ่มผู้ใช้งานได้ โปรดตรวจสอบ Username กับ Password ของท่านอีกครั้ง", "", "error");
            console.log(response.data.error);
          }
        });
    },
    updateUser() {
      console.log(this.$refs.editinfo)
      if(this.$refs.editinfo.validate()){
      const token = AuthUser.getters.user.api_token;
      this.$http
        .put(
          "http://127.0.0.1:8000/api/user/" + this.editUser.id,
          this.editUser,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.user.splice(this.editUser.index, 1, response.data);
            Swal.fire("แก้ไขเรียบร้อย", "", "success");
          } else {
            Swal.fire("ไม่สามารถแก้ไขผู้ใช้งานได้ โปรดตรวจสอบอีกครั้ง", "", "error");
            console.log(response.data.error);
          }
        });
        this.editUser.password=""
        this.dialog_editUser=false
      }
    },
    deleteUser(id, index) {
      const token = AuthUser.getters.user.api_token;
      console.log(id)
      console.log(index)
      this.$http
        .delete("http://127.0.0.1:8000/api/user/" + id, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("ลบผู้ใช้นี้เรียบร้อย", "", "success");
            this.user.splice(index, 1);
          } else {
            Swal.fire("ไม่สามารถลบผู้ใช้งานได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
  },
  created() {
    const token = AuthUser.getters.user.api_token;
    this.$http
      .get("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.data && response.data.status != "error") {
          this.user = response.data;
        } else {
          console.log(response.data.error);
        }
      });
  },
};
</script>

<style></style>
