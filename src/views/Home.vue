<template>
  <v-container>
    <span style="font-size: 40px">GoWasabi</span>
    <span style="font-size: 20px"> เว็ปจองบริการเสริมความงาม</span>

    <v-row justify="center">
      <v-col cols="10"
        ><v-carousel :show-arrows="false" style="margin-top: 20px">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item> </v-carousel
      ></v-col>
    </v-row>

    <v-row>
      <v-col>
        <span class="font-weight-black" style="font-size: 2.5em">
          ประเภทบริการ
        </span>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-tooltip v-for="(v, index) in types" :key="index" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3"
              color="#41ad69"
              fab
              dark
              x-large
              v-bind="attrs"
              v-on="on"
              @click="changePage(v.id)"
            >
              <img style="width: 70%" :src="v.type_image_url" />
            </v-btn>
          </template>
          <span>{{ v.name }}</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <span class="font-weight-black" style="font-size: 2.5em">
          Recommend Coupon
        </span>

        <v-divider></v-divider>
      </v-col>
    </v-row>

    <div>
      <v-row>
        <v-col v-for="(v, index) in random_coupon" :key="index" cols="3">
          <v-card class="mx-auto" width="400" height="200">
            <v-card-title class="pb-0"> ชื่อคูปอง : {{ v.name }} </v-card-title>

            <v-card-text class="text--primary">
              <div>ราคา : {{ v.price }} บาท</div>

              <div>เวลา : {{ v.time }} นาที</div>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-row style="margin-top: -110px; margin-left: -45px" justify="center">
              <v-btn
                class="buy_btn"
                dark
                outlined
                @click="
                  selectEmployee();
                  employees = v.employee;
                  select_current.item = v;
                  select_current.employee = {};
                "
              >
                เลือกพนักงาน
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </div>

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
                    v-model="select_current.employee"
                    label="พนักงาน"
                    item-text="name"
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
              text
              :disabled="!select_current.employee.name"
              @click="addToCart"
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
// comment
//import CartStore from "@/store/CartStore";
import AuthUser from "@/store/AuthUser";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      employees: [],
      select_current: {
        employee: {},
        item: {},
      },
      dialog_SelectEmployee: false,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      types: [],
      random_coupon: [],
    };
  },
  methods: {
    //comment
    addToCart() {
      this.$store.commit("addItem", this.select_current);
      this.select_current = {
        employee: {},
        item: {},
      };
      this.dialog_SelectEmployee = false;
    },
    changePage(id) {
      this.$router.push("/service/" + id);
    },
    randomCoupon() {
      this.$http
        .get("http://127.0.0.1:8000/api/coupon/random")
        .then((response) => {
          if (response.status == 200) {
            this.random_coupon = response.data;
          } else {
            console.log(response.error);
          }
        });
    },
    selectEmployee(){
      if(AuthUser.getters.isAuthen){
        if(AuthUser.getters.user.role==="EMPLOYEE" || AuthUser.getters.user.role ==="ADMIN" ){
          this.dialog_SelectEmployee=false
          Swal.fire('ไม่สามารถเลือกพนักงานได้')
        }
        else{
          this.dialog_SelectEmployee=true
        }
      }
      else{
        Swal.fire('กรุณา Login ก่อน')
      }
    },
  },
  created() {
    this.randomCoupon();

    this.$http.get("http://127.0.0.1:8000/api/type").then((response) => {
      if (response.status == 200) {
        this.types = response.data;
      } else {
        console.log(response.error);
      }
    });
  },
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
