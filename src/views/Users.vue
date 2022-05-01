<template>
  <v-card outlined>
    <router-view />
    <confirm-delete
      :show="showConfirmDelete"
      @cancel="showConfirmDelete = false"
      @confirm="remove"
    />
    <v-card-title>
      <v-spacer></v-spacer>
      مستخدمي النظام
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-6 mt-6">
      <v-row>
        <v-col>
          <v-btn x-large route :to="{ name: 'AddUser' }" color="primary">
            <v-icon left>mdi-plus</v-icon><span> إضافة </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-text-field
            type="text"
            placeholder="بحث"
            append-icon="mdi-magnify"
            outlined
            v-model="search"
          />
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="$store.getters['Users/users']"
        :search="search"
      >
        <template v-slot:item.remove="{ item }">
          <v-btn
            icon
            color="error"
            large
            @click="
              showConfirmDelete = true;
              userToDelete = item;
            "
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import ConfirmDelete from "../components/ConfirmDelete.vue";
export default {
  components: { ConfirmDelete },
  data() {
    return {
      search: "",
      showConfirmDelete: false,
      userToDelete: null,
      headers: [
        { text: "الاسم", value: "name" },
        { text: "اسم المستخدم", value: "user_name" },
        { text: "إزالة", value: "remove", align: "left" },
      ],
    };
  },
  methods: {
    remove() {
      this.$store.commit("Users/removeUser", this.userToDelete);
      this.showConfirmDelete = false;
    },
  },
};
</script>

<style>
</style>