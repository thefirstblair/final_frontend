<template>
  <div>
    <v-row>
      <v-col>
        <h1>ตัวจัดการบริการ</h1>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:[`item.action`]>
            <v-icon small class="mr-2" @click="selectCategory">
              mdi-pencil
            </v-icon>
            <v-icon small @click="dialog = !dialog" class>
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- dialog -->

    <v-row justify="center" class="align-center">
      <v-dialog v-model="dialog" scrollable max-width="80%">
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
                    <span style="font-size:1.5vh; text-decoration:underline;"
                      >+เพิ่มคูปอง</span
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
        <v-dialog v-model="dialog2" max-width="600px">
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
                    <v-text-field
                      label="ชื่อคูปอง"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="ราคา"
                      
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="เวลาที่ใช้ (หน่วยเป็นนาที)"
                      
                    >นาที</v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Description" required></v-text-field>
                  </v-col>
               
                  
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog2 = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog2 = false">
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
export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
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
      items: [
        {
          name: "ซาลอน",
          service_count: 10,
          coupon_count: 10,
        },
        {
          name: "ทำเล็บ",
          service_count: 10,
          coupon_count: 10,
        },
        {
          name: "ทรีทเมนท์",
          service_count: 10,
          coupon_count: 10,
        },
      ],
    };
  },
  mounted() {
    this.getListData("cut");
  },
  methods: {
    getListData(type) {
      if (type == "cut") {
        //api request
        //api response
        this.data = {
          title: "บริการตัดผม",
          desc: "ขนมป็อกกาแลต",
          image: [
            "https://i.imgur.com/A4R3m2l.jpeg",
            "https://i.imgur.com/A4R3m2l.jpeg",
            "https://i.imgur.com/A4R3m2l.jpeg",
            "https://i.imgur.com/A4R3m2l.jpeg",
          ],
          services: [
            {
              label: "โกนผม",
              time: 15,
              price: 1000,
            },
            {
              label: "ปลูกผม",
              time: 15,
              price: 1500,
            },
          ],
        };
      }
    },
    selectCategory() {
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
      this.items = [
        {
          name: "บริการตัดผม",
          coupon_count: 10,
        },
        {
          name: "บริการย้อมผม",
          coupon_count: 10,
        },
        {
          name: "บริการสระผม",
          coupon_count: 10,
        },
      ];
    },
  },
};
</script>

<style scoped></style>
