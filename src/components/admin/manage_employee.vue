<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>จัดการพนักงาน</h1>
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
      <v-icon> mdi-plus </v-icon>
      เพิ่มพนักงานใหม่
    </v-btn>

    <!-- ADD Employee -->
    <v-dialog v-model="dialog_AddUser" max-width="600px">
      <v-card>
        <v-form
          ref="addUser"
          @submit.prevent="confirmed_addUser"
          v-model="valid"
          lazy-validation
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
                    :rules="[rules.required, rules.min]"
                    hint="At least 8 characters"
                    maxlength="20"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Username"
                    :rules="[rules.required, rules.min]"
                    v-model="addUser.username"
                    hint="At least 8 characters"
                    maxlength="20"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Passowrd"
                    :rules="[rules.required, rules.min]"
                    v-model="addUser.password"
                    hint="At least 8 characters"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6"> </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-container fluid>
            <v-combobox
              :hide-no-data="!search"
              :items="items_in_select"
              :search-input.sync="search_in_select"
              hide-selected
              label="Select type"
              multiple
              small-chips
              solo
              v-model="select"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip label small>
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
            </v-combobox>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_AddUser = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :disabled="
                addUser.name == '' ||
                addUser.username == '' ||
                addUser.password == '' ||
                select == ''
              "
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="user" :search="search">
          <template v-slot:[`item.actions`]="{ item, index }">
            <v-icon
              small
              @click="
                dialog_editUser = !dialog_editUser;
                editUser = item;
                editUser.index = index;
              "
            >
              mdi-pencil
            </v-icon>

            <v-icon small> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog persistent v-model="dialog_editUser" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">แก้ไข Permission</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field label="Name" v-model="editUser.name"
                >Name</v-text-field
              >
            </v-row>
            <v-row>
              <v-text-field label="Password" v-model="editUser.password"
                >Password</v-text-field
              >
            </v-row>
            <v-row>
              <v-container fluid>
                <v-combobox
                  :hide-no-data="!search"
                  :items="items_in_select"
                  :search-input.sync="search_in_select"
                  hide-selected
                  label="Select type"
                  multiple
                  small-chips
                  solo
                  v-model="select"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <span class="subheading">Create</span>
                      <v-chip label small>
                        {{ search }}
                      </v-chip>
                    </v-list-item>
                  </template>
                  <template
                    v-slot:selection="{ attrs, item, parent, selected }"
                  >
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :input-value="selected"
                      label
                      small
                    >
                      <span class="pr-2">
                        {{ item.text }}
                      </span>
                      <v-icon small @click="parent.selectItem(item)">
                        $delete
                      </v-icon>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-container>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_editUser = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add User for Admin -->
  </v-container>
</template>


<script>
import AuthUser from "@/store/AuthUser";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      dialog_AddUser: false,
      dialog_editUser: false,
      dialogDelete: false,
      items: ["ADMIN", "USER"],
      valid: true,
      search: "",
      headers: [
        {
          text: "Username",
          value: "username",
        },
        { text: "Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Action", value: "actions" },
      ],
      user: [
        {
          username: "yokky",
          name: "yok",
          type: "Salon, Laser",
        },
        {
          username: "Bankky",
          name: "Bank",
          type: "Salon",
        },
      ],
      editUser: {},
      addUser: {
        name: "",
        username: "",
        password: "",
        role: "USER",
      },
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },

      select: [],
      activator: null,
      attach: null,
      items_in_select: [
        { header: "Select" },
        {
          text: "Foo",
        },
        {
          text: "Bar",
        },
      ],
      nonce: 1,
      menu: false,
      x: 0,
      search_in_select: null,
      y: 0,
    };
  },

  methods: {
    confirmed_addUser() {
      const token = AuthUser.getters.user.api_token;
      // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjMsImlhdCI6MTYzMzc4OTU0OSwiZXhwIjoxNjMzODI1NTQ5fQ.zHA4y82s3D55TQPcGBcNYUK-hjjDqSzkAKG2uTRbZyw";

      this.$http
        .post("http://127.0.0.1:8000/api/user/", this.addUser, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_AddUser = false;
            Swal.fire("เพิ่มผู้ใช้งานเรียบร้อย", "", "success");
            this.user.push(this.addUser);
            this.addUser = {
              name: "",
              username: "",
              password: "",
              role: "USER",
            };
          } else {
            Swal.fire("ไม่สามารถเพิ่มผู้ใช่งานได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
  },
  created() {},
};
</script>

<style></style>