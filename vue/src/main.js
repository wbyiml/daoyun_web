import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI); //全局使用ElementUI

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//       sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//       next({ path: '/login' })
//   } else {
//       next()
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
