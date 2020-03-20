<template>
  <div>
   <div id="app">

    <el-container>
      <el-header> 
            <el-col :span="3">
              <h1>到云</h1>
            </el-col>
            
            <el-col :span="1"  style="float:right">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">
                        用户
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <a href="#/">用户信息</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a href="/ChangePassword">修改密码</a>
                        </el-dropdown-item>
                        <el-dropdown-item >
                            注销登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
      </el-header>

      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>班课</template>
              <el-menu-item index="/">创建班课</el-menu-item>
              <el-menu-item index="/ClassUser">查询班课</el-menu-item>
              <el-submenu index="1-3">
                <template slot="title">成绩管理</template>
                <el-menu-item index="/">编辑成绩</el-menu-item>
                <el-menu-item index="/">查询成绩</el-menu-item>
              </el-submenu>
              <el-menu-item index="/">校园信息</el-menu-item>
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
        
        <el-main>
          <router-view />
        </el-main>


        <!-- <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </el-header>
          
          <el-main>
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container> -->

      </el-container>
    </el-container>


    
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Home",
    data(){
      return {}
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
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