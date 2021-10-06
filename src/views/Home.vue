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
              <v-btn color="#41ad69" text>
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
// import axios from 'axios';
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
      types:[],
      random_coupon:[],
    };
  },
  methods: {
    // api แบบแรก ใส่ใน created ด้วย

    // getType(){
    //   this.$http.get("http://127.0.0.1:8000/api/type").then((response) => {
    //     if(response.status == 200){
    //       this.types = response.data
    //     }else{
    //       console.log(response.error)
    //     }
    //   });
    // },

    randomCoupon(){
      this.$http.get("http://127.0.0.1:8000/api/coupon/random").then((response) => {
        if(response.status == 200){
          this.random_coupon = response.data
        }else{
          console.log(response.error)
        }
      });
    }
  },
  created() {

    // this.getType();
    this.randomCoupon();

    // fetch

    // fetch("http://127.0.0.1:8000/api/user/login", {
    //   method: "post",
    // headers: {
    //   "Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjUsImlhdCI6MTYzMzU0MTE2OCwiZXhwIjoxNjMzNTc3MTY4fQ.JxmoVXy7ZDBgS96V-E_dUD-ZsSwlImXd-Bhut8QotKk"
    // },
    // }).then((response) =>{
    //   console.log(response);
    // });

    // axios

    // this.$http.get("http://127.0.0.1:8000/api/type",{},{
    //   "Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnb3dhc2FiaS1qd3QiLCJzdWIiOjUsImlhdCI6MTYzMzU0MTE2OCwiZXhwIjoxNjMzNTc3MTY4fQ.JxmoVXy7ZDBgS96V-E_dUD-ZsSwlImXd-Bhut8QotKk"
    // }).then((response) => {
    //   console.log(response.data);
    // });


    // อีกแบบใส่ในนี้เลย
    
      this.$http.get("http://127.0.0.1:8000/api/type").then((response) => {
        if(response.status == 200){
          this.types = response.data
        }else{
          console.log(response.error)
        }
      });
    

  },
};
</script>

<style></style>
