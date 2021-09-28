<template>
  <v-container>
    <span style="font-size:40px;">การจองของฉัน</span>

    <v-row>
      <v-col style="background:grey; height:750px; margin-top:5vh">
        <v-row>
          <!-- LOOP -->
          <v-col
            ref="vcol"
            v-for="item in items"
            :key="item.id"
        cols="12"
          >
          
            <!-- เอามาจาก data น่าจะส่ง data นี้มาด้วย -->
            <v-card color="blue" dark style="margin:10px;">
              <v-card-title class="text-h6">
                  <label for="name">
                <td>{{ item.name }}</td>
                  </label>
              </v-card-title>

              <v-card-subtitle>
                  <label for="description">
                      <td>
                      {{item.description}}</td></label>
            </v-card-subtitle>

               <v-card-subtitle>
                  <label for="code">
                    รหัสคูปอง : 
                      <td>
                      {{item.code}}</td></label>
            </v-card-subtitle>

              <label for="status">
                  <v-card-subtitle>สถานะ: 
                  <td>{{item.status}}</td>
                  </v-card-subtitle>
              </label>
<v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          รีวิวเลย!
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">รีวิวบริการ</span>
        </v-card-title>
        <v-card-text>
          <v-container>
           <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          outlined
          label="Outlined textarea"
          rows="5"
        ></v-textarea>
      </v-col>
          </v-container>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
              

              
             </v-card>
      
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            items:[{name:'สระผม', description: 'สระผมพร้อมนวด 90 นาที',code: '25223', status:'ใช้แล้ว'},
            {name:'ทำเล็บ', description: 'ทำเล็บเจล',code: '15923', status:'ยังไม่ได้ใช้'}]
       
            , dialog: false,
    
        }
    }
};
</script>

<style>

</style>