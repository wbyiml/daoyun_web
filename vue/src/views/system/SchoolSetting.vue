<template>
  <div>
    <!-- <div style="margin:20px;">
      <label>查找</label>

      <div style="margin:20px">
        <span>
          <label>姓名</label>
          <el-input v-model="searchName" placeholder="请输入姓名" style="width:300px" size="small"></el-input>
        </span>
        <span>
          <label  style="margin-left:50px">身份</label> 
          <el-input v-model="searchIdentity" placeholder="请输入身份" style="width:300px" size="small"></el-input>
        </span>
      </div>
      <div  style="margin:20px">
        <span>
          <label>学校</label>
          <el-input v-model="searchSchoolName" placeholder="请输入学校" style="width:300px" size="small"></el-input>
        </span>
        <span>
          <label  style="margin-left:50px">学院</label>
          <el-input v-model="searchFacultyName" placeholder="请输入学院" style="width:300px" size="small"></el-input>
        </span>
      </div>
      <div  style="margin:20px">
        <span>
          <label>专业</label>
          <el-input v-model="searchMajorName" placeholder="请输入专业" style="width:300px" size="small"></el-input>
        </span>
        <span>
          <label  style="margin-left:50px">学号/工号</label>
          <el-input v-model="searchStudentNumber" placeholder="请输入学号/工号" style="width:300px" size="small"></el-input>
        </span>
      </div>

    </div> -->
    
    <div>
        <el-button type="primary" size="mini" @click="handleAppend(schoolData, 1)" style="margin:20px">
            添加学校
        </el-button>
    </div>
    <el-tree
      :data="schoolData"
      :props="defaultProps"
      accordion
      node-key="id"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          {{ node.label }}
          <el-tag v-if="data.state == 1" size="mini" style="margin-left:10px">学校</el-tag>
          <span v-if="data.state == 1" size="mini" style="margin-left:10px; color:#909399;width:200px;">{{data.location}}</span>
          <el-tag v-if="data.state == 2" size="mini" type="success" style="margin-left:10px">学院</el-tag>
          <el-tag v-if="data.state == 3" size="mini" type="info" style="margin-left:10px">专业</el-tag>
        </span>
        
        <span>
          <el-button v-if="data.state == 1" type="text" size="mini" @click="handleAppend(data, 2)">
            添加学院
          </el-button>
          <el-button v-if="data.state == 2" type="text" size="mini" @click="handleAppend(data, 3)">
            添加专业
          </el-button>
          <el-button type="text" size="mini" @click="handleEdit(data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="handleRemove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <div style="margin:50px 250px" v-if="modified">
      <el-button type="primary"  @click="undoModify()">
        撤销修改
      </el-button>
      <el-button type="primary" style="margin-left:50px" @click="confirmModify()">
        确认修改
      </el-button>
    </div>



    <!--新增界面-->
    <el-dialog
      :title="addSchoolTitle"
      :visible.sync="addSchoolVisible"
      :close-on-click-modal="false"
      center
    >
      

      <el-form ref="form" :model="addSchoolForm" :rules="rules" >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addSchoolForm.name" placeholder="输入名称" clearable style="width:300px"></el-input>
        </el-form-item>

        
        <el-form-item label="所在地" v-if="addSchoolForm.state == 1"  prop="location">
          <el-input v-model="addSchoolForm.location" placeholder="输入学校所在地" clearable style="width:300px"></el-input>
          可用联级选择器
        </el-form-item>



        <div style="margin:10px 120px;">
          <el-button type="primary" @click="submitForm('form')" style="width:300px">完成</el-button>
        </div>

      </el-form>
    </el-dialog>


    <!--删除确认-->
    <el-dialog
      title="是否删除"
      :visible.sync="deleteSchoolVisible"
      width="30%"
      center>
      <span>是否删除 <span style="color:red">{{deleteSchoolNode.data.name}}</span> </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteSchoolVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSchool()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return {
        schoolData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        
        addSchoolVisible: false,
        addSchoolTitle:'',
        operation:'',
        addSchoolForm:{
          name:'',
          location: '',
          state: 0
        },

        deleteSchoolVisible: false, 
        deleteSchoolNode: {
          data:{
            name:''
          }
        },
        deleteSchoolId: '',

        modified: false,

        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' },
          ],
          location: [
            { required: true, message: '地址不能为空', trigger: 'blur' },
          ]
        }


    }
  },
  methods: {
    handleAppend(data, state) {
      if(state == 1){
        this.addSchoolTitle = '添加学校'
      }else if(state == 2){
        this.addSchoolTitle = '添加学院'
      }else{
        this.addSchoolTitle = '添加专业'
      }
      this.operation = 1;
      this.addSchoolForm = {
        data:data,
        name:'',
        location: '',
        state: state
      };
      this.addSchoolVisible = true;
    },
    handleEdit(data){
      this.addSchoolTitle = '编辑'
      this.operation = 2;
      this.addSchoolForm = {
        data:data,
        name:data.name,
        location:data.location,
        state: data.state
      };
      this.addSchoolVisible = true;
      // console.log(data)
    },
    handleRemove(node, data) { 
      this.deleteSchoolNode = node;
      this.deleteSchoolId = data.id;
      this.deleteSchoolVisible = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.operation == 1){ //新增

            if(this.addSchoolForm.state==1){
              let newChild = {
                name: this.addSchoolForm.name, 
                location: this.addSchoolForm.location, 
                state: 1, 
                children: []
              }
              this.addSchoolForm.data.push(newChild);
            }else{
              let newChild = {
                name: this.addSchoolForm.name, 
                state: this.addSchoolForm.state, 
                children: []
              }
              this.addSchoolForm.data.children.push(newChild);
            }
            
          }else if(this.operation == 2){ //编辑
            this.addSchoolForm.data.name = this.addSchoolForm.name;
            this.addSchoolForm.data.location = this.addSchoolForm.location;
          }

          this.addSchoolVisible = false;
          this.modified = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    deleteSchool(){
      let parent = this.deleteSchoolNode.parent;
      let children = parent.data.children || parent.data;
      let index = children.findIndex(d => d.id === this.deleteSchoolId);
      children.splice(index, 1);
      this.deleteSchoolVisible = false;
      this.modified = true;
    },

    

    //撤销修改
    undoModify(){
        try {
          let _this = this
          this.$axios.get(this.$serverUrl+'/api/getAllSchoolFacultyMajor')
          .then(function (response) {
            console.log(response.data);
            _this.schoolData = response.data.schools.rows; 
            let faculties = response.data.faculties.rows;
            let majors = response.data.majors.rows;

            let j = 0;
            for(let i=0;i<faculties.length;i++){
              faculties[i].children = [];
              faculties[i].state = 2;
              while(j<majors.length && faculties[i].id == majors[j].faculty_id){
                majors[j].state = 3;
                faculties[i].children.push(majors[j]);
                j++;
              }
            } 

            for(let i=0;i<_this.schoolData.length;i++){
              _this.schoolData[i].children = [];
              _this.schoolData[i].state = 1;
              for(let j=0;j<faculties.length;j++){
                if(_this.schoolData[i].id == faculties[j].school_id){
                  _this.schoolData[i].children.push(faculties[j]);
                }
              }
            }

          })
        } catch (e) {
            console.log(e)
        }
        this.modified = false;
    },
    //确认修改
    confirmModify(){
      let _this = this;
      try {
          this.$axios.post(this.$serverUrl+'/api/updateAllSchoolFacultyMajor', {
            'schools': this.schoolData,
          })
          .then(function (response) {
            console.log(response);
            _this.modified = false;
            _this.saveSchoolVisible = false;
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
  //初始化页面完成后,再对dom节点进行相关操作
  mounted() {
    try {
      let _this = this
      this.$axios.get(this.$serverUrl+'/api/getAllSchoolFacultyMajor')
      .then(function (response) {
        console.log(response.data);
        _this.schoolData = response.data.schools.rows; 
        let faculties = response.data.faculties.rows;
        let majors = response.data.majors.rows;

        let j = 0;
        for(let i=0;i<faculties.length;i++){
          faculties[i].children = [];
          faculties[i].state = 2;
          while(j<majors.length && faculties[i].id == majors[j].faculty_id){
            majors[j].state = 3;
            faculties[i].children.push(majors[j]);
            j++;
          }
        } 

        for(let i=0;i<_this.schoolData.length;i++){
          _this.schoolData[i].children = [];
          _this.schoolData[i].state = 1;
          for(let j=0;j<faculties.length;j++){
            if(_this.schoolData[i].id == faculties[j].school_id){
              _this.schoolData[i].children.push(faculties[j]);
            }
          }
        }
        console.log(_this.schoolData);
      })
    } catch (e) {
        console.log(e)
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

</style>
