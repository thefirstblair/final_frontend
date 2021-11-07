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
      @click="dialog_addDiscount = true"
    >
      <v-icon> mdi-plus </v-icon>
      Add New Discount Coupon
    </v-btn>

    <!-- ADD Discount Coupon -->
    <v-dialog v-model="dialog_addDiscount" max-width="600px">
      <v-card>
        <v-form
          v-model="addDiscountValid"
          @submit.prevent="confirmed_addDiscount"
        >
          <v-card-title>
            <span class="text-h5">เพิ่มคูปองส่วนลด</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Code"
                    v-model="addDiscount.specific_code"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Discount Percent"
                    v-model="addDiscount.discount_percent"
                    :rules="[rules.numberDiscount]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Minimum"
                    v-model="addDiscount.minimum_cost"
                    :rules="[rules.number]"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6" md="4">
                  <v-text-field
                    label="Amount"
                    v-model="addDiscount.quantity"
                    :rules="[rules.number]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog_addDiscount = false"
            >
              Close
            </v-btn>
            <v-btn
              type="submit"
              color="blue darken-1"
              text
              :disabled="!addDiscountValid"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:[`item.actions`]="{ item, index }">
            <v-icon
              small
              @click="
                dialog_editDiscount = true;
                editDiscount.id = item.id;
                editDiscount.quantity = item.quantity;
                editDiscount.index = index;
              "
            >
              mdi-pencil
            </v-icon>

            <v-icon small @click="deleteDiscount(item.id, index)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- EDIT DISCOUNT COUPON (EDIT ได้แค่ Amount(quantity))-->

    <v-dialog v-model="dialog_editDiscount" max-width="600px">
      <v-card>
        <v-form
          v-model="editDiscountValid"
          @submit.prevent="confirmed_editDiscount"
        >
          <v-card-title>
            <span class="text-h5">แก้ไข</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="editDiscount.quantity"
                    type="number"
                    label="Amount"
                    :rules="[rules.number]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :disabled="!editDiscountValid"
            >
              Save
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog_editDiscount = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      addDiscountValid: false,
      editDiscountValid: false,
      dialog_addDiscount: false,
      dialog_editDiscount: false,
      search: "",
      headers: [
        {
          text: "Code",
          value: "specific_code",
        },
        { text: "Discount Percent", value: "discount_percent" },
        { text: "Minimum", value: "minimum_cost" },
        { text: "Amount", value: "quantity" },
        { text: "Action", value: "actions" },
      ],
      items: [],
      addDiscount: {
        specific_code: "",
        discount_percent: 0,
        minimum_cost: 0,
        quantity: 0,
      },
      editDiscount: {
        quantity: 0,
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
        numberDiscount: (v) => {
          if (!v.trim) return true;
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 100) return true;
          return "Number has to be between 0 and 100";
        },
        number: (v) => {
          if (!v.trim) return true;
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
          return "Only numeric and not too much";
        },
      },
    };
  },
  methods: {
    // เพิ่มคูปองส่วนลด
    confirmed_addDiscount() {
      const token = AuthUser.getters.user.api_token;

      this.$http
        .post("https://se-api-pond.herokuapp.com/api/discount_coupon/", this.addDiscount, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_addDiscount = false;
            Swal.fire("เพิ่มคูปองส่วนลดเรียบร้อย", "", "success");
            this.items.push(response.data);
            this.addDiscount = {
              specific_code: "",
              discount_percent: "",
              minimun_cost: "",
              quantity: "",
            };
          } else {
            Swal.fire("ไม่สามารถเพิ่มคูปองส่วนลดได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    // แก้ไขจำนวนคูปองส่วนลด
    confirmed_editDiscount() {
      const token = AuthUser.getters.user.api_token;

      this.$http
        .put(
          "https://se-api-pond.herokuapp.com/api/discount_coupon/" + this.editDiscount.id,
          this.editDiscount,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("แก้ไขคูปองส่วนลดเรียบร้อย", "", "success");
            this.items.splice(this.editDiscount.index, 1, response.data);
            this.dialog_editDiscount = false;
          } else {
            Swal.fire("ไม่สามารถแก้ไขคูปองส่วนลดได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    // ลบคูปองส่วนลด
    deleteDiscount(id, index) {
      Swal.fire({
        title: 'คุณแน่ใจว่าจะลบ?',
        text: "การลบจะไม่สามารถคืนสิ่งที่ลบได้",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่ฉันแน่ใจ'
      }).then((result) => {
      if (result.isConfirmed) {
           const token = AuthUser.getters.user.api_token;

          this.$http
          .delete("https://se-api-pond.herokuapp.com/api/discount_coupon/" + id, {
              headers: { Authorization: `${token}` },
          })
          .then((response) => {
            if (response.data && response.data.status != "error") {
              Swal.fire("ลบคูปองส่วนลดเรียบร้อย", "", "success");
              this.items.splice(index, 1);
          } else {
            Swal.fire("ไม่สามารถลบคูปองส่วนลดได้", "", "error");
            console.log(response.data.error);
          }
          });
        }
      })
   
    },
  },
  // ดึงข้อมูลจาก discount coupon
  created() {
    const token = AuthUser.getters.user.api_token;

    this.$http
      .get("https://se-api-pond.herokuapp.com/api/discount_coupon", {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          this.items = response.data;

        } else {
          console.log(response.error);
        }
      });
  },
};
</script>

<style></style>
