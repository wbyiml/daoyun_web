<template>
  <div>
    <div id="app">
      <el-container>
        <el-header >
          <el-row type="flex" justify="space-between">
            <el-col >
              <div>
                <el-link class="link"
                  ><h1><i class="el-icon-cloudy"></i>到云</h1></el-link
                >
              </div>
            </el-col>
            

            <el-col>
              <div style="float:right">
                <el-dropdown trigger="hover">
                  <span class="el-dropdown-link userinfo-inner">
                    <el-button
                      type="info"
                      icon="el-icon-user-solid"
                      circle
                      size="large"
                    ></el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link to='/UserGrowth' class="link">成长值</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link to='/UserInformation' class="link">用户信息</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link to='/AccountSecurity' class="link">账户安全</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="logout()">
                        注销登录
                      </div>
                      
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>


        </el-header>

        <el-container style="border: 1px solid #eee">
          <!-- 菜单自动生成 -->
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu 
                :collapse="isSidebarNavCollapse"
                background-color="#304156"
                text-color="#eee"
                active-text-color="#4dbcff"
                :default-active="currentMenu"
            >
                <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
            </el-menu>
          </el-aside>

          <el-container>
            <el-main>
              <el-header>
                <el-breadcrumb separator="/">
                    <transition-group name="breadcrumb">
                        <!-- 防止面包屑导航出现 首页/首页， v-if="route.name!='home'" -->
                        <el-breadcrumb-item
                            v-for="(route) in crumbList"
                            :key="route.name"
                            :to="{name:route.name}"
                        >
                            {{route.meta.name}}
                        </el-breadcrumb-item>
                    </transition-group>
                </el-breadcrumb>
              </el-header>


              <router-view />
            </el-main>

            <el-footer>copyright-----</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DynamicMenu from '@/components/dynamic-menu'   //@ webpack的路径别名,代表到src的路径  事件绑定(v-on: 或者 @ ) 属性绑定v-bind或:
import { mapState } from 'vuex'

export default {
  name: "Home",
  data() {
      return {
          isCollapse: true
      }
  },
  computed: {
      ...mapState(['isSidebarNavCollapse', 'crumbList']),
      ...mapState('permission', ['sidebarMenu', 'currentMenu'])
  },
  methods: {
      toggleNavCollapse() {
          this.$store.commit('toggleNavCollapse')
      },
      logout(){
        this.$store.commit('LOGIN_OUT')
          /* 防止切换角色时addRoutes重复添加路由导致出现警告 */ 
          console.log('logout')
          window.location.reload()
      }
  },
  components: {
      DynamicMenu
  }
}
</script>

<style>
.link {
  text-decoration:none;
}
</style>

