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
      الكتب
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-6 mt-6">
      <v-row>
        <v-col>
          <v-btn x-large route :to="{ name: 'AddBook' }" color="primary">
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
        :items="$store.getters['Books/books']"
        :search="search"
      >
        <template v-slot:item.remove="{ item }">
          <v-btn
            icon
            color="error"
            large
            @click="
              showConfirmDelete = true;
              bookToDelete = item;
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
      bookToDelete: null,
      headers: [
        { text: "ردمك", value: "isbn" },
        { text: "العنوان", value: "title" },
        { text: "الكاتب", value: "author" },
        { text: "الناشر", value: "publisher" },
        { text: "الطبعة", value: "copy_version" },
        { text: "إزالة", value: "remove", align: "left" },
      ],
    };
  },
  methods: {
    remove() {
      this.$store.commit("Books/remove", this.bookToDelete);
      this.showConfirmDelete = false;
    },
  },
};
</script>
<style>
</style>