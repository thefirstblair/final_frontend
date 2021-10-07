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
          @click="lists_select = index; getListData(v.id)"
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
          <v-col
            cols="12"
            style="background: #f1f1f1; margin-bottom: 5px"
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
                  <button class="buy_btn">เพิ่มลงตะกร้า</button>
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
                margin-bottom: 10px;
              "
              v-for="(v, index) in data_review_lists"
              :key="index"
              class="white--text"
            >
              <v-row style="padding: 1vh; padding-left: 3vh">
                {{ v.name_customer }}
              </v-row>
              <v-row class="align-center; justify-center" style="padding: 2vh">
                {{ v.review_desc }}
              </v-row>
              <v-row
                class="align-center; justify-end"
                style="padding: 1vh; padding-right: 3vh"
              >
                {{ v.service_customer }}
              </v-row>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      category_name: "salon",
      category_label: "ซาลอน",
      lists_select: 0,
      category_lists: [
        {
          type_name: "cut",
          type_label: "บริการตัดผม",
        },
        {
          type_name: "dyehair",
          type_label: "บริการย้อมผม",
        },
        {
          type_name: "washhair",
          type_label: "บริการสระผม",
        },
        {
          type_name: "treatmenthair",
          type_label: "บริการทรีทเม้นต์เส้นผม",
        },
      ],
      data: {
        name: "",
        description: "",
        service_image_url: [],
        coupons: [],
      },
      data_review_lists: [
        {
          name_customer: "yok",
          review_desc:
            "first and yok love bankky so much manow have house" +
            " that have many of cats too such as bunroad",
          service_customer: "สระผม",
        },
        {
          name_customer: "first",
          review_desc: "dsfsdfsedfesdfsdfs",
          service_customer: "ตัดผม",
        },
        {
          name_customer: "manow",
          review_desc: "dsfsdfsedfesdfsdf",
          service_customer: "ย้อมผม",
        },
      ],
      services: [],
      type_name: "",
    };
  },
  methods: {
    getListData(id) {
      this.$http
        .get("http://127.0.0.1:8000/api/service/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.data = response.data
          } else {
            console.log(response.error);
          }
        });
    },
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