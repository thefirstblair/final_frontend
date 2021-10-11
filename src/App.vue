<template>
  <v-app>
    <v-main>
      <!-- Task Bar -->
      <v-app-bar app color="#41ad69" dark height="70px">
        <div class="d-flex align-center">
          <h3>GoWasabi!</h3>
        </div>

        <v-spacer></v-spacer>

        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
          <!--หน้าหลัก-->
        </v-btn>

        <v-btn to="/payment"> หน้าชำระเงิน </v-btn>

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
                <v-list-item-title>Customer</v-list-item-title>
              </v-list-item>

              <v-list-item v-if="isAdmin()" to="/admin">
                <v-list-item-title>Admin Dashboard</v-list-item-title>
              </v-list-item>

               <!-- <v-list-item v-if="isEmployee()" to="/employee">
                <v-list-item-title>Employee</v-list-item-title>
              </v-list-item> -->
            </v-list>
          </v-menu>
        </div>

        <v-btn icon @click="dialog_cart = true">
          <v-badge left
            ><span slot="badge">{{ cartItemCount }}</span>
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
            dialog = true;
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
                          label="Username"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'eye' : 'eye-off'"
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

            <!-- code yokkkk -->
            <v-col>
              <v-col
                style="
                  background: #f1f1f1;
                  margin-right: 5px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                "
                v-for="(v, index) in cart"
                :key="index"
              >
                <v-row>
                  <v-col cols="9" style="margin-left: 15px">
                    <v-row style="padding: 3px">
                      Coupon name : {{ v.product.name }}
                    </v-row>
                    <v-row style="padding: 3px">
                      Price : {{ v.product.price }}
                    </v-row>
                    <v-row style="padding: 3px">
                      Time : {{ v.product.time }}
                    </v-row>
                  </v-col>

                  <v-col cols="2" class="align-center justify-center">
                    {{ v.quantity }} ชิ้น
                    <button
                      style="margin-top: 20px; color:red"
                      @click.prevent="deleteCoupon(v.product)"
                    >
                      delete
                    </button>
                  </v-col>
                </v-row>
              </v-col>

              <v-card-actions class="justify-end">
                <v-row> Total : {{ cartTotalPrice }} </v-row>
              </v-card-actions>

              <v-row style="margin-top: 15px" class="justify-center">
                <v-btn color="success" larger style="float: right"
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
import CartStore from "@/store/CartStore";

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

      coupons: [
        {
          coupon_name: "ตัดผม",

          sub_title:
            "Our vintage kitchen utenils delight any chef. Made of bamboo by hand",
          price: 14.99,
          qty: 1,
        },
        {
          coupon_name: "kitchen-1",
          title: "QW cooking utensils",
          sub_title:
            "Our vintage kitchen utenils delight any chef. Made of bamboo by hand",
          price: 44.99,
          qty: 2,
        },
        {
          coupon_name: "kitchen-1",
          title: "QW cooking utensils",
          sub_title:
            "Our vintage kitchen utenils delight any chef. Made of bamboo by hand",
          price: 64.99,
          qty: 2,
        },
      ],

      service_lists: [
        // {
        //   coupon: "สระไดร์ + ตัดผม",
        //   price: 350,
        //   time: 45,
        //   count: 1,
        // },
        // {
        //   coupon: "ทาสีเล็บมือ + เล็บเท้า",
        //   price: 200,
        //   time: 20,
        //   count: 2,
        // },
        // {
        //   coupon: "นวดคอ บ่า ไหล่",
        //   price: 300,
        //   time: 60,
        //   count: 4,
        // },
        // {
        //   coupon: "นวดคอ บ่า ไหล่",
        //   price: 300,
        //   time: 60,
        //   count: 4,
        // },
      ],
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
    cart() {
      return CartStore.state.data;
    },
    cartTotalPrice() {
      return CartStore.getters.cartTotalPrice;
    },
    cartItemCount() {
      return CartStore.getters.cartItemCount;
    },
  },
  
  // comment
  // mounted(){
  //   const thisInstance = this
  //   this.$root.$on('addToCartEvent', function(v){
  //     thisInstance.addToCart(v)
  //   });
  //   CartStore.dispatch('restoreCart');
  // },

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
      }
    },
    isAuthen() {
      //เช็คว่าเข้าสู้ระบบอยู่
      return AuthUser.getters.isAuthen;
    },
    logout() {
      AuthUser.dispatch("logout");
    },
    isCustomer() {
      //เช็คว่าเป็นผู้ใช้ไม
      if (AuthUser.getters.user == null) {
        //  console.log("BBB")
        return this.isAuthen() == true;
      } else {
        //  console.log("AAA")
        return this.isAuthen() == true && AuthUser.getters.user.role == "USER";
      }
    },
    isAdmin() {
      //เช็คว่าเป็น Adminไม
      if (AuthUser.getters.user == null) {
        return this.isAuthen() == true;
      } else {
        return this.isAuthen() == true && AuthUser.getters.user.role == "ADMIN";
      }
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
      } else {
        if (res.message == 2) {
          //แสดงข้อความ error
          console.log(res.data.error);

          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: res.data.error.username[0],
          });
        }
      }
    },

    // ลบของออกจากตะกร้า comment
    // async deleteCoupon(product) {
    //   CartStore.dispatch("deleteCoupon", product);
    //   let cartData =  CartStore.getters.cartData;
    //   await AuthUser.dispatch('update', cartData);
    // },

    // cash(){
    //   if (this.service_lists.length==0){
    //     Swal.fire("กรุณาเลือกคูปองก่อนชำระเงิน");
    //   }
    // }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");

* {
  font-family: "Kanit", sans-serif;
}
</style>
