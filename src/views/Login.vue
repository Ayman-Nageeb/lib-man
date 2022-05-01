<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-row>
      <v-col>
        <v-card
          class="pa-6 pt-0 ma-2 mt-2 mx-auto radius-12"
          elevation=""
          max-width="520"
          outlined
          :loading="loading"
          @keydown.enter="login"
        >
          <v-card-title class="pb-0 pt-2">
            <v-spacer></v-spacer>

            <v-img max-width="250" :src="require('../assets/logo.jpg')"></v-img>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-title class="">
            <v-spacer></v-spacer>
            <span class="primary--text font-weight-black">تسجيل الدخول </span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-title class="pt-0 mb-4">
            <v-spacer></v-spacer>
            <span class="blue--text headline"
              >قم بتسجيل الدخول بحسابك لدينا</span
            >
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-text-field
              type="text"
              placeholder="أدخل اسم المستخدم الخاص بك"
              label="إسم المستخدم"
              prepend-inner-icon="mdi-account"
              outlined
              v-model="userName"
              :error-messages="userNameErrors"
            >
            </v-text-field>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              placeholder="أدخل كلمة المرور الخاصة بك"
              label="كلمة المرور"
              prepend-inner-icon="mdi-lock"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="password"
              :error-messages="passwordErrors"
            ></v-text-field>

            <v-alert
              :border="responseAlert.border"
              outlined
              prominent
              :type="responseAlert.type"
              v-if="responseAlert.show"
            >
              <ul>
                <li
                  v-for="(message, index) of responseAlert.messages"
                  :key="index"
                >
                  {{ message }}
                </li>
              </ul>
            </v-alert>
          </v-card-text>

          <v-card-actions class="mt-0 px-4">
            <v-btn
              block
              color="indigo"
              x-large
              dark
              @click="login"
              :loading="loading"
            >
              تسجيل الدخول
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.radius-12 {
  border-radius: 20px !important;
}
</style>


<script>
export default {
  data: () => ({
    showPassword: false,
    userName: "",
    password: "",
    userNameErrors: [],
    passwordErrors: [],
    loading: false,
    responseAlert: {
      show: false,
      messages: [],
      type: "warning",
      border: "left",
    },
  }),
  created() {
    this.responseAlert.border = "right";
  },
  methods: {
    login() {
      //remove all errors
      this.userNameErrors = [];
      this.passwordErrors = [];
      //set request data
      const userName = this.userName.trim().toLowerCase();
      const password = this.password;
      //hide response alert
      this.responseAlert.show = false;
      // try to login
      if (userName == "") {
        this.userNameErrors.push("ادخل اسم المستخدم");
        return;
      }
      if (password.trim() == "") {
        this.passwordErrors.push("ادخل كلمة المرور");
        return;
      }

      let users = this.$store.getters["Users/users"];
      for (let user of users) {
        if (userName == user.user_name.trim().toLowerCase()) {
          if (password == user.password) {
            this.$store.commit("Users/setAuthentication", user);
            this.$router.push({ name: "Home" });
            return true;
          }
        }
      }
      this.responseAlert.messages.push("خطأ في اسم المستخدك او كلمة المرور");
      this.responseAlert.type = "error";
      this.responseAlert.show = true;
    },
  },
};
</script>

<style>
</style>