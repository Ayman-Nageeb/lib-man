<template>
  <v-dialog
    v-model="show"
    scrollable
    persistent
    max-width="900px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title> إضافة كتاب </v-card-title>
      <v-divider class="my-2 mb-6"></v-divider>
      <v-card-text class="py-3">
        <v-row>
          <v-col>
            <v-text-field
              type="text"
              placeholder="أدخل الاسم"
              label="الاسم"
              prepend-inner-icon="mdi-account-outline"
              outlined
              v-model="name"
              :error-messages="nameErrors"
            />
          </v-col>
          <v-col>
            <v-text-field
              type="text"
              placeholder="أدخل اسم المستخدك"
              label="اسم المستخدم"
              prepend-inner-icon="mdi-account"
              outlined
              v-model="userName"
              :error-messages="userNameErrors"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
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
          </v-col>
          <v-col>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              placeholder="اعد ادخال كلمة المرور"
              label="إعادة كلمة المرور"
              prepend-inner-icon="mdi-lock"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="passwordConfirmation"
              :error-messages="passwordErrors"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="my-2"></v-divider>
      <v-card-actions class="pa-2">
        <v-spacer></v-spacer>
        <v-btn @click="save" color="primary">حفظ</v-btn>
        <span class="mx-1"></span>
        <v-btn @click="goBack" color="error" large text>إلغاء</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    show: true,
    showPassword: false,
    name: "",
    userName: "",
    password: "",
    passwordConfirmation: "",
    nameErrors: [],
    userNameErrors: [],
    passwordErrors: [],
  }),
  methods: {
    goBack() {
      window.history.back();
    },
    save() {
      this.nameErrors = [];
      this.userNameErrors = [];
      this.passwordErrors = [];
      if (this.name.trim() == "") {
        this.nameErrors.push("ادخل الاسم");
        return false;
      }
      if (this.userName.trim() == "") {
        this.userNameErrors.push("ادخل اسم مستخدم");
        return false;
      }
      if (this.password.trim() == "") {
        this.passwordErrors.push("ادخل كلمة المرور");
        return false;
      }
      if (this.passwordConfirmation.trim() == "") {
        this.passwordErrors.push("اعد كتابة كلمة المرور");
        return false;
      }
      if (this.password != this.passwordConfirmation) {
        this.passwordErrors.push("كلمة المرور غير متطابقة");
        return false;
      }

      let users = this.$store.getters["Users/users"];
      this.userName = this.userName.trim().toLowerCase();
      for (let user of users) {
        if (user.user_name.trim().toLowerCase() == this.userName) {
          this.userNameErrors.push("اسم المستخدم هذا غير متاح");
          return false;
        }
      }

      this.$store.commit("Users/addUser", {
        name: this.name.trim(),
        user_name: this.userName,
        password: this.password,
      });
      this.goBack();
    },
  },
};
</script>

<style>
</style>