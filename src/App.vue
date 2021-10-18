<template>
  <v-app>
    <v-main>
      <!-- Task Bar -->
      <v-app-bar app color="#41ad69" dark height="70px">
        <div class="d-flex align-center">
          <h3><a href="/" style="color:white; text-decoration:none;">GoWasabi!</a></h3>
        </div>

        <v-spacer></v-spacer>
<!-- 
        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
        
        </v-btn> -->
  <!--หน้าหลัก-->
        
   <p v-if="isAuthen()" class="name">สวัสดี คุณ {{showUser()}}</p>

        <div v-if="isAuthen()" class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>


            <!-- Item -->
            <v-list>
              <v-list-item v-if="isCustomer()" to="/customer">
                <v-list-item-title>ตั้งค่าผู้ใช้งาน</v-list-item-title>
              </v-list-item>

              <v-list-item v-if="isAdmin()" to="/admin">
                <v-list-item-title>ส่วนจัดการของแอดมิน</v-list-item-title>
              </v-list-item>

               <v-list-item v-if="isEmployee()" to="/employee">
                <v-list-item-title>ส่วนจัดการสำหรับช่าง</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-btn icon v-if="$route.name != 'Payment'" @click="showlogin()">
          <v-badge left
            ><span slot="badge">{{ $store.getters.getCount }}</span>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>

     

        <v-btn v-if="!isAuthen()" icon @click="dialog = true">
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn
          v-if="isAuthen()"
          icon
          @click="
            dialog = false;
            logout();
          "
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- dialog_login -->
      <v-dialog
        v-if="!isAuthen()"
        v-model="dialog"
        max-width="600px"
        min-width="360px"
      >
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="#41ad69"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="#41ad69"></v-tabs-slider>
            <v-tab v-for="(i, index) in tabs" :key="index">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginUsername"
                          :rules="[rules.required]"
                          label="Username"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                        >
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="Name"
                          :rules="[rules.required]"
                          label="Name"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="Username"
                          :rules="[rules.required]"
                          label="Username"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Confirm Password"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="register()"
                          >Register</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>

      <!-- dialog cart -->
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="dialog_cart"
      >
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="#41ad69" dark>ตะกร้าของคุณ</v-toolbar>

            <v-col>
              <v-col
                style="
                  background: #f1f1f1;
                  margin-right: 5px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                "
                v-for="(v, index) in $store.getters.getCarts"
                :key="index"
              >
                <v-row>
                  <v-col cols="9" style="margin-left: 15px">
                    <v-row style="padding: 3px">
                      Coupon name : {{ v.item.name }}
                    </v-row>
                    <v-row style="padding: 3px">
                      Price : {{ v.item.price }}
                    </v-row>
                    <v-row style="padding: 3px">
                      Employee : {{ v.employee.name }}
                    </v-row>
                  </v-col>

                  <v-col cols="2" class="align-center justify-center">
                    <button
                      style="margin-top: 20px; color:red"
                      @click="$store.commit('deleteItem',index)"
                    >
                      delete
                    </button>
                  </v-col>
                </v-row>
              </v-col>

              <v-card-actions class="justify-end">
                <v-row> Total Price : {{ $store.getters.getTotalPrice }} </v-row>
              </v-card-actions>

              <v-row style="margin-top: 15px" class="justify-center">
                <v-btn color="success" larger style="float: right" 
                @click="goToPayment(); dialog.value = false"
                  >ชำระเงิน</v-btn
                >
              </v-row>
            </v-col>

            <!-- button -->
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!-- Show Page -->
      <router-view />
    </v-main>

    <v-footer padless>
      <v-card
        flat
        tile
        width="100%"
        class="text-center"
        style="
          background: #41ad69;

        "
      >
        <v-divider></v-divider>

        <v-col class="white--text">
          <!-- {{ new Date().getFullYear() }} -->
          <strong>GoWasabi!</strong> — ติดต่อสอบถาม โทร. XXX-XXX-XXXX
        </v-col>
        <v-col class="white--text" style="margin-top: -15px">
          ที่ตั้งร้าน. เลขที่ 176 หมู่ที่ 10 ตำบลบ้านยาง อำเภอเกษตรสมบูรณ์
          จังหวัดชัยภูมิ 36120
        </v-col>
        <v-col class="white--text" style="margin-top: -15px">
          จัดทำโดย : คุโรมิ และแก็งค์ศัตรูของมายเมโลดี้
        </v-col>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import AuthUser from "@/store/AuthUser";
