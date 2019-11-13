import Vue from "vue";
import App from "./App.vue";
import VueAnalytics from "vue-analytics";

const isProd = process.env.NODE_ENV === "production";
Vue.use(VueAnalytics, {
  id: "UA-49867195-2",
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
