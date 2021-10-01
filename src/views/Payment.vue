<template>
  <v-container>
    <v-row justify="center" style="background:grey; margin:50px">
      <v-col cols="3" style="background:white; margin:40px;">
        <h2 style="text-align: center;">1. การจองของคุณ</h2>
        <v-row style="margin-top:1vh;">
          <v-col col="2">
            <v-card color="#385F73" dark style="margin-top=10px">
              <!-- fix ตัวแปร --> <v-card-title class="text-h6">Gowasabi Nail</v-card-title>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                height="200px"
              ></v-img>
             <!-- fix ตัวแปร --> <v-card-subtitle>Description: ทาสีเจลมือ + เท้า </v-card-subtitle>
              <v-card-subtitle>
              <!-- fix ตัวแปร --> <p>ราคา : 1000 THB</p>

               <!-- fix ตัวแปร --> <p>วันที่จอง: 2021-09-20</p>
              
              </v-card-subtitle>
              <v-card-subtitle
                ><img
                  src="https://img.icons8.com/material-outlined/24/000000/clock--v1.png"
                />60 min</v-card-subtitle
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="3" style="background:white; margin:40px;">
        <h2 style="text-align: center;">2. รายละเอียด</h2>
        <v-row style="margin-top:1vh;">
          <v-col col="2">
           <!-- fix ตัวแปร --> <v-text>
              Username: หนูรัตน์ บ้านยาง
              <!-- item.username -->
            </v-text>
          </v-col>
        </v-row>

       <!-- fix ตัวแปร --> <v-text class="text-h6">
          ยอดที่ต้องชำระ: 1000 THB
        </v-text>

        <div style="margin:10px">
          <p>ช่องทางการชำระเงิน</p>
         
         <!-- fix label --> <v-checkbox
            v-model="checkbox"
            :error-messages="errors"
            value="1"
            label="ชำระเงินหน้าร้าน" 
            type="checkbox"
            required
          ></v-checkbox>
        </div>
      </v-col>

      <v-col cols="3" style="margin:40px;">
        <h2 style="text-align: center;">หากมีข้อสงสัยติดต่อที่ XXX-XXX-XXXX</h2>
        <v-row style="margin-top:2vh;">
          <v-col col="2">
            <v-card color="#c7c7c7" dark style="margin-top=10px">
              <v-card-title class="text-h6">
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="errors"
                  value="1"
                  label="ข้อมูลถูกต้องครบถ้วน"
                  type="checkbox"
                  required
                ></v-checkbox>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-btn style="margin:60px;">
          ยืนยันการจอง
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