//import CartStore from "@/store/CartStore";

export default {
  name: "App",
  data() {
    return {
      dialog: false,
      dialog_cart: false,
      tab: 0,
      tabs: [
        { name: "Login", icon: "mdi-account" },
        { name: "Register", icon: "mdi-account-outline" },
      ],
      valid: true,
      Username: "",
      Name: "",
      password: "",
      verify: "",
      loginPassword: "",
      loginUsername: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
      coupons: [],
      service_lists: [],
      form_login: {
        username: "",
        password: "",
      },
      form_register: {
        username: "",
        name: "",
        password: "",
      },
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  created(){
    // console.log(this.$route.name);
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...

        this.login();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async login() {
      this.form_login.username = this.loginUsername;
      this.form_login.password = this.loginPassword;
      let res = await AuthUser.dispatch("login", this.form_login);
      if (res.success) {
        //login สำเร็จ
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });

        this.clearFormLogin();
        this.clearFormRegister();
      } else {
       if (res.message == 1) {
          //แสดงข้อความ error
          console.log(res.data.error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: res.data.error,
          });
        }
        else{
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: res.message,
          });
        }
      } 
    },
    isAuthen() {
      //เช็คว่าเข้าสู่ระบบอยู่
      if(AuthUser.getters.user===undefined){
        return false;
      }
      else{
        return AuthUser.getters.isAuthen;
      }
      
    },
    logout() {
      AuthUser.dispatch("logout");
      this.$store.commit('clearItem');
      this.$router.push({ path: '/' }).catch(()=>{})
      alert("คุณได้ทำการออกจากระบบเรียบร้อย")
    },
    isCustomer() {
      //เช็คว่าเป็นผู้ใช้ไม
        return this.isAuthen() == true && AuthUser.getters.user.role == "USER";
    },
    isAdmin() {
      //เช็คว่าเป็น Adminไม
        return this.isAuthen() == true && AuthUser.getters.user.role == "ADMIN";
    },
    isEmployee(){
       //เช็คว่าเป็น Employeeไม
        return this.isAuthen() == true && AuthUser.getters.user.role == "EMPLOYEE";
    },
    clearFormLogin() {
      this.loginUsername = "";
      this.loginPassword = "";
    },
    clearFormRegister() {
      this.Username = "";
      this.Name = "";
      this.password = "";
      this.verify = "";
    },
    async register() {
      if(this.$refs.registerForm.validate()){
      this.form_register.username = this.Username;
      this.form_register.name = this.Name;
      this.form_register.password = this.password;
      let res = await AuthUser.dispatch("register", this.form_register);
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "register สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        this.clearFormRegister();
        this.clearFormLogin();
      } else {
        if (res.message == 2) {
          //แสดงข้อความ error
          let tmp="มีข้อมูลของ ";
          console.log(res.data.error);
          for(let error in res.data.error){
             tmp =tmp+" "+ error;
         }
         tmp=tmp+" ไม่สามารถอ่านได้"

          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: tmp,
          });
        }
        else{
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: res.message,
          });
        }
      }
      }
    },
    goToPayment(){
      if (this.$store.state.carts.length > 0){
        this.$router.push('/payment');
      }
      else{
        Swal.fire({
            title: "กรุณาเลือกคูปองก่อนชำระเงิน",
          });
      }
    },
    showlogin(){
       if(this.isAuthen()){
         if(this.isCustomer()){
            this.dialog_cart=true
         }
         else{
          Swal.fire({
            title: "ไม่สามารถดูได้",
          });
         }
       }
       else{
         this.dialog_cart=false
         this.dialog=true
       }
  },
  showUser(){
      return AuthUser.getters.user.name
  },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");

* {
  font-family: "Kanit", sans-serif;
}
.name{
    font-family: "Kanit", sans-serif;
    padding: 15px 10px 0px 10px;
}
</style>
