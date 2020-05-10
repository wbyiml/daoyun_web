<template>
  <div>
    学校 院系专业
{
  schools:[
    {
      id:1,
      name:'fzu',
      address:'fuzhou'
    }
    ...
  ],
  faculty:[
    {
      id:1,
      name:'shuji',
      school_id:1
    }
  ],
  major:[
    {
      id:1,
      name:'math',
      faculty_id:1
    }
  ]
}

    
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "SchoolSetting",
  data(){
    return {}
  }
}
</script>
