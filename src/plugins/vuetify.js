import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ar from "vuetify/lib/locale/ar";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ar },
    current: "ar",
  },
  rtl: true
});
