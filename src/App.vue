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

        <v-btn to="/select-service">
          หน้าเลือกบริการ
        </v-btn>

        <v-btn to="/service">
          หน้าบริการ
        </v-btn>

        <v-btn to="/payment">
          หน้าชำระเงิน
        </v-btn>

        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <!-- Item -->
            <v-list>
              <v-list-item to='/booking-customer'>
                <v-list-item-title>การจองของฉัน</v-list-item-title>
              </v-list-item>

              <v-list-item to='/profile'>
                <v-list-item-title>ข้อมูลผู้ใช้</v-list-item-title>
              </v-list-item>

              <v-list-item to='/management'>
                <v-list-item-title>Admin: ข้อมูลบริการ</v-list-item-title>
              </v-list-item>

              <v-list-item to='/reservedlist'>
                <v-list-item-title>Admin: การจองของลูกค้า</v-list-item-title>
              </v-list-item>

            </v-list>
          </v-menu>
        </div>

        <v-btn icon to="/login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Show Page -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
