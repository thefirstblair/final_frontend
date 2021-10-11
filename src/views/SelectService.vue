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
            <v-row>
              <h2>{{ data.name }}</h2>
            </v-row>
            <v-row>
              <p>
                {{ data.description }}
              </p>
            </v-row>
            <!-- <v-row>
              <v-col
                v-for="(v, index) in data.image.slice(1, data.image.length)"
                :key="index"
              >
                <img :src="v" style="width: 100%" />
              </v-col>
            </v-row> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1>คูปอง</h1>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row style="overflow-y:auto; max-height:600px;">
          <v-col
            cols="12"
            style="background: #f1f1f1; margin-top:10px"
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
                  <button class="buy_btn" @click="addToCart(v)">เพิ่มลงตะกร้า</button>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <p style="margin-top: 10px">รีวิวจากผู้ใช้บริการล่าสุด 3 ท่าน</p>
        </v-row>

        <v-row>
          <v-row>
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
  </v-container>
</template>

<script>
// comment
// import CartStore from '@/store/CartStore'
// import AuthUser from '@/store/AuthUser'
export default {
  data() {
    return {
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

    // comment 
    // async addToCart(v){
    //   let payload = {
    //     product : v,
    //     quantity : 1
    //   }
    //   let res = await CartStore.dispatch('addProductToCart', payload);
    //   await AuthUser.dispatch('update', res);
    // },
    
  },
  created() {
    this.$http
      .get("http://127.0.0.1:8000/api/type/" + this.$route.params.id)
      .then((response) => {
        if (response.status == 200) {
          this.type_name = response.data.name;
          this.services = response.data.services;
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
