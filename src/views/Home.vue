<template>
  <v-container>
    <span style="font-size:40px;">GoWasabi</span>
    <span style="font-size:20px"> เว็ปจองบริการเสริมความงาม</span>

    <v-row justify="center">
      <v-col cols="10"
        ><v-carousel :show-arrows="false" style="margin-top:20px">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item> </v-carousel
      ></v-col>
    </v-row>

    <v-row>
      <v-col>
        <span class="font-weight-black" style="font-size: 2.5em;">
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
              <img style="width:70%;" :src="v.type_image_url" />
            </v-btn>
          </template>
          <span>{{ v.name }}</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <span class="font-weight-black" style="font-size: 2.5em;">
          Recommend Coupon
        </span>

        <v-divider></v-divider>
      </v-col>
    </v-row>

    <div>
      <v-row>
        <v-col v-for="(v, index) in random_coupon" :key="index" cols="3">
          <v-card class="mx-auto " width="400" height="200">
            <v-card-title class="pb-0"> ชื่อคูปอง : {{ v.name }} </v-card-title>

            <v-card-text class="text--primary">
              <div>ราคา : {{ v.price }} บาท</div>

              <div>เวลา : {{ v.time }} นาที</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="#41ad69" text @click="addToCart(v)">
                Add to cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// comment
// import CartStore from "@/store/CartStore";
// import AuthUser from "@/store/AuthUser";
export default {
  data() {
    return {
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
    // async addToCart(v) {
    //   let payload = {
    //     product: v,
    //     quantity: 1,
    //   };
    //   let res = await CartStore.dispatch("addProductToCart", payload);
    //   await AuthUser.dispatch("update", res);
    // },

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

<style></style>
