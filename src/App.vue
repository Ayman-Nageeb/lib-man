<template>
  <v-app>
    <v-app-bar v-if="isUserAuthenticated" app dark>
      <div class="d-flex align-center">
        <v-btn
          route
          :to="{ name: 'Books' }"
          color="primary"
          class="mx-1"
          text
          large
          rounded
          >الكتب</v-btn
        >
        <v-btn color="primary" class="mx-1" text large rounded>الاستعارة</v-btn>
        <v-btn
          route
          :to="{ name: 'Users' }"
          color="primary"
          class="mx-1"
          text
          large
          rounded
          >المستخدمين</v-btn
        >
      </div>

      <v-spacer></v-spacer>

      <v-btn large color="error" class="font-weight-bold" text @click="logout">
        <span class="mr-2" left>تسجيل الخروج</span>
        <v-icon right>mdi-rotate-180 mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="pt-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["Users/isAuthenticated"];
    },
  },
  methods: {
    logout() {
      this.$store.commit("Users/setLoggedOut");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
