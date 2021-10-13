<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>จัดการคูปองส่วนลด</h1>
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
      @click="dialog_AddDiscount = !dialog_AddDiscount"
    >
      <v-icon> mdi-plus </v-icon>
      Add New Discount Coupon
    </v-btn>

    <!-- ADD Discount Coupon -->
    <v-dialog v-model="dialog_AddDiscount" max-width="600px">
      <v-card>
        <v-form ref="addUser" lazy-validation>
          <v-card-title>
            <span class="text-h5">เพิ่มคูปองส่วนลด</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Code"
                    v-model="addDiscount.code"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Discount Percent"
                    v-model="addDiscount.discount"
                    :rules="[rules.numberDiscount]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Minimum"
                    v-model="addDiscount.minimum"
                    :rules="[rules.number]"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Amount"
                    v-model="addDiscount.amount"
                    :rules="[rules.number]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_AddDiscount = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="
                addDiscount.code == '' ||
                addDiscount.discount == '' ||
                addDiscount.minimum == '' ||
                addDiscount.amount == ''
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
          <template v-slot:[`item.actions`]="{ }">
            <v-icon
              small
              @click="
                dialog_editDiscount = !dialog_editDiscount;
              "
            >
              mdi-pencil
            </v-icon>

            <v-icon small> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- EDIT USER (EDIT ได้แค่ Name และ Permission)-->

    <v-dialog persistent v-model="dialog_editDiscount" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">แก้ไข</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols=3>
              <v-text-field v-model="user.amount" label="Amount"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text> Save </v-btn>
          <v-btn color="blue darken-1" text @click="dialog_editDiscount = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add User for Admin -->
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      dialog_AddDiscount: false,
      dialog_editDiscount: false,
      search: "",
      headers: [
        {
          text: "Code",
          value: "code",
        },
        { text: "Discount Percent", value: "discount" },
        { text: "Minimum", value: "minimum" },
        { text: "Amount", value: "amount" },
        { text: "Action", value: "actions" },
      ],
      user: [
        {
          code: "161561546501",
          discount: 20,
          minimum: 2,
          amount: 3,
        },
        {
          code: "34535430102",
          discount: 15,
          minimum: 2,
          amount: 2,
        },
        {
          code: "87387504535",
          discount: 30,
          minimum: 1,
          amount: 5,
        },
      ],
      addDiscount: {
        code: "",
        discount: 0,
        minimum: 0,
        amount: 0,
      },
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
        numberDiscount: (v) => {
          if (!v.trim()) return true;
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 100) return true;
          return "Number has to be between 0 and 100";
        },
        number: (v) => {
          if (!v.trim()) return true;
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
          return "Only numeric and not too much";
        },
      },
    };
  },
  methods: {
    
  },
  created() {},
};
</script>

<style></style>