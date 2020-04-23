<template>
  <div style="width: 1920px;height:100%">
    <section>
      <!-- 工具条 -->
      <el-col :span="2" class="toolbar" style="padding-bottom: 0px;">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="22" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.class_name" placeholder="请输入班课名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查找</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 列表 -->
      <el-table
        :data="tableData.filter(data => !filters.class_name || data.class_name.toString().toLowerCase().includes(filters.class_name.toLowerCase()))"
        highlight-current-row
        @selection-change="selsChange"
        style="width: 100%;"
        stripe
      >
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="class_id" label="班课ID" width="150" sortable></el-table-column>
        <el-table-column prop="class_name" label="班课名称" width="150" sortable></el-table-column>
        <el-table-column prop="class_teacher" label="任课老师" width="150" sortable></el-table-column>
        <el-table-column prop="class_credit" label="学分" width="150" sortable></el-table-column>
        <el-table-column prop="class_location" label="上课地点" width="150" sortable></el-table-column>
        <el-table-column prop="class_time" label="上课时间" width="150" sortable></el-table-column>
        <el-table-column label="查看详情" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="checkDetail(scope.$index, scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>

        <el-table-column label="管理" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" center>
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="班课ID" prop="class_id">
                <el-input
                  v-model="editForm.class_id"
                  auto-complete="off"
                  style="width:150px;"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="班课名称" prop="class_name">
              <el-input v-model="editForm.class_name" style="width:150px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="任课老师" prop="class_teacher">
                <el-input v-model="editForm.class_teacher" style="width:150px;" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="学分" prop="class_credit">
              <el-input v-model="editForm.class_credit" style="width:150px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="上课地点" prop="class_location">
                <el-input v-model="editForm.class_location" style="width:150px;"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="上课时间" prop="class_time">
              <el-input v-model="editForm.class_time" style="width:250px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="开课时间" prop="class_begin">
                <el-date-picker v-model="editForm.class_begin" type="date" placeholder="选择开课时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-form-item label="结课时间" prop="class_end">
              <el-date-picker v-model="editForm.class_end" type="date" placeholder="选择结课日期"></el-date-picker>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="编辑" :visible.sync="addFormVisible" :close-on-click-modal="false" center>
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="班课ID" prop="class_id">
                <el-input
                  v-model="addForm.class_id"
                  auto-complete="off"
                  style="width:150px;"
                  :disabled="true"
                  placeholder="系统自动分配"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="班课名称" prop="class_name">
              <el-input v-model="addForm.class_name" style="width:150px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="任课老师" prop="class_teacher">
                <el-input
                  v-model="addForm.class_teacher"
                  style="width:150px;"
                  :disabled="true"
                  placeholder="默认为创建者"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="学分" prop="class_credit">
              <el-input v-model="addForm.class_credit" style="width:150px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="上课地点" prop="class_location">
                <el-input v-model="addForm.class_location" style="width:150px;"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="上课时间" prop="class_time">
              <el-input v-model="addForm.class_time" style="width:250px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="开课时间" prop="class_begin">
                <el-date-picker v-model="addForm.class_begin" type="date" placeholder="选择开课时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-form-item label="结课时间" prop="class_end">
              <el-date-picker v-model="addForm.class_end" type="date" placeholder="选择结课日期"></el-date-picker>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--详情页面-->
      <el-dialog title="班课详情" :visible.sync="detailVisible" :close-on-click-modal="false" center>
        <el-row style="padding-bottom:20px">
          <el-col :span="12">
            <span class="detailtext">班课ID：{{detailJSON.class_id}}</span>
          </el-col>
          <el-col :span="12">
            <span class="detailtext">班课名称：{{detailJSON.class_name}}</span>
          </el-col>
        </el-row>
        <el-row style="padding-bottom:20px">
          <el-col :span="12">
            <span class="detailtext">任课老师：{{detailJSON.class_teacher}}</span>
          </el-col>
          <el-col :span="12">
            <span class="detailtext">课程学分：{{detailJSON.class_credit}}</span>
          </el-col>
        </el-row>
        <el-row style="padding-bottom:20px">
          <el-col :span="12">
            <span class="detailtext">上课地点：{{detailJSON.class_location}}</span>
          </el-col>
          <el-col :span="12">
            <span class="detailtext">班课时间：{{detailJSON.class_time}}</span>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 20px">
          <el-col :span="12">
            <span class="detailtext">开课时间：{{detailJSON.class_begin}}</span>
          </el-col>
          <el-col :span="12">
            <span class="detailtext">结课时间：{{detailJSON.class_end}}</span>
          </el-col>
        </el-row>

        <el-table
          :data="detailJSON.class_member"
          highlight-current-row
          @selection-change="selsChange"
          style="width: 100%;"
          stripe
        >
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="member_ID" label="成员ID" width="140" sortable></el-table-column>
          <el-table-column prop="member_name" label="成员姓名" width="140" sortable></el-table-column>
          <el-table-column prop="member_experience" label="经验值" width="100" sortable></el-table-column>
          <el-table-column prop="member_attend" label="出勤次数" width="100" sortable></el-table-column>
          <el-table-column prop="member_task" label="作业" width="100" sortable></el-table-column>
          <el-table-column prop="member_score" label="成绩" width="100" sortable></el-table-column>
          <el-table-column label="管理" width="150">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEditMember(scope.$index, scope.row)">编辑</el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelMember(scope.$index, detailJSON.class_member)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="detailVisible = false">返回</el-button>
        </div>
      </el-dialog>

      <!--编辑成员界面-->
      <el-dialog
        title="编辑"
        :visible.sync="editMemberFormVisible"
        :close-on-click-modal="false"
        center
      >
        <el-form
          :model="editMemberForm"
          label-width="80px"
          :rules="editMemberFormRules"
          ref="editMemberForm"
        >
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="成员ID" prop="member_ID">
                <el-input
                  v-model="editMemberForm.member_ID"
                  auto-complete="off"
                  style="width:150px;"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="成员姓名" prop="member_name">
              <el-input
                v-model="editMemberForm.member_name"
                auto-complete="off"
                style="width:150px;"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="经验值" prop="member_experience">
                <el-input v-model="editMemberForm.member_experience" style="width:150px;"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="签到" prop="member_attend">
              <el-input v-model="editMemberForm.member_attend" style="width:150px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="作业" prop="member_task">
                <el-input v-model="editMemberForm.member_task" style="width:150px;"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="成绩" prop="member_score">
              <el-input v-model="editMemberForm.member_score" style="width:150px;"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editMemberFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editMemberSubmit">提交</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: "ClassList",
  data() {
    return {
      filters: {
        class_name: ""
      },
      tableData: [
        {
          class_id: "10086",
          class_name: "信息科学",
          class_teacher: "王小虎",
          class_credit: "admin",
          class_location: "123456",
          class_time: "15860659635",
          class_begin: "2020-2-15",
          class_end: "2020-12-31"
        },
        {
          class_id: "10086",
          class_name: "信息科学",
          class_teacher: "王小虎",
          class_credit: "admin",
          class_location: "123456",
          class_time: "15860659635",
          class_begin: "2020-2-15",
          class_end: "2020-12-31"
        }
      ],
      users: [],
      page: 1,
      //   listLoading: false,
      sels: [], //列表选中列
      detailVisible: false,
      editFormVisible: false, //编辑界面是否显示
      editMemberFormVisible: false, //编辑成员信息是否显示
      //   editLoading: false,
      editFormRules: {
        class_id: [{ required: true, message: "请输入ID", trigger: "change" }],
        class_name: [
          { required: true, message: "请输入班课名称", trigger: "change" }
        ],
        class_teacher: [
          { required: true, message: "请输入任课老师姓名", trigger: "change" }
        ],
        class_credit: [
          { required: true, message: "请输入学分", trigger: "change" }
        ],
        class_location: [
          { required: true, message: "请输入上课地点", trigger: "change" }
        ],
        class_time: [
          { required: true, message: "请输入上课时间", trigger: "change" }
        ],
        class_begin: [
          { required: true, message: "请选择开课时间", trigger: "change" }
        ],
        class_end: [
          { required: true, message: "请输入结课时间", trigger: "change" }
        ]
      },
      //编辑界面数据
      editForm: {
        class_id: "",
        class_name: "",
        class_teacher: "",
        class_credit: "",
        class_location: "",
        class_time: "",
        class_begin: "",
        class_end: ""
      },
      addFormVisible: false, //新增界面是否显示
      addFormRules: {
        class_id: [{ required: true, message: "请输入ID", trigger: "change" }],
        class_name: [
          { required: true, message: "请输入班课名称", trigger: "change" }
        ],
        class_teacher: [
          { required: true, message: "请输入任课老师姓名", trigger: "change" }
        ],
        class_credit: [
          { required: true, message: "请输入学分", trigger: "change" }
        ],
        class_location: [
          { required: true, message: "请输入上课地点", trigger: "change" }
        ],
        class_time: [
          { required: true, message: "请输入上课时间", trigger: "change" }
        ],
        class_begin: [
          { required: true, message: "请选择开课时间", trigger: "change" }
        ],
        class_end: [
          { required: true, message: "请输入结课时间", trigger: "change" }
        ]
      },
      //新增界面数据
      addForm: {
        class_id: "",
        class_name: "",
        class_teacher: "",
        class_credit: "",
        class_location: "",
        class_time: "",
        class_begin: "",
        class_end: ""
      },
      detailJSON: {
        class_id: "123",
        class_name: "信息科学",
        class_teacher: "王小虎",
        class_credit: "3",
        class_location: "东3-302",
        class_time: "周二下午78节",
        class_begin: "2020-10-15",
        class_end: "2021-2-15",
        class_member: [
          {
            member_name: "刘俊",
            member_ID: "123",
            member_experience: "0",
            member_score: "50",
            member_task: "5",
            member_attend: "5"
          },
          {
            member_name: "刘俊",
            member_ID: "123",
            member_experience: "0",
            member_score: "50",
            member_task: "5",
            member_attend: "5"
          },
          {
            member_name: "你好",
            member_ID: "435",
            member_experience: "10",
            member_score: "50",
            member_task: "5",
            member_attend: "5"
          }
        ]
      },
      editMemberForm: {
        member_name: "",
        member_ID: "",
        member_experience: "",
        member_score: "",
        member_task: "",
        member_attend: ""
      },
            editMemberFormRules: {
        member_experience: [
          { required: true, message: "请输入经验值", trigger: "change" }
        ],
        member_score: [
          { required: true, message: "请输入成绩", trigger: "change" }
        ],
        member_task: [
          { required: true, message: "请输入作业", trigger: "change" }
        ],
        member_attend: [
          { required: true, message: "请输入出勤", trigger: "change" }
        ]
      },
    };
  },
  methods: {
    handleEdit: function(index, row) {
      this.id = row.class_id;
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    }, //实际编辑要请求数据库数据
    checkDetail: function(index, row) {
      this.id = row.class_id; //通过这个ID来向数据库请求数据
      this.detailVisible = true;
    },
    search() {},
    handleDelMember(index, rows) {
      rows.splice(index, 1);
    },
    handleEditMember: function(index, row) {
      this.id = row.class_id;
      this.editMemberFormVisible = true;
      this.editMemberForm = Object.assign({}, row);
    },
    editSubmit: function() {
      /*       this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.axios({
            method: "POST",
            url: "http://localhost:8686/ssm/User/updateOrderForAdmin",
            data: {
              id: this.id,
              user_name: this.editForm.user_name,
              user_account: this.editForm.user_account,
              user_password: this.editForm.user_password,
              user_tel: this.editForm.user_tel,
              user_email: this.editForm.user_email,
              user_role: this.editForm.user_role,
              completed: this.editForm.completed
            }
          }).then(res => {
            if (res.data.status == "success") {
              this.listOrderForAdmin();
              this.$message({
                message: "编辑成功",
                type: "success"
              });
            }
            if (res.data.status == "someerror") {
              this.$message({
                message: "编辑失败",
                type: "warning"
              });
            }
          });
          this.editFormVisible = false;
        }
      }); */
      this.editFormVisible = false;
    },
    editMemberSubmit:function(){
     this.editMemberFormVisible = false;
    },
    handleAdd: function() {
      this.addFormVisible = true;
    },
    addSubmit: function() {
      /*      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.axios({
            method: "POST",
            url: "http://localhost:8686/ssm/User/insertOrderForAdmin",
            data: {
              id: this.addForm.id,
              user_name: this.addForm.user_name,
              user_account: this.addForm.user_account,
              user_password: this.addForm.user_password,
              user_tel: this.addForm.user_tel,
              user_email: this.addForm.user_email,
              user_role: this.addForm.user_role,
              completed: this.addForm.completed
            }
          }).then(res => {
            if (res.data.status == "success") {
              this.listOrderForAdmin();
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
            }
            if (res.data.status == "someerror") {
              this.$message({
                message: "添加失败",
                type: "warning"
              });
            }
          });
          this.addFormVisible = false;
        }
      }); */
      this.addFormVisible = false;
    }

    //删除这条数据

    /*     handleDel(index, row) {
      this.axios({
        method: "POST",
        url: "http://localhost:8686/ssm/User/deleteOrderForAdmin",
        data: {
          id: row.id
        }
      }).then(res => {
        if (res.data.status == "success") {
          this.listOrderForAdmin();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
        if (res.data.status == "someerror") {
          this.$message({
            message: "删除失败",
            type: "warning"
          });
        }
      });
    }, */

    //数据库获取数据

    /*  listOrderForAdmin() {
      this.axios({
        method: "POST",
        url: "http://localhost:8686/ssm/User/listOrderForAdmin",
        data: {
          s: 0
        }
      }).then(res => {
        if (res.data.status == "success") {
          this.tableData = res.data.orderData;
        }
        if (res.data.status == "someerror") {
          this.$message({
            message: "获取数据失败",
            type: "warning"
          });
        }
      });
    } */

    /*   mounted() {
    this.listOrderForAdmin();
  } */
  }
};
</script>

<style>
.detailtext {
  padding-left: 20%;
  font-size: 20px;
}
</style>

