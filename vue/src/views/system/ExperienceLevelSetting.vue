<template>
  <div>
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
    从字典选择，然后设置出勤率


  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "ExperienceLevelSetting",
  data(){
    return {}
  }
}
</script>
