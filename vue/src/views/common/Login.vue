<template>
  <div class="background">
    <div style="width:500px; margin:auto;">
        <el-tabs v-model="activeName" type="border-card" stretch @tab-click="handleClick" style="margin-top:200px">
          <el-tab-pane label="账号密码登录" name="first">
            <div class="logintitle">
              <span>D&nbsp;a&nbsp;o&nbsp;Y&nbsp;u&nbsp;n</span>
            </div>

            <el-form ref="form" :model="form" :rules="rules" label-width="80px" >
              <!-- <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" placeholder="输入手机/邮箱" clearable></el-input>
              </el-form-item> -->

              <el-form-item label="账号" prop="account">
                <el-autocomplete
                  v-model="form.account"
                  :fetch-suggestions="querySearch"
                  placeholder="输入手机/邮箱"
                  @select="handleSelect"
                  style="width:300px"
                ></el-autocomplete>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input  v-model="form.password" placeholder="输入密码" clearable show-password style="width:300px"></el-input>
              </el-form-item>

              

              <el-form-item type="flex"> 
                <el-col :span="10">
                  <el-checkbox v-model="form.autoLogin" label="30天自动登陆" name="autoLogin"></el-checkbox>
                </el-col>
                <el-col :span="8">
                  <el-link href="/ChangePassword" :underline="false" style="float:right">忘记密码</el-link>
                </el-col>
              </el-form-item>
              
              <el-form-item>
                <div>
                  <el-button type="primary" @click="submitForm('form')" style="width:300px">登录</el-button>
                </div>
                <div>
                  <el-link href="/Sinup" :underline="false" style="margin:20px 0 0 100px">注册新账号</el-link>
                </div>
                
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <el-tab-pane label="短信验证登录" disabled name="second">
            短信验证登录

          </el-tab-pane>
        </el-tabs>
      </div>
  </div>

</template>

<script>
  export default {
    data() {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号/邮箱'));
        } else if (value.indexOf("@") != -1) {
          //邮箱
          this.form.way = 'email'
          var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if(!reg.test(value)){
            callback(new Error('手机号/邮箱格式有误，请重填!'));
          }else{
            callback()
          }
        } else {
          //手机
          this.form.way = 'phone'
          if(!(/^1[3456789]\d{9}$/.test(value))){ 
              callback(new Error("手机号/邮箱格式有误，请重填"));
          }else{
            callback()
          }
        }
      };
      return {
        activeName: 'first',
        // TODO:保存到localStorage
        accountHistory: [],
        form: {
          account: '',
          password: '',
          way: '',
          autoLogin: false
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 切换登录tab
      handleClick(tab, event) {
        console.log(tab, event);
      },

      // 登录账号历史搜索
      querySearch(queryString, cb) {
        var accountHistory = this.accountHistory;
        var results = queryString ? accountHistory.filter(this.createFilter(queryString)) : accountHistory;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (account) => {
          return (account.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //选择历史账号后触发
      handleSelect(item) {
        console.log(item);
      },


      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            try {
                const _this = this;
                this.$axios.post(this.$serverUrl+'/api/login', {
                  way:this.form.way,
                  // account:'13111111111',
                  // password:'admin',
                  account:this.form.account,
                  password:this.form.password
                })
                .then(function (response) {
                  console.log(response);
                  if(response.data.user_id == -1){
                    console.log('account error');
                    _this.$message({
                      showClose: true,
                      message: '账号不存在',
                      type: 'error'
                    });
                  }else if(response.data.user_id == -2){
                    console.log('password error');
                    _this.$message({
                      showClose: true,
                      message: '密码错误',
                      type: 'error'
                    });
                  }else{
                    // 登录成功
                    console.log('user_id:'+response.data.user_id);

                    let token = {
                      'user_id':response.data.user_id,
                      'loginTime':new Date().getTime(),
                      'autoLogin':_this.form.autoLogin
                    }
                    _this.$store.commit('LOGIN_IN', token);
                    console.log(_this.$store.state.UserToken);
                    
                    _this.$router.replace('/');   // 不会留下 history 记录
                    //_this.$router.push('/');   // 向 history 栈添加一个新的记录
                    //this.$router.go(-1);   // 后退一步记录，等同于 history.back()
                    //this.$router.go(1);   // 在浏览器记录中前进一步，等同于 history.forward()
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
                
            } catch (e) {
                console.log(e)
            }


            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    //初始化页面完成后,再对dom节点进行相关操作
    mounted() {
    }
  };
</script>

<style scoped> 
.background{
  width: 100%;height: 100%;
	background-image: url(../../assets/login.jpg);
	background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
	position: absolute; /* 不可缺少 */
	z-index: -1;
	background-repeat: no-repeat;
  /* overflow: hidden; */
}

.logintitle {
  color: rgb(83, 168, 255);
  font-size: 50px;
  text-align: center;
  margin-top: 15px;
}
</style>