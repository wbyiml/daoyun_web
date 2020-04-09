import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI); //全局使用ElementUI

Vue.config.productionTip = false;


//sessionStorage刷新页面后消失 权限permissionList(菜单栏) logout
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

router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
      if (
          to.matched.length > 0 &&
          !to.matched.some(record => record.meta.requiresAuth)
      ) {
          next()
      } else {
          next({ path: '/login' })
      }
  } else {
      if (!store.state.permission.permissionList) {
          store.dispatch('permission/FETCH_PERMISSION').then(() => {
              next({ path: to.path })
          })
      } else {
          if (to.path !== '/login') {
              next()
          } else {
              next(from.fullPath)
          }
      }
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
