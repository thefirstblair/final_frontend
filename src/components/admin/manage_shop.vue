<template>
  <div>
    <v-row>
      <v-col>
        <h1>ตัวจัดการบริการ</h1>

        <v-icon v-if="isInType" @click="backToType">
          mdi-arrow-left
        </v-icon>

        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              class="mx-2"
              dark
              outlined
              @click="dialog_addType = !dialog_addType"
            >
              <v-icon>
                mdi-plus
              </v-icon>
              Add Type
            </v-btn></v-col
          ></v-row
        >

        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:[`item.action`]="{ item, index }">
            <v-icon v-if="!isInType" small @click="selectType(item.id)">
              mdi-magnify-plus
            </v-icon>
            <v-icon
              small
              @click="
                dialog_editType = true;
                editType = item;
                editType.index = index;
              "
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click="removeType(item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- dialog -->
    <v-row justify="center" class="align-center">
      <v-dialog v-model="dialog_fixService" scrollable max-width="80%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            แก้ไขบริการ
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row class="align-center">
                <v-col>
                  <img
                    src="https://i.imgur.com/A4R3m2l.jpeg"
                    style="width: 80%"
                  />
                </v-col>
                <v-col>
                  <v-row class="align-center">
                    <v-col cols="12">
                      <!-- <input type="text" value="หัวข้อของเนื้อหา" /> -->
                      <h2>หัวข้อของเนื้อหา</h2>
                    </v-col>
                    <v-col cols="12">
                      <!-- <textarea style="width:100%;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus officia cupiditate veritatis voluptas. Adipisci assumenda ullam modi exercitationem enim consequatur dolorem. Quos vitae quisquam doloribus accusamus consequuntur? Esse, voluptas unde.</textarea> -->
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Animi omnis magnam deleniti quas, totam illo
                        accusantium voluptatem debitis ipsa enim dolorum
                        accusamus molestias aut voluptas molestiae fuga nam,
                        corporis quos.
                      </p>
                      <br />
                      <span style="font-size:1.5vh; text-decoration:underline;"
                        >แก้ไขเนื้อหา</span
                      >
                      <!-- <span style="font-size:1.5vh; text-decoration:underline; margin-left:1vh;">บันทึก</span>
                      <span style="font-size:1.5vh; text-decoration:underline; margin-left:1vh;">ยกเลิกการแก้ไข</span> -->
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <img
                        src="https://i.imgur.com/A4R3m2l.jpeg"
                        style="width: 100%"
                      />
                    </v-col>
                    <v-col>
                      <img
                        src="https://i.imgur.com/A4R3m2l.jpeg"
                        style="width: 100%"
                      />
                    </v-col>
                    <v-col>
                      <img
                        src="https://i.imgur.com/A4R3m2l.jpeg"
                        style="width: 100%"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <!-- จัดการคูปอง เดี้ยวเอาไปใส่ -->
              <v-row>
                <v-col>
                  <span
                    >ส่วนจัดการคูปอง
                    <v-btn
                      text
                      style="font-size:1.5vh; text-decoration:underline;"
                      @click="dialog_addCoupon = !dialog_addCoupon"
                      class
                      >+เพิ่มคูปอง</v-btn
                    >
                  </span>
                </v-col>
              </v-row>

              <v-divider />
              <v-row style="margin-top:2vh">
                <v-col
                  cols="12"
                  style="background: #f1f1f1; margin-bottom: 5px"
                  v-for="(v, index) in data.services"
                  :key="index"
                >
                  <v-row class="align-center">
                    <v-col cols="8">
                      <h2>{{ v.label }}</h2>
                      <h3>เวลาที่ใช้ {{ v.time }} นาที</h3>
                      <b>฿ {{ v.price }}</b>
                    </v-col>
                    <v-col>
                      <v-row
                        class="align-center justify-end"
                        style="margin-right:1vh"
                      >
                        <span
                          style="font-size:1.5vh; text-decoration:underline;"
                          >แก้ไข</span
                        >
                        <v-spacer></v-spacer>
                        <span
                          style="font-size:1.5vh; text-decoration:underline;"
                          >ลบ</span
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Add Coupon / Fix Coupon -->
      <v-row justify="center">
        <v-dialog v-model="dialog_addCoupon" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Add Coupon
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">เพิ่มคูปอง</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="ชื่อคูปอง" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="ราคา"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="เวลาที่ใช้ (หน่วยเป็นนาที)"
                      >นาที</v-text-field
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog_addCoupon = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog_addCoupon = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Add Type -->
      <v-row justify="center">
        <v-dialog v-model="dialog_addType" max-width="600px">
          <v-card>
            <v-form
              ref="addType"
              @submit.prevent="confirmed_addType"
              v-model="valid"
              lazy-validation
            >
              <v-card-title>
                <span class="text-h5">เพิ่มประเภท</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="ชื่อประเภท"
                        required
                        v-model="addType.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="addType.type_image_url"
                        required
                        label="URL เพื่อแสดงไอค่อนหน้าเว็ป"
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
                  @click="dialog_addType = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                  :disabled="addType.name == '' || addType.type_image_url == ''"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Type Fix -->
      <v-row justify="center">
        <v-dialog v-model="dialog_editType" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">แก้ไข</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editType.name"
                      label="ชื่อประเภท"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editType.type_image_url"
                      required
                      label="URL เพื่อแสดงไอค่อนหน้าเว็ป"
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
                @click="dialog_editType = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog_editType = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Add Service -->
      <v-row justify="center">
        <v-dialog v-model="dialog_AddService" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Add Service
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">เพิ่ม Service</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="ชื่อ Service" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Description" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="URL Image"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog_AddService = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog_AddService = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      valid: true,
      dialog_fixService: false,
      dialog_addCoupon: false,
      dialog_addType: false,
      dialog_AddService: false,
      dialog_editType: false,

      isInType: false,
      search: "",
      headers: [
        {
          text: "หมวดหมู่",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "จำนวนบริการ", value: "service_count" },
        { text: "จำนวนคูปอง", value: "coupon_count" },
        { text: "Action", value: "action" },
      ],
      data: {
        title: "",
        desc: "",
        image: [],
        services: [],
      },
      editType: { name: "", type_image_url: "" },
      addType: {
        name: "",
        type_image_url: "",
        service_count: 0,
        coupon_count: 0,
      },
      items: [],
    };
  },
  mounted() {},
  methods: {
    // Type
    confirmed_addType() {
      const token = AuthUser.getters.user.api_token;

      this.$http
        .post("http://127.0.0.1:8000/api/type/", this.addType, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_addType = false;
            Swal.fire("เพิ่มเรียบร้อย", "", "success");
            this.items.push(this.addType);
            this.addUser = {
              name: "",
              type_image_url: "",
            };
          } else {
            Swal.fire("ไม่สามารถเพิ่มผู้ใช่งานได้", "", "error");
            console.log(response.data.error);
          }
        });
    },

    removeType(id, index) {
      const token = AuthUser.getters.user.api_token;

      this.$http
        .delete("http://127.0.0.1:8000/api/type/" + id, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("ลบเรียบร้อย", "", "success");
            this.items.splice(index, 1);
          } else {
            Swal.fire("ไม่สามารถลบได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    selectType(id) {
      this.items = [];
      this.isInType = true;
      this.headers = [
        {
          text: "ชื่อบริการ",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "จำนวนคูปอง", value: "coupon_count" },
        { text: "Action", value: "action" },
      ];

      this.$http
        .get("http://127.0.0.1:8000/api/type/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.items = response.data.services;
          } else {
            console.log(response.error);
          }
        });
    },
    backToType() {
      this.isInType = false;
      this.headers = [
        {
          text: "หมวดหมู่",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "จำนวนบริการ", value: "service_count" },
        { text: "จำนวนคูปอง", value: "coupon_count" },
        { text: "Action", value: "action" },
      ];
      this.items = [];
      this.getAllType();
    },
    getAllType() {
      this.$http.get("http://127.0.0.1:8000/api/type/").then((response) => {
        if (response.status == 200) {
          this.items = response.data;
          console.log(this.items);
        } else {
          console.log(response.error);
        }
      });
    },
  },
  created() {
    this.getAllType();
  },
};
</script>

<style scoped></style>
