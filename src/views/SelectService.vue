<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <div style="header">
          <span>หมวดหมู่</span>
          <h2 style="text-align: right">{{ type_name }}</h2>
        </div>
        <div
          class="type_select_btn"
          v-for="(v, index) in services"
          :key="index"
          :class="{ active: index == lists_select }"
          @click="
            lists_select = index;
            getListData(v.id);
          "
        >
          {{ v.name }}
        </div>
      </v-col>

      <v-col>
        <v-row>
          <v-col>
            <img :src="data.service_image_url" style="width: 100%" />
          </v-col>
          <v-col>
            <v-row justify="left" style="margin-top:10px">
              <h1>ชื่อบริการ : {{ data.name }}</h1>
            </v-row>
            <v-row>
              <h3>
               รายละเอียด : {{ data.description }}
              </h3>
            </v-row>
            <v-row>
              <!-- <v-col
                v-for="(v, index) in data.image.slice(1, data.image.length)"
                :key="index"
              >
                <img :src="v" style="width: 100%" />
              </v-col> -->
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1>คูปอง</h1>
            <v-divider></v-divider>
          </v-col>
        </v-row>


        <v-row
          style="overflow-y: auto; max-height: 600px"
          v-if="data.coupons == 0"
        >
          <v-col cols="12" style="background: #f1f1f1; margin-top: 10px">
            <h2 style="text-align: center">ไม่มีคูปองให้แสดง</h2>
          </v-col>
        </v-row>

        <v-row
          style="overflow-y: auto; max-height: 600px"
          v-else-if="data.coupons != []"
        >
          <v-col
            cols="12"
            style="background: #f1f1f1; margin-top: 10px"
            v-for="(v, index) in data.coupons"
            :key="index"
          >
            <v-row class="align-center">
              <v-col cols="8">
                <h2>{{ v.name }}</h2>
                <h3>เวลาที่ใช้ {{ v.time }} นาที</h3>
              </v-col>
              <v-col>
                <v-row class="align-center justify-end">
                  <b>฿ {{ v.price }}</b>

                  <v-btn
                    class="buy_btn"
                    dark
                    outlined
                    @click="
                      dialog_SelectEmployee = true;
                      select_current.item = v;
                    "
                  >
                    เลือกพนักงาน
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>


        <v-row>
          <p style="margin-top: 10px">รีวิวจากผู้ใช้บริการล่าสุด 3 ท่าน</p>
        </v-row>

        <v-row>
        <v-row v-if="data.reviews == 0">
          <v-col cols="12">
            <h2 style="text-align: center;  background: #f1f1f1; height:50px;" >บริการนี้ยังไม่มีรีวิว</h2>
            </v-col> </v-row>
          <v-row v-else-if="data.reviews != []">
            <v-col
              cols="3.5"
              style="
                background: #979292;
                margin-right: 5px;
                margin-left: 5px;
                margin-bottom: 30px;
              "
              v-for="(v, index) in data.reviews"
              :key="index"
              class="white--text"
            >
              <v-rating
                readonly
                v-model="v.score"
                background-color="white"
                color="yellow darken"
                large
              ></v-rating>
              <v-row style="padding: 1vh; padding-left: 3vh">
                {{ v.coupon.name }}
              </v-row>
              <v-row class="align-center; justify-center" style="padding: 2vh">
                {{ v.review_detail }}
              </v-row>
              <v-row
                class="align-center; justify-end"
                style="padding: 1vh; padding-right: 3vh"
              >
                {{ v.user.name }}
              </v-row>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog_SelectEmployee" max-width="500px">
      <v-card>
        <v-form lazy-validation>
          <v-card-title>
            <span class="text-h5">เลือกพนักงานที่ท่านต้องการ</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="d-flex" cols="12">
                  <v-select
                    :items="employees"
                    label="พนักงาน"
                    item-text="name"
                    v-model="select_current.employee"
                    dense
                    outlined
                    return-object
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              :disabled="!select_current.employee.name"
              @click="addToCart"
              text
            >
              เพิ่มลงตะกร้าสินค้า
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog_SelectEmployee = false"
            >
              ยกเลิก
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      select_current: {
        employee: {},
        item: {},
      },
      dialog_SelectEmployee: false,
      category_name: "salon",
      category_label: "ซาลอน",
      lists_select: 0,
      category_lists: [],
      data: {
        name: "",
        description: "",
        service_image_url: [],
        coupons: [],
      },
      data_review_lists: [],
      services: [],
      type_name: "",
      reviews: [],
    };
  },
  methods: {
    getListData(id) {
      this.$http
        .get("http://127.0.0.1:8000/api/service/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.data = response.data;
            console.log(this.data);
          } else {
            console.log(response.error);
          }
        });
    },
    addToCart() {
      // console.log(this.select_current);
      this.$store.commit("addItem", this.select_current);
      this.dialog_SelectEmployee = false;
    },
  },
  created() {
    this.$http
      .get("http://127.0.0.1:8000/api/type/" + this.$route.params.id)
      .then((response) => {
        if (response.status == 200) {
          this.type_name = response.data.name;
          this.services = response.data.services;
          this.employees = response.data.employees;
          this.getListData(response.data.services[0].id);
        } else {
          console.log(response.error);
        }
      });
  },
};
</script>

<style scoped>
.type_select_btn {
  padding: 1vh;
  border-radius: 4px;
  margin-bottom: 5px;
  transition: 0.5s;
  cursor: pointer;
}

.type_select_btn:hover {
  background: #d8d8d8;
}

.active {
  background: #f1f1f1;
}

.buy_btn {
  margin-left: 5vh;
  margin-right: 2vh;
  padding: 1vh;
  padding-left: 2vh;
  padding-right: 2vh;
  background: #2bd598;
}
</style>
