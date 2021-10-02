<template>
  <v-container>
    <v-row>
      <v-col cols="3.5" >
        <h2 style="text-align: center">การจองของคุณ</h2>
        <v-col
          style="background: #dfdfdf; margin-top: 10px"
          class="align-center; justify-center"
        >
          <v-row class="align-center; justify-center">
            <h3 style="margin: 15px">{{ form_service.service_name }}</h3>
          </v-row>
          <v-row>
            <img :src="form_service.data_images" style="width: 100%" />
          </v-row>
          <v-row style="margin-top: 30px" class="align-center; justify-center">
            Description : {{ form_service.description }}
          </v-row>
          <v-row style="margin-top: 35px" class="align-center; justify-center">
            ราคา : {{ form_service.price }} บาท
          </v-row>
          <v-row style="margin-top: 20px" class="align-center; justify-center">
            วันที่จอง : {{ form_service.date_time }}
          </v-row>
          <v-row
            style="margin-top: 35px; margin-bottom: 15px"
            class="align-center; justify-center"
          >
            <img
              src="https://img.icons8.com/material-outlined/24/000000/clock--v1.png"
            />
            {{ form_service.time }} นาที
          </v-row>
        </v-col>
      </v-col>

      <v-col cols="3.5" >
        <h2 style="text-align: center">รายละเอียด</h2>
        <v-col
          style="background: #dfdfdf; margin-top: 10px"
          class="align-center; justify-center"
        >
          <v-row style="margin-top: 20px" class="align-center; justify-center">
            User name : {{ form_user.user_name }}
          </v-row>
          <v-row style="margin-top: 25px" class="align-center; justify-center">
            <h3 class="red--text">
              ยอดที่ต้องชำระ : {{ form_service.price }} บาท
            </h3>
          </v-row>

          <v-row style="margin-top: 25px" class="align-center; justify-center">
            <div style="margin: 20px">
              <p>- ช่องทางการชำระเงิน</p>
              <v-checkbox
                v-model="checkbox"
                :error-messages="errors"
                value="1"
                label="ชำระเงินหน้าร้าน"
                type="checkbox"
                required
              ></v-checkbox>
            </div>
          </v-row>

          <v-row style="margin-top: 30px" class="align-center; justify-center">
            <h2 style="text-align: center">
              หากมีข้อสงสัย ติดต่อที่ XXX-XXX-XXXX
            </h2>
          </v-row>

          <v-col
            style="background: #dfdfdf; margin-top: 20px"
            class="align-center; justify-center"
          >
            <v-row
              style="margin-top: 25px; margin-bottom: 25px"
              class="align-center; justify-center"
            >
              <v-checkbox
                v-model="checkbox"
                :error-messages="errors"
                value="1"
                label="ข้อมูลถูกต้องครบถ้วน"
                type="checkbox"
                required
              ></v-checkbox>
            </v-row>

            <v-row
              style="margin-top: 25px; margin-bottom: 25px"
              class="align-center; justify-center"
            >
              <v-btn
                style="background: #2bd598; margin-top: 15px"
                class="white--text"
              >
                ยืนยันการจอง
              </v-btn>
            </v-row>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form_service: {
        service_name: "Gowasabi nail",
        category_label: "โกวาซาบิ ทำเล็บ",
        description: "ทาสีเจลมือ + เท้า",
        data_images: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        price: 1000,
        date_time: "2021-09-20",
        time: 60,
      },
      form_user: {
        user_name: "หนูรัตน์ บ้านยาง",
      },
    };
  },
};
</script>

<style>
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
