<template>
    <div class="background">
        <div style="height:100px"></div>
        <div style="width:1000px; margin:auto;background-color:white">
            <div style="margin:auto;padding-top:20px;width:500px">
                <el-steps :active="active" finish-status="success">
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                </el-steps>

                <div v-show="active==0" style="margin-top:50px">
                    <h2>请选择你的身份</h2>
                    <div style="width:60%; margin:auto">
                        <el-radio v-model="identity" label="teacher" border>我是老师</el-radio>
                        <el-radio v-model="identity" label="student" border>我是学生</el-radio>
                    </div >

                    <div style="padding:100px 200px;">
                        <el-button @click="next">下一步</el-button>
                    </div>
                </div>

                <div v-show="active==1" style="margin-top:50px">
                    <h2>请填写你的基本信息</h2>
                    <div >
                        <p>姓名</p>
                        <el-input v-model="name" placeholder="请输入你的真实姓名" clearable style="width:300px"></el-input>
                      </div >
                      <div v-show="identity=='student'">
                        <p>学号</p>
                        <el-input  v-model="student_number" placeholder="请输入你的学号" clearable style="width:300px"></el-input>
                    </div >
                    <div style="padding:100px 50px;">
                        <el-button @click="previous">上一步</el-button>
                        <el-button @click="complete" type="primary" style="margin-left:50px;width:200px">进入到云</el-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
                







</template>

<script>
export default {
  data() {
    return {
      active: 0,
      identity:'student',
      name:'',
      student_number:''
    };
  },

  methods: {
    next() {
      this.active++;
    },
    previous() {
      this.active--;
    },
    complete(){
      if(this.name == ''){
        console.log('请输入姓名');
        this.$message({
          showClose: true,
          message: '请输入姓名',
          type: 'error'
        });
        return false;
      }else if(this.identity=='student' && this.student_number==''){
        console.log('请输入学号');
        this.$message({
          showClose: true,
          message: '请输入学号',
          type: 'error'
        });
        return false;
      }

      try {
          const _this = this;
          this.$axios.post(this.$serverUrl+'/api/initializeUser', {
            user_id: this.$store.state.UserToken.user_id,
            identity: this.identity,
            name: this.name,
            student_number: this.student_number
          })
          .then(function (response) {
            console.log(response);
            if(response.data.state.length == 0){
              console.log('服务器更新用户信息出错');
              _this.$message({
                showClose: true,
                message: '服务器更新用户信息出错',
                type: 'error'
              });
            }else{
              _this.$router.replace('/');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
          
      } catch (e) {
          console.log(e)
      }
    }
  }
};
</script>

<style>
.background{
  width: 100%;height: 100%;
	background-color: grey;
	background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
	position: absolute; /* 不可缺少 */
	z-index: -1;
	background-repeat: no-repeat;
  /* overflow: hidden; */
}
</style>
