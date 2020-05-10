import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/common/Login.vue";
import Sinup from "../views/common/Sinup.vue";

import Home from "../views/home/Home.vue";
import UserGrowth from "../views/user/UserGrowth.vue";
import UserInformation from "../views/user/UserInformation.vue";
import AccountSecurity from "../views/user/AccountSecurity.vue";

import InitializeUser from "../views/user/InitializeUser.vue";
import Error403 from "../views/errors/Error403.vue";
import Error404 from "../views/errors/Error404.vue";
import Error500 from "../views/errors/Error500.vue";
import UserDefinedError from "../views/errors/UserDefinedError.vue";
// const Class = () => import('../views/class/Class')  //这种方式不用在vue里声明name='Class'

Vue.use(VueRouter);


/* 初始路由 （登录注册）*/
const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Sinup",
    name: "Sinup",
    component: Sinup
  },
  {
    path: "/ChangePassword",
    name: "ChangePassword",
    component: () =>
      import("../views/common/ChangePassword.vue")
  },
  {
    path: "/About",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/common/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;


/* 准备动态添加的路由 （登录后有的页面）*/
export const DynamicRoutes = [
  {
      path: '',
      component: Home,
      name: 'Home',
      // redirect: '',
      meta: {
          requiresAuth: true,
          name: '首页',
          icon: 'icon-home'
      },
      children: [
        {
          path: 'UserGrowth',
          component: UserGrowth,
          name: 'UserGrowth',
          meta: {
              name: '成长值',
              icon:'',
              isMenu:'False',
              isPage:'True'
          }
        },
        {
          path: 'UserInformation',
          component: UserInformation,
          name: 'UserInformation',
          meta: {
              name: '用户信息',
              icon:'',
              isMenu:'False',
              isPage:'True'
          }
        },
        {
          path: 'AccountSecurity',
          component: AccountSecurity,
          name: 'AccountSecurity',
          meta: {
              name: '账户安全',
              icon:'',
              isMenu:'False',
              isPage:'True'
          }
        }
      ]
  },
  {
    path: '/InitializeUser', //注册后初始化用户信息
    component: InitializeUser
  },
  {
      path: '/Error403', //Forbidden
      component: Error403
  },
  {
      path: '*', //NotFound
      component: Error404
  },
  {
      path: '/Error500', //Server error
      component: Error500
  },
  {
    path: '/UserDefinedError', //UserDefinedError
    component: UserDefinedError
  }
]

