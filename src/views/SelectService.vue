<template>
    <v-container>

        
    <v-row style="margin-top:1vh">
      <h3>บริการ : ทำผม ทั้งหมด 1 ประเภท</h3>
    </v-row>
       
    <v-row style="margin-top:1vh">
        
      <v-spacer> </v-spacer>
      
      <v-col cols="3" style="background:grey;">
          
        <h3 style="text-align: center;">ประเภทบริการ (0)</h3>
            <v-card flat>
                <v-card-text>
                <v-container fluid>
                    <v-row>
                    <v-col>
                        <v-checkbox
                        v-model="ex4"
                        label="ทรีทเมนท์"
                        hide-details
                        ></v-checkbox>
                        <v-checkbox
                        v-model="ex4"
                        label="แต่งหน้า"
                        hide-details
                        ></v-checkbox>
                        <v-checkbox
                        v-model="ex4"
                        label="สปา"
                        hide-details
                        ></v-checkbox>
                        <v-checkbox
                        v-model="ex4"
                        label="สระผม"
                        hide-details
                        ></v-checkbox>
                        <v-checkbox
                        v-model="ex4"
                        label="นวด"
                        hide-details
                        ></v-checkbox>
                        <v-checkbox
                        v-model="ex4"
                        label="ทำเล็บ"
                        hide-details
                        ></v-checkbox>
                    </v-col >
                    </v-row>

                    <v-container style="text-align: center; ">
                        <v-btn text style="background:#41ad69;" class="white--text">
                            Apply filters 
                        </v-btn>
                    </v-container>
                </v-container>
                
                </v-card-text>
            </v-card>
      </v-col>

    <v-spacer>  </v-spacer>

        
      <v-col cols="8" style="background:grey;">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="300"
          max-width="300"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>

        <v-row style="margin-top:1vh;">
          <v-col col="3">
            <v-card color="#385F73" dark style="margin-top=10px">
              <v-card-title text-color="red" class="text-h6" >
                สระไดร์ธรรมดา 
                <v-card-title text-color="red" class="red--text" >
                $ราคา 
                </v-card-title>
              </v-card-title>
              <v-card-subtitle>เวลาที่ใช้</v-card-subtitle>
                <v-container style="text-align:center; ">
                    <v-btn text style="background:#41ad69; " class="white--text">
                        ซื้อคูปอง 
                    </v-btn>
                </v-container>
             
            </v-card>
          </v-col>
        </v-row>
    

        <v-row style="margin-top:1vh;">
          <v-col col="3">
            <v-card color="#385F73" dark style="margin-top=10px">
              <v-card-title text-color="red" class="text-h6" >
                สระแบบผ่อนคลาย 90 นาที 
                <v-card-title text-color="red" class="red--text" >
                $ราคา 
                </v-card-title>
              </v-card-title>
              <v-card-subtitle>เวลาที่ใช้</v-card-subtitle>
                <v-container style="text-align:center; ">
                    <v-btn text style="background:#41ad69; " class="white--text">
                        ซื้อคูปอง 
                    </v-btn>
                </v-container>
             
            </v-card>
          </v-col>
        </v-row>

      </v-col>
      

      <!-- <v-spacer></v-spacer> -->
      
    </v-row>

 
  </v-container>

</template>

<script></script>


