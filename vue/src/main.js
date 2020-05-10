import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";



import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI); //全局使用ElementUI


//ajax 请求
import axios from 'axios'
Vue.prototype.$axios = axios
//消息通知（主动操作反馈）  Notification系统级通知的被动提醒
import { Message } from 'element-ui';
Vue.prototype.$message = Message



// 引入封装好的js文件的路径
import serverUrl from './config/serverUrl'
// 把全局js挂接到vue原型上
Vue.prototype.$serverUrl = serverUrl
//在vue实例化上要用变量的话就直接this.$serverUrl




import formatDate from './utils/formatDate'
Vue.prototype.$formatDate = formatDate
// console.log(new Date().getTime()) //毫秒级别时间戳
// console.log(this.$formatDate(new Date().getTime()))  //mysql time/timestamp格式



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

    if (!store.state.UserToken ||
        new Date().getTime()-store.state.UserToken.loginTime > 30*24*60*60*1000 ||
        store.state.UserToken.autoLogin==false && new Date().getTime()-store.state.UserToken.loginTime > 24*60*60*1000) {
        if (
            to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth)
        ) {
            next()
        } else {
            next({ path: '/Login' })
        }
    } else {
            let token = {
                'user_id':store.state.UserToken.user_id,
                'loginTime':new Date().getTime(),
                'autoLogin':store.state.UserToken.autoLogin
            }
            store.commit('LOGIN_IN', token);

        if (!store.state.permission.permissionList) {
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path })
            })
        } else {
            if (to.path !== '/Login') {
                next()  // url
            } else {
                next(from.fullPath) // url=login 跳到根目录
            }
        }
    }
})

// router.afterEach((to, from, next) => {
router.afterEach((to) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
