import Vue from "vue";
import Vuex from "vuex";
import packagemanager from "./modules/packagemanager";
import authentication from "./modules/authentication";
import tracking from "./modules/tracking";

Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== "production"

export default new Vuex.Store({
  modules: {
    packagemanager,
    authentication,
    tracking
  },
  strict: false
});
