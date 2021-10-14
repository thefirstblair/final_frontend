<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>จัดการพนักงาน</h1>
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      class="mx-2"
      dark
      outlined
      @click="dialog_User = !dialog_User"
    >
      <v-icon> mdi-plus </v-icon>
      เพิ่มพนักงานใหม่
    </v-btn>

    <!-- ADD Employee -->
    <v-dialog v-model="dialog_User" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">เพิ่ม-ลบพนักงาน</span>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-btn class="buy_btn" style="margin-top: 19px" dark outlined>
            ลบ
          </v-btn>
        </v-card-title>

        <v-col style="margin-top: 10px">
          <v-row style="margin-left: 20px; margin-bottom: 10px">
            <v-col
              cols="11"
              style="background: #f1f1f1; margin-top: 10px"
              v-for="(v, index) in employees"
              :key="index"
            >
              <v-row>
                <v-col cols="2.5">
                  <v-row style="margin-left: 5px; margin-top: 1px">
                    Username : {{ v.username }}
                  </v-row>
                  <v-row style="margin-left: 5px; margin-bottom: 1px">
                    Name : {{ v.name }}
                  </v-row>
                </v-col>
                <v-btn class="buy_btn" style="margin-top: 19px" dark outlined>
                  ลบ
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>

    <!-- <v-dialog persistent v-model="dialog_editUser" max-width="600px">
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
    </v-dialog> -->
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      dialog_User: false,
      dialogDelete: false,
      valid: true,
      search: "",
      employees: [
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
    };
  },

  methods: {},
  created() {},
};
</script>

<style>
.buy_btn {
  margin-left: 5vh;
  margin-right: 2vh;
  padding: 1vh;
  padding-left: 2vh;
  padding-right: 2vh;
  background: #2bd598;
}
</style>