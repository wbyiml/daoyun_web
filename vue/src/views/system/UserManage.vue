<template>
  <div>
    <!-- 工具条 -->
    <div style="margin:20px;">
      <label>信息过滤</label>

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

    </div>

    <!-- 用户列表 -->
    <div>
      <el-table
      :data="UserTableData.filter(data => (!searchName || data.name.toLowerCase().includes(searchName.toLowerCase())) &&
                                          (!searchIdentity || data.identity.toLowerCase().includes(searchIdentity.toLowerCase())) &&
                                          (!searchSchoolName || data.school_name.toLowerCase().includes(searchSchoolName.toLowerCase())) &&
                                          (!searchFacultyName || data.faculty_name.toLowerCase().includes(searchFacultyName.toLowerCase())) &&
                                          (!searchMajorName || data.major_name.toLowerCase().includes(searchMajorName.toLowerCase())) &&
                                          (!searchStudentNumber || data.student_number.toLowerCase().includes(searchStudentNumber.toLowerCase())) 
                                  )"
      stripe border style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="姓名"
          sortable>
        </el-table-column>
        <el-table-column
          prop="identity"
          label="身份"
          sortable>
        </el-table-column>
        <el-table-column
          prop="school_name"
          label="学校"
          sortable>
        </el-table-column>
        <el-table-column
          prop="faculty_name"
          label="学院"
          sortable>
        </el-table-column>
        <el-table-column
          prop="major_name"
          label="专业"
          sortable>
        </el-table-column>
        <el-table-column
          prop="student_number"
          label="学号/工号"
          sortable>
        </el-table-column>
        <el-table-column
          label="角色"
          width="200"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.roles" multiple placeholder="请选择" @change="modified=true">
              <el-option
                v-for="item in Roles"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUserDetail(scope.row)">详细信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin:50px 500px" v-if="modified">
      <el-button type="primary"  @click="undoModify()">
        撤销修改
      </el-button>
      <el-button type="primary" style="margin-left:50px" @click="confirmModify()">
        保存修改
      </el-button>
    </div>

    每个用户拥有的角色    ||    每个角色对应的用户

    <!--详细信息-->
    <el-dialog
      title="详细信息"
      :visible.sync="userDetailVisible"
      center
    >
      <div>
        <label style="display:inline-block;width:100px;">姓名</label><label>{{userDetail.name}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">性别</label><label>{{userDetail.sex}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">出生日期</label><label>{{userDetail.birthday}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">手机</label><label>{{userDetail.phone}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">邮箱</label><label>{{userDetail.emsil}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">身份</label><label>{{userDetail.identity}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">学号/工号</label><label>{{userDetail.student_number}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">学校</label><label>{{userDetail.school_name}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">学院</label><label>{{userDetail.faculty_name}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">专业</label><label>{{userDetail.major_name}}</label>
      </div>
      <div>
        <label style="display:inline-block;width:100px;">用户名</label><label>{{userDetail.user_name}}</label>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      searchName: '',
      searchIdentity: '',
      searchSchoolName: '',
      searchFacultyName: '',
      searchMajorName: '',
      searchStudentNumber: '',

      UserTableData: [],
      Roles:[],

      userDetail: {},
      userDetailVisible: false,

      modified: false,
    };
  },
  methods: {
    handleUserDetail(row){
      console.log(row)
      this.userDetail = row;
      this.userDetailVisible = true;
    },

    //撤销修改
    undoModify(){
        let _this = this
        try {
          // 加载用户
          this.$axios.get(this.$serverUrl+'/api/getAllUserRoles')
          .then(function (response) {
            let j = 0;
            let userRoles = response.data.userRoles.rows;
            for(let i=0;i<_this.UserTableData.length;i++){
              _this.UserTableData[i].roles = [];
              while(_this.UserTableData[i].id > userRoles[j].user_id){
                j++;
              }
              if(_this.UserTableData[i].id == userRoles[j].user_id){
                _this.UserTableData[i].roles.push(userRoles[j].user_id);
              }
            }
            console.log(_this.UserTableData);   
            _this.modified = false;
          })
          .catch(function (error) {
            console.log(error);
          }); 
        } catch (e) {
            console.log(e)
        }
    },
    //确认修改
    confirmModify(){
      let pairs = [];
      for(let i=0;i<this.UserTableData.length;i++){
        for(let j=0;j<this.UserTableData[i].roles.length;j++){
          pairs.push({
            'user_id': this.UserTableData[i].id,
            'role_id': this.UserTableData[i].roles[j] //把select value改成json string ,roles在这转成json  role_id  role_name
          })
        }
      }

      let _this = this;
      try {
          this.$axios.post(this.$serverUrl+'/api/updateAllUserRole', {
            'pairs': pairs,
          })
          .then(function (response) {
            console.log(response);
            _this.modified = false;
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
      const _this = this;
      
      // 加载用户
      this.$axios.get(this.$serverUrl+'/api/getAllUsers')
      .then(function (response) {
        // console.log(response.data.users.rows);
        _this.UserTableData = response.data.users.rows;
        // 加载用户角色
        return _this.$axios.get(_this.$serverUrl+'/api/getAllUserRoles')
      })
      .then(function (response) {
        // console.log(response.data.userRoles.rows);
        let j = 0;
        let userRoles = response.data.userRoles.rows;
        for(let i=0;i<_this.UserTableData.length;i++){
          _this.UserTableData[i].roles = [];
          while(_this.UserTableData[i].id > userRoles[j].user_id){
            j++;
          }
          if(_this.UserTableData[i].id == userRoles[j].user_id){
            _this.UserTableData[i].roles.push(userRoles[j].role_id);
          }
        }
        console.log(_this.UserTableData);
      })
      .catch(function (error) {
        console.log(error);
      }); 

      // 加载角色
      this.$axios.get(this.$serverUrl+'/api/getAllRoles')
      .then(function (response) {
        // console.log(response.data.roles.rows);
        _this.Roles = response.data.roles.rows;
        
      })
      .catch(function (error) {
        console.log(error);
      }); 

    } catch (e) {
        console.log(e)
    }
  }
}
</script>
