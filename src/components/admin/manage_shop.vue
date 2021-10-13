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
              v-if="!isInType"
              @click="dialog_addType = !dialog_addType"
            >
              <v-icon>
                mdi-plus
              </v-icon>
              Add Type
            </v-btn></v-col
          ></v-row
        >

        <v-row>
          <v-col>
            <v-btn
              color="primary"
              class="mx-2"
              dark
              outlined
              v-if="isInType"
              @click="dialog_addService = !dialog_addService"
            >
              <v-icon>
                mdi-plus
              </v-icon>
              Add Service
            </v-btn></v-col
          ></v-row
        >

        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:[`item.action`]="{ item, index }">
            <v-icon
              v-if="!isInType"
              small
              @click="
                selectType(item.id);
                current_type = item.id;
              "
            >
              mdi-magnify-plus
            </v-icon>

            <v-icon
              small
              @click="
                !isInType
                  ? openEditType(item, index)
                  : openEditService(item, index)
              "
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="!isInType ? removeType(item.id) : removeService(item.id)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Edit Service -->
    <v-row justify="center" class="align-center">
      <v-dialog v-model="dialog_editService" scrollable max-width="80%">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row class="align-center">
                <v-col v-if="!edit">
                  <v-img
                    :src="editService.service_image_url"
                    style="width: 80%"
                  />
                </v-col>

                <v-col v-if="edit">
                  <h4>แก้ไขรูปภาพ</h4>
                  <v-text-field v-model="editService_edit.service_image_url" />
                </v-col>

                <v-col>
                  <v-row class="align-center">
                    <v-col cols="12">
                      <h1>หัวข้อบริการ</h1>
                      <br />
                      <v-text-field
                        v-if="edit"
                        type="text"
                        v-model="editService_edit.name"
                      />
                      <h2 v-else>{{ editService.name }}</h2>
                      <br />
                    </v-col>

                    <v-col cols="12">
                      <h1>รายละเอียด</h1>
                      <v-textarea
                        auto-grow
                        v-if="edit"
                        style="max-height:200px; max-width:600px"
                        v-model="editService_edit.description"
                      ></v-textarea>
                      <p v-else>
                        {{ editService.description }}
                      </p>
                      <br />

                      <span
                        v-if="!edit"
                        style="font-size:1.5vh; text-decoration:underline;"
                        @click="
                          edit = true;
                          editService_edit.name = editService.name;
                          editService_edit.description =
                            editService.description;
                          editService_edit.service_image_url =
                            editService.service_image_url;
                        "
                        >แก้ไขเนื้อหา</span
                      >
                      <span
                        v-if="edit"
                        style="font-size:1.5vh; text-decoration:underline; margin-left:1vh;"
                        @click="confirmed_editService"
                        >บันทึก</span
                      >
                      <span
                        v-if="edit"
                        @click="edit = false"
                        style="font-size:1.5vh; text-decoration:underline; margin-left:1vh;"
                        >ยกเลิกการแก้ไข</span
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

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
                  v-for="(item, index) in coupons"
                  :key="index"
                >
                  <v-row class="align-center">
                    <v-col cols="8">
                      <h2>{{ item.name }}</h2>
                      <h3>เวลาที่ใช้ {{ item.time }} นาที</h3>
                      <b>฿ {{ item.price }}</b>
                    </v-col>
                    <v-col>
                      <v-row
                        class="align-center justify-end"
                        style="margin-right:1vh"
                      >
                        <span
                          style="font-size:1.5vh; text-decoration:underline;"
                          @click="
                            dialog_editCoupon = !dialog_editCoupon;
                            editCoupon.id = item.id;
                            editCoupon.name = item.name;
                            editCoupon.price = item.price;
                            editCoupon.time = item.time;
                            editCoupon.index = index;
                          "
                          >แก้ไข</span
                        >
                        <v-spacer></v-spacer>
                        <span
                          style="font-size:1.5vh; text-decoration:underline;"
                          @click="removeCoupon(item.id, index)"
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

      <!-- Add Coupon-->
      <v-row justify="center">
        <v-dialog v-model="dialog_addCoupon" max-width="600px">
          <v-form
            ref="AddCoupon"
            @submit.prevent="confirmed_addCoupon"
            v-model="valid"
            lazy-validation
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">เพิ่มคูปอง</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="addCoupon.name"
                        value="addCoupon.name"
                        label="ชื่อคูปอง"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="addCoupon.price"
                        type="number"
                        value="addCoupon.price"
                        label="ราคา"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="addCoupon.time"
                        type="number"
                        value="addCoupon.time"
                        label="เวลาที่ใช้ (หน่วยเป็นนาที)"
                        required
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
                  type="submit"
                  :disabled="
                    addCoupon.name == '' ||
                      addCoupon.time == '' ||
                      addCoupon.price == ''
                  "
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>

      <!-- Edit Coupon -->
      <v-row justify="center">
        <v-dialog v-model="dialog_editCoupon" max-width="600px">
          <v-card>
            <v-form
              ref="editCoupon"
              @submit.prevent="confirmed_editCoupon"
              v-model="valid"
              lazy-validation
            >
              <v-card-title>
                <span class="text-h5">แก้ไขคูปอง</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="ชื่อคูปอง"
                        required
                        v-model="editCoupon.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editCoupon.price"
                        label="ราคา"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editCoupon.time"
                        label="เวลาที่ใช้ (หน่วยเป็นนาที)"
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
                  @click="dialog_editCoupon = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                  :disabled="
                    editCoupon.name == '' ||
                      editCoupon.price == 0 ||
                      editCoupon.time == 0
                  "
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
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

      <!-- Edit Type -->
      <v-row justify="center">
        <v-dialog v-model="dialog_editType" max-width="600px">
          <v-form
            ref="editType"
            @submit.prevent="confirmed_editType"
            v-model="valid"
            lazy-validation
          >
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
                  type="submit"
                  :disabled="
                    editType.name == '' || editType.type_server_url == ''
                  "
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>

      <!-- Add Service -->
      <v-row justify="center">
        <v-dialog v-model="dialog_addService" max-width="600px">
          <v-card>
            <v-form
              ref="addService"
              @submit.prevent="confirmed_addService"
              v-model="valid"
              lazy-validation
            >
              <v-card-title>
                <span class="text-h5">เพิ่ม Service</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="addService.name"
                        label="ชื่อ Service"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="addService.description"
                        label="Description"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="addService.service_image_url"
                        label="URL Image"
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
                  @click="dialog_addService = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                  :disabled="
                    addService.name == '' ||
                      addService.description == '' ||
                      addService.service_image_url == ''
                  "
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
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
      dialog_editService: false,
      dialog_addCoupon: false,
      dialog_addType: false,
      dialog_addService: false,
      dialog_editType: false,
      dialog_editCoupon: false,
      current_type: 0,
      current_service: 0,
      edit: false,
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

      // Type
      editType: {
        name: "",
        type_image_url: "",
        service_count: 0,
        coupon_count: 0,
      },
      addType: {
        name: "",
        type_image_url: "",
        service_count: 0,
        coupon_count: 0,
      },

      // Service
      addService: {
        name: "",
        description: "",
        service_image_url: "",
        coupon_count: 0,
      },

      editService: {
        name: "",
        description: "",
        service_image_url: "",
      },

      editService_edit: {
        name: "",
        description: "",
        service_image_url: "",
      },

      // Coupon
      addCoupon: {
        name: "",
        price: 0,
        time: 0,
      },
      editCoupon: { name: "", price: 0, time: 0 },
      coupons: [],
      items: [],
    };
  },
  methods: {
    openEditService(item,index) {
      this.dialog_editService = true;
      this.editService = item;
      this.editService.index = index;
      this.current_service = item.id;

      console.log(item);

      this.$http
        .get("http://127.0.0.1:8000/api/service/" + item.id)
        .then((response) => {
          if (response.status == 200) {
            this.coupons = response.data.coupons;
          } else {
            console.log(response.error);
          }
        });
    },
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
            response.data.coupon_count = 0;
            response.data.service_count = 0;
            this.items.push(response.data);
            this.addType = {
              name: "",
              type_image_url: "",
            };
          } else {
            Swal.fire("ไม่สามารถเพิ่ม Type ได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    openEditType(item, index) {
      this.dialog_editType = true;
      this.editType.id = item.id;
      this.editType.service_count = item.service_count;
      this.editType.coupon_count = item.coupon_count;
      this.editType.name = item.name;
      this.editType.type_image_url = item.type_image_url;
      this.editType.index = index;
    },
    confirmed_editType() {
      const token = AuthUser.getters.user.api_token;
      this.$http
        .put(
          "http://127.0.0.1:8000/api/type/" + this.editType.id,
          this.editType,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("แก้ไขเรียบร้อย", "", "success");
            this.items.splice(this.editType.index, 1, response.data);
            this.dialog_editType = false;
          } else {
            Swal.fire("ไม่สามารถแก้ไขได้", "", "error");
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

    // Service
    confirmed_addService() {
      const token = AuthUser.getters.user.api_token;
      this.addService.type_id = this.current_type;
      this.$http
        .post("http://127.0.0.1:8000/api/service/", this.addService, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            console.log(response);
            this.dialog_addService = false;
            Swal.fire("เพิ่มเรียบร้อย", "", "success");
            response.data.coupon_count = 0;
            this.items.push(response.data);
            this.addService = {
              name: "",
              description: "",
              service_image_url: "",
            };
          } else {
            Swal.fire("ไม่สามารถเพิ่มได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    removeService(id, index) {
      const token = AuthUser.getters.user.api_token;

      this.$http
        .delete("http://127.0.0.1:8000/api/service/" + id, {
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

    confirmed_editService() {
      this.edit = false;
      const token = AuthUser.getters.user.api_token;

      this.$http
        .put(
          "http://127.0.0.1:8000/api/service/" + this.editService.id,
          this.editService_edit,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("แก้ไขเรียบร้อย", "", "success");
            this.items[this.editService.index].name = response.data.name;
            this.editService_edit.index = this.editService.index;
            this.editService = response.data;
            this.editService.index = this.editService_edit.index;
            this.editService_edit = {};
          } else {
            Swal.fire("ไม่สามารถแก้ไขได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    // Coupon
    confirmed_addCoupon() {
      const token = AuthUser.getters.user.api_token;
      this.addCoupon.service_id = this.current_service;
      this.addCoupon.type_id = this.current_type;
      this.addCoupon.price = Number(this.addCoupon.price);
      this.addCoupon.time = Number(this.addCoupon.time);

      this.$http
        .post("http://127.0.0.1:8000/api/coupon/", this.addCoupon, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            this.dialog_addCoupon = false;
            Swal.fire("เพิ่มเรียบร้อย", "", "success");
            this.coupons.push(response.data);
            this.addCoupon = {
              name: "",
              price: 0,
              time: 0,
            };
          } else {
            Swal.fire("ไม่สามารถเพิ่มได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    confirmed_editCoupon() {
      const token = AuthUser.getters.user.api_token;
      this.editCoupon.price = Number(this.editCoupon.price);
      this.editCoupon.time = Number(this.editCoupon.time);
      this.$http
        .put(
          "http://127.0.0.1:8000/api/coupon/" + this.editCoupon.id,
          this.editCoupon,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("แก้ไขเรียบร้อย", "", "success");
            this.coupons.splice(this.editCoupon.index, 1, response.data);
            this.dialog_editCoupon = false;
          } else {
            Swal.fire("ไม่สามารถแก้ไขได้", "", "error");
            console.log(response.data.error);
          }
        });
    },
    removeCoupon(id, index) {
      const token = AuthUser.getters.user.api_token;

      this.$http
        .delete("http://127.0.0.1:8000/api/coupon/" + id, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          if (response.data && response.data.status != "error") {
            Swal.fire("ลบคูปองนี้เรียบร้อย", "", "success");
            this.coupons.splice(index, 1);
          } else {
            Swal.fire("ไม่สามารถลบคูปองได้", "", "error");
            console.log(response.data.error);
          }
        });
    },

    // etc ..
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
