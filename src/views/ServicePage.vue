<template>
  <v-container>
    <v-row style="margin-top:1vh">
      <h1>Service Name</h1>
    </v-row>

    <v-row>
      <v-col cols="8" style="background:grey">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          size="100%"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>

        <v-row style="background:grey; margin-top:1vh;">
          <v-col v-for="n in 3" :key="n">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="150"
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div v-if="active" class="text-h2 flex-grow-1 text-center">
                    Active
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>

        <v-spacer></v-spacer>
      </v-col>

      <v-spacer> </v-spacer>

      <v-col cols="3" style="background:grey;">
        <h2 style="text-align: center;">Coupon</h2>

        <v-row style="margin-top:1vh;">
          <v-col col="2">
            <v-card color="#385F73" dark style="margin-top=10px">
              <v-card-title class="text-h6">
                สระผม 10 นาที
              </v-card-title>

              <v-card-subtitle>Description: สระผม + ไดร์ผม</v-card-subtitle>

              <v-card-actions>
                <!-- go to หน้าชำระเงิน -->
                <v-btn text>
                  จองเลย
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-card color="#385F73" dark style="margin-top:1vh;">
          <v-card-title class="text-h6">
            สระผม 10 นาที
          </v-card-title>

          <v-card-subtitle>Description: สระผม + ไดร์ผม</v-card-subtitle>

          <v-card-actions>
            <!-- go to หน้าชำระเงิน -->
            <v-btn text>
              จองเลย
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-col>
        <h1 style="text-align: center; margin-top: 1vh">
          ------- คูปองส่วนลด -------
        </h1>

        <v-row>
          <v-col col="2">
            <v-card color="#385F73" dark style="margin-top=10px">
              <v-card-title class="text-h6">
                สระผม 10 นาที
              </v-card-title>

              <v-card-subtitle>Description: สระผม + ไดร์ผม</v-card-subtitle>

              <v-card-actions>
                <!-- go to หน้าชำระเงิน -->
                <v-btn text>
                  จองเลย
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
 

  
        <v-row>
          <v-col col="2">
            <v-card color="#385F73" dark style="margin-top=10px">
              <v-card-title class="text-h6">
                สระผม 10 นาที
              </v-card-title>

              <v-card-subtitle>Description: สระผม + ไดร์ผม</v-card-subtitle>

              <v-card-actions>
                <!-- go to หน้าชำระเงิน -->
                <v-btn text>
                  จองเลย
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        

    <v-row>
      <v-col>
        <h1 style="text-align: center; margin-top: 1vh">
          ------- Review -------
        </h1>

                <v-row>
          <v-col col="2">
            <v-card color="#385F73" dark style="margin-top=10px">
              <v-card-title class="text-h6">
                ดีมาก รักเลย!
              </v-card-title>

              <v-card-subtitle>ชอบมากค่ะ สบายหัวมาก พนักงานดี ร้านสะอาด</v-card-subtitle>

                <v-card-text>
                  โดย หนูรัตน์ บ้านยาง
                </v-card-text>
            
            </v-card>
          </v-col>
        </v-row>
        
        </v-col>
    </v-row>
   
      </v-col>
    </v-row>
  </v-container>
</template>

<script></script>
