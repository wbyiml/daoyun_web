<template>
  <div>
    <el-form ref="form"  >
      <div v-for="(parameter,index) in systemParametersForm" :key="index">
        <el-form-item :label=parameter.name>
           <el-input-number v-model=parameter.parameter :min="0" :max="100" label="描述文字"></el-input-number>
           <label>{{parameter.description}}</label>
        </el-form-item>
      </div>




      <div>
        <el-button type="primary" @click="submitForm()" style="width:200px">恢复默认</el-button>
        <el-button type="primary" @click="submitForm()" style="width:200px">完成</el-button>
      </div>

    </el-form>

    <!-- SystemParameterSetting 系统参数   是否集中在系统（默认）参数表


    （签到）距离   默认  教师签到时重新设置

    系统管理员设置日常学习行为以及默认获得的经验值。例如：考勤签到，默认2经验值。
    系统管理员配置出勤的等级及对应的出勤率。

    经验（默认值，在创建相应活动时会设置具体值）
    字典：签到、课堂表现、加入班课、参与活动（作业、投票）、视频学习、讨论解答、获得点赞、
    从字典选择，然后设置经验值

    个人等级设置
    字典：等级
    设置相应总经验值


    出勤等级和出勤率
    字典：出勤等级 优秀 良好 差
    从字典选择，然后设置出勤率 -->


  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data(){
    return {
      // 签到经验 签到距离
      // name parameter description extend_json
      systemParametersForm:[],

      
    }
  },
  methods: {
    submitForm() {
          let _this = this;
          try {
              this.$axios.post(this.$serverUrl+'/api/updateAllSystemParameter', {
                user_id: this.$store.state.UserToken.user_id,
                'systemParameters': this.systemParametersForm,
              })
              .then(function (response) {
                console.log(response);
                _this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success'
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          } catch (e) {
              console.log(e)
          }
    },


  },
  mounted() {
    try {
      let _this = this
      // 加载系统参数
      this.$axios.post(this.$serverUrl+'/api/getAllSystemParameter',{
        user_id: this.$store.state.UserToken.user_id,
      })
      .then(function (response) {
        console.log(response.data.systemParameters.rows);
        _this.systemParametersForm = response.data.systemParameters.rows;
      
      })
    } catch (e) {
        console.log(e)
    }
  }
}
</script>
