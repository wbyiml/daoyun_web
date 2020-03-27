<template>
  <div>
    <div class="background">
      <img src="../../static/login.jpg" style="width:100% height:50%" />
      <div class="loginblock">
        <div class="logintitle">
          <span>D&nbsp;a&nbsp;o&nbsp;Y&nbsp;u&nbsp;n</span>
        </div>
        <div style="font-size:30px">后台管理系统</div>
        <el-divider></el-divider>
        <div class="inputzm">
          <div>
            <label>账号&nbsp;&nbsp;&nbsp;</label>
            <el-input v-model="account" placeholder="请输入账号/手机号码" clearable style="width:50% "></el-input>
          </div>
          <div style="margin-top:25px;">
            <label>密码&nbsp;&nbsp;&nbsp;</label>
            <el-input v-model="password" placeholder="请输入密码" show-password style="width:50% "></el-input>
          </div>
          <div style="margin-top:25px;"></div>
          <div style="margin-top:15px;margin-left:60%;">
            <el-link type="primary" @click="foggetPassword" style="font-size:18px;">忘记密码?</el-link>
          </div>
          <div style="margin-top:25px; margin-left:10%">
            <el-button type="primary" round style="font-size:20px;" @click="trylogin">登录</el-button>
            <el-button type="primary" round style="font-size:20px;" @click="register">注册</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 注册界面 -->
    <el-dialog
      title="注册账号"
      :visible.sync="registerFormVisible"
      :close-on-click-modal="false"
      width="600px"
      center
    >
      <el-form
        :model="registerForm"
        label-width="80px"
        :rules="registerFormRules"
        ref="registerForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="registerForm.account"
            auto-complete="off"
            placeholder="请输入账号"
            style="width:250px;padding-bottom:20px;padding-left:50px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            :maxlength="18"
            :minlength="18"
            show-password
            placeholder="请输入密码"
            style="width:250px;padding-bottom:20px;padding-left:50px"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model="registerForm.phone"
            :maxlength="11"
            :minlength="11"
            placeholder="请填写手机号码"
            style="width:250px;padding-bottom:20px;padding-left:50px"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verify">
          <el-input
            v-model="registerForm.verify"
            placeholder="请输入验证码"
            style="width:150px;padding-bottom:20px;padding-left:50px"
          ></el-input>
          <el-button type="primary" v-show="show" @click="getCode">获取验证码</el-button>
          <el-button type="primary" v-show="!show" class="count" disabled>已发送</el-button>
          <span v-show="!show" class="count">{{count}} s后可再次获取</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="registerFormVisible = false;">取消</el-button>
        <el-button type="primary" @click.native="registerSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 忘记密码界面1 -->
    <el-dialog
      title="忘记密码"
      :visible.sync="forgetpasswordFormVisible"
      :close-on-click-modal="false"
      width="600px"
      center
    >
      <el-form
        :model="forgetpasswordForm"
        label-width="80px"
        :rules="forgetpasswordFormRules"
        ref="forgetpasswordForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="forgetpasswordForm.account"
            auto-complete="off"
            placeholder="请输入账号"
            style="width:250px;padding-bottom:20px;padding-left:50px"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model="forgetpasswordForm.phone"
            :maxlength="11"
            :minlength="11"
            placeholder="请填写手机号码"
            style="width:250px;padding-bottom:20px;padding-left:50px"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verify">
          <el-input
            v-model="forgetpasswordForm.verify"
            placeholder="请输入验证码"
            style="width:150px;padding-bottom:20px;padding-left:50px"
          ></el-input>
          <el-button type="primary" v-show="show1" @click="getCode1">获取验证码</el-button>
          <el-button type="primary" v-show="!show1" class="count" disabled>已发送</el-button>
          <span v-show="!show1" class="count">{{count1}} s后可再次获取</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="forgetpasswordFormVisible = false;">取消</el-button>
        <el-button type="primary" @click.native="forgetpasswordNext">下一步</el-button>
      </div>
    </el-dialog>

    <!-- 重置密码界面 -->
    <el-dialog
      title="重置密码"
      :visible.sync="resetpasswordFormVisible"
      :close-on-click-modal="false"
      width="600px"
      center
    >
      <el-form
        :model="resetpasswordForm"
        label-width="150px"
        :rules="resetpasswordFormRules"
        ref="resetpasswordForm"
      >
        <el-form-item label="请输入新密码" prop="newpassword">
          <el-input
            v-model="resetpasswordForm.newpassword"
            :maxlength="18"
            :minlength="18"
            show-password
            placeholder="请输入密码"
            style="width:250px;padding-bottom:20px;padding-left:50px"
          ></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码" prop="newpassword1">
          <el-input
            v-model="resetpasswordForm.newpassword1"
            :maxlength="18"
            :minlength="18"
            show-password
            placeholder="请输入密码"
            style="width:250px;padding-bottom:20px;padding-left:50px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="resetpasswordFormVisible = false;">取消</el-button>
        <el-button type="primary" @click.native="forgetpasswordSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      show: true,
      show1: true,
      count: "",
      count1: "",
      timer: null,
      timer1: null,
      registerFormVisible: false,
      forgetpasswordFormVisible: false,
      resetpasswordFormVisible: false,
      account: "",
      password: "",
      grade: 1,
      registerFormRules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "change"
          }
        ],
        verify: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "change"
          }
        ]
      },
      forgetpasswordFormRules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "change"
          }
        ],
        verify: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "change"
          }
        ]
      },
      resetpasswordFormRules: {
        newpassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ],
        newpassword1: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ]
      },

      //编辑界面数据
      registerForm: {
        account: "",
        password: "",
        phone: "",
        verify: ""
      },
      forgetpasswordForm: {
        account: "",
        phone: "",
        verify: ""
      },
      resetpasswordForm: {
        newpassword: "",
        newpassword1: ""
      }
    };
  },
  methods: {
    foggetPassword() {
      this.forgetpasswordFormVisible = true;
      this.$refs["forgetpasswordFormVisible"].resetFields();
    },
    forgetpasswordNext() {
      this.forgetpasswordFormVisible = false;
      this.resetpasswordFormVisible = true;
      this.$refs["resetpasswordFormVisible"].resetFields();
    },
    register() {
      this.registerFormVisible = true;
      this.$refs["registerForm"].resetFields();
    },
    trylogin() {},
    registerSubmit: function() {},
    forgetpasswordSubmit: function() {},
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    getCode1() {
      const TIME_COUNT = 60;
      if (!this.timer1) {
        this.count1 = TIME_COUNT;
        this.show1 = false;
        this.timer1 = setInterval(() => {
          if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
            this.count1--;
          } else {
            this.show1 = true;
            clearInterval(this.timer1);
            this.timer1 = null;
          }
        }, 1000);
      }
    }
  }
};
</script>


<style>
.background {
  width: 100%;
  height: 925px;
}

.loginblock {
  background-color: rgba(242, 246, 252, 0.6);
  width: 30%;
  height: 50%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  /* filter: alpha(opacity=60);
  -moz-opacity: 0.6;
  -khtml-opacity: 0.6;
  opacity: 0.6;  */
}

.logintitle {
  color: rgb(83, 168, 255);
  font-size: 50px;
  text-align: center;
  margin-top: 15px;
}

.inputzm {
  font-size: 28px;

  margin-top: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
