import Vue from "vue";
import Vuex from "vuex";
import packagemanager from './modules/packagemanager'

Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== "production"

export default new Vuex.Store({
  modules: {
    packagemanager
  },
  strict: false
});
