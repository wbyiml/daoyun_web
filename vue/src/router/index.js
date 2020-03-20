import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import UserManage from "../views/UserManage.vue";
import ChangePassword from "../views/ChangePassword.vue";
import ClassUser from "../views/ClassUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:[
      {
        path: '/ChangePassword',
        name: 'ChangePassword',
        component: ChangePassword
      },
      {
        path: '/UserManage',
        name: 'UserManage',
        component: UserManage
      },
      {
        path: '/ClassUser',
        name: 'ClassUser',
        component: ClassUser
      }
    ]
  },

  {
    path: "/login",
    name: "Login",
    component: Login
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
