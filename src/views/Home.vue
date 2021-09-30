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
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3"
              color="purple"
              fab
              dark
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/cleansing.png"
              />
            </v-btn>
          </template>
          <span>ทรีทเม้นท์</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3"
              color="purple"
              fab
              dark
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/cosmetic-brush.png"
              />
            </v-btn>
          </template>
          <span>แต่งหน้า</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3"
              color="purple"
              fab
              dark
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/aroma.png"
              />
            </v-btn>
          </template>
          <span>สปา</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3"
              color="purple"
              fab
              dark
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/barbershop.png"
              />
            </v-btn>
          </template>
          <span>ซาลอน</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3"
              color="purple"
              fab
              dark
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <img src="https://img.icons8.com/ios-filled/50/000000/massage.png"/>
            </v-btn>
          </template>
          <span>นวด</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3"
              color="purple"
              fab
              dark
              x-large
              v-bind="attrs"
              v-on="on"
            >
           <img src="https://img.icons8.com/ios-filled/50/000000/manicure.png"/>
            </v-btn>
          </template>
          <span>ทำเล็บ</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <span class="font-weight-black" style="font-size: 2.5em;">
          Recommend Service
        </span>
      </v-col>
    </v-row>

    <div>
      <v-row>
        <v-col v-for="v in 4" :key="v" cols="3">
          <v-card class="mx-auto" max-width="400" style="margin-">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>บริการ</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              ประเภทบริการ : สระผม
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>สระผม 90 นาที</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>
                Share
              </v-btn>

              <v-btn color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
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
    };
  },
};
</script>

<style></style>
