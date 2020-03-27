<template>
  <div>
    <div id="app">
      <el-container>
        <el-header>
          <el-row type="flex" justify="space-between">
            <el-col :span="6">
              <div>
                <el-link :underline="false"
                  ><h1><i class="el-icon-cloudy"></i>到云</h1></el-link
                >
              </div>
            </el-col>

            <el-col :span="6">
              <div>
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
                      <a href="#/">用户信息</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a href="/ChangePassword">修改密码</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      注销登录
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
            <el-menu router :default-openeds="['1', '3']">
              <el-submenu index="1">
                <template slot="title"
                  ><i class="el-icon-menu"></i>班课</template>
                <el-menu-item index="/ClassList">班课列表</el-menu-item>
                <el-menu-item index="/ScoreManage">成绩管理</el-menu-item>
                <el-menu-item index="/">校园设置</el-menu-item>
                <el-menu-item index="/">经验等级划分</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-setting"></i>系统</template>
                <el-menu-item index="/">菜单管理</el-menu-item>
                <el-menu-item index="/">角色管理</el-menu-item>
                <el-menu-item index="/UserManage">用户管理</el-menu-item>
                <el-menu-item index="/">字典管理</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>

          <el-container>
            <el-main>
              <!-- <el-header>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item >活动详情</el-breadcrumb-item>
                </el-breadcrumb>
              </el-header> -->

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
export default {
  name: "Home",
  data(){
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  color: #333;
}
</style>

<!--
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
-->
