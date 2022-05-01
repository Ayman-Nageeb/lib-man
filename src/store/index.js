import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Users from "./modules/Users";
import Books from "./modules/Books";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Users, Books },
  plugins: [new VuexPersistence().plugin],
});
