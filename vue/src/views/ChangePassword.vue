<template>
  <div class="parent">
    <el-row style="padding:20px">
      <el-col :span="12">
        <div style="text-align:center;font-size:30px; color: rgb(132, 132, 132); float:left">>修改密码</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">请输入原密码：</el-col>
      <el-col :span="8">
        <el-input placeholder="请输入原密码" v-model="oldpassword1" show-password></el-input>
      </el-col>
    </el-row>
  <el-divider></el-divider>
    <el-row>
      <el-col :span="3">请确认原密码：</el-col>
      <el-col :span="8">
        <el-input placeholder="请再输入一次原密码" v-model="oldpassword2" show-password @blur="testpassword"></el-input>
      </el-col>
    </el-row>
      <el-divider></el-divider>
    <el-row>
      <el-col :span="3">请输入新密码：</el-col>
      <el-col :span="8">
        <el-input placeholder="请输入新密码" v-model="newpassword" show-password></el-input>
      </el-col>
    </el-row>
      <el-divider></el-divider>
    <el-col :span="12">
      <el-row style="text-align:center;">
        <el-button type="primary" round @click="modify">确认修改</el-button>
        <el-button type="primary" round @click="reinput">重新输入</el-button>
      </el-row>
    </el-col>
  </div>
</template>


<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      oldpassword1: "",
      oldpassword2: "",
      newpassword: ""
    };
  },
  methods: {
    testpassword() {
      if (this.oldpassword1 != this.oldpassword2) {
        this.$message.error("两次输入的密码不同！请重新输入！");
        this.oldpassword2 = "";
      }
    },
    reinput() {
      this.oldpassword1 = "";
      this.oldpassword2 = "";
      this.newpassword = "";
    },
  }
};
</script>


<style>
.parent {
  width: 70%;
  height: 500px;
  position: relative;
  left: 15%;
  top: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px
}
.el-row {
  margin-bottom: 30px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

