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

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

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

  data: () => ({
    //
  }),
};
</script>
