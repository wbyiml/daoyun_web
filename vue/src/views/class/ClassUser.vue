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
            <el-select v-model="value" placeholder="请选择你的班课">
              <el-option
                v-for="item in optionss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="filters.name"
              placeholder="请输入成员姓名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查找</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 列表 -->
      <el-table
        :data="
          tableData.filter(
            data =>
              !filters.name ||
              data.user_name
                .toString()
                .toLowerCase()
                .includes(filters.name.toLowerCase())
          )
        "
        highlight-current-row
        @selection-change="selsChange"
        style="width: 100%;"
        stripe
      >
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="100"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_name"
          label="姓名"
          width="100"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_account"
          label="账号"
          width="100"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_sex"
          label="性别"
          width="100"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_password"
          label="密码"
          width="100"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_tel"
          label="手机号码"
          width="120"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_email"
          label="电子邮箱"
          width="150"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_school"
          label="所属学校"
          width="150"
          sortable
        ></el-table-column>
        <el-table-column
          prop="user_college"
          label="所属学院"
          width="150"
          sortable
        ></el-table-column>
        <el-table-column label="管理" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--编辑界面-->
      <el-dialog
        title="编辑"
        :visible.sync="editFormVisible"
        :close-on-click-modal="false"
        center
      >
        <el-form
          :model="editForm"
          label-width="80px"
          :rules="editFormRules"
          ref="editForm"
        >
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="ID" prop="id">
                <el-input
                  v-model="editForm.id"
                  auto-complete="off"
                  style="width:150px;"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="姓名" prop="user_name">
              <el-input
                v-model="editForm.user_name"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="账号" prop="user_account">
                <el-input
                  v-model="editForm.user_account"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="密码" prop="user_password">
              <el-input
                v-model="editForm.user_password"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="手机号码" prop="user_tel">
                <el-input
                  v-model="editForm.user_tel"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="电子邮箱" prop="user_email">
              <el-input
                v-model="editForm.user_email"
                style="width:250px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="角色" prop="user_role">
                <el-select
                  v-model="editForm.user_role"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="生日" prop="user_birthday">
              <el-date-picker
                v-model="editForm.user_birthday"
                type="date"
                placeholder="选择出生日期"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="学号" prop="user_student_ID">
                <el-input
                  v-model="editForm.user_student_ID"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="学校" prop="user_school">
              <el-input
                v-model="editForm.user_school"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="学院" prop="user_college">
                <el-input
                  v-model="editForm.user_college"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="专业" prop="user_major">
              <el-input
                v-model="editForm.user_major"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="年级" prop="user_grade">
                <el-input
                  v-model="editForm.user_grade"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="班级" prop="user_class">
              <el-input
                v-model="editForm.user_class"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-form-item label="性别" prop="user_sex">
            <el-radio v-model="editForm.user_sex" label="1">男</el-radio>
            <el-radio v-model="editForm.user_sex" label="2">女</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog
        title="新增"
        :visible.sync="addFormVisible"
        :close-on-click-modal="false"
        center
        v-if="addFormVisible"
      >
        <el-form
          :model="AddForm"
          label-width="80px"
          :rules="addFormRules"
          ref="addForm"
        >
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="ID" prop="id">
                <el-input
                  v-model="addForm.id"
                  auto-complete="off"
                  style="width:150px;"
                  :disabled="true"
                  placeholder="系统自动生成"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="姓名" prop="user_name">
              <el-input
                v-model="addForm.user_name"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="账号" prop="user_account">
                <el-input
                  v-model="addForm.user_account"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="密码" prop="user_password">
              <el-input
                v-model="addForm.user_password"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="手机号码" prop="user_tel">
                <el-input
                  v-model="addForm.user_tel"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="电子邮箱" prop="user_email">
              <el-input
                v-model="addForm.user_email"
                style="width:250px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="角色" prop="user_role">
                <el-select v-model="addForm.user_role" placeholder="请选择角色">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="生日" prop="user_birthday">
              <el-date-picker
                v-model="addForm.user_birthday"
                type="date"
                placeholder="选择出生日期"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="学号" prop="user_student_ID">
                <el-input
                  v-model="addForm.user_student_ID"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="学校" prop="user_school">
              <el-input
                v-model="addForm.user_school"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="学院" prop="user_college">
                <el-input
                  v-model="addForm.user_college"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="专业" prop="user_major">
              <el-input
                v-model="addForm.user_major"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="年级" prop="user_grade">
                <el-input
                  v-model="addForm.user_grade"
                  style="width:150px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="班级" prop="user_class">
              <el-input
                v-model="addForm.user_class"
                style="width:150px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-form-item label="性别" prop="user_sex">
            <el-radio v-model="addForm.user_sex" label="1">男</el-radio>
            <el-radio v-model="addForm.user_sex" label="2">女</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: "ClassUser",
  data() {
    return {
      filters: {
        name: ""
      },
      optionss: [
        {
          value: "选项1",
          label: "数据结构"
        },
        {
          value: "选项2",
          label: "计算机网络"
        },
        {
          value: "选项3",
          label: "算法"
        },
        {
          value: "选项4",
          label: "工程实践"
        }
      ],
      value: "",
      tableData: [
        {
          id: "10086",
          user_name: "王小虎",
          user_account: "admin",
          user_sex: "男",
          user_password: "123456",
          user_tel: "15860659635",
          user_email: "16156165@qq.com",
          user_school: "福州大学",
          user_college: "数计学院",
          user_role: "超级管理员"
        },
        {
          id: "12345",
          user_name: "小李",
          user_account: "xiaoli",
          user_sex: "男",
          user_password: "654321",
          user_tel: "12345678910",
          user_email: "165165@qq.com",
          user_school: "福州大学",
          user_college: "数计学院",
          user_role: "教师"
        }
      ],
      users: [],
      page: 1,
      //   listLoading: false,
      sels: [], // 列表选中列

      editFormVisible: false, // 编辑界面是否显示
      //   editLoading: false,
      editFormRules: {
        user_name: [
          { required: true, message: "请输入姓名", trigger: "change" }
        ],
        user_account: [
          { required: true, message: "请输入账号", trigger: "change" }
        ],
        user_password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        user_tel: [
          { required: true, message: "请输入手机号码", trigger: "change" }
        ],
        user_email: [
          { required: true, message: "请输入电子邮箱", trigger: "change" }
        ],
        user_role: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        user_student_ID: [
          { required: true, message: "请输入学号", trigger: "change" }
        ],
        user_school: [
          { required: true, message: "请输入学校", trigger: "change" }
        ],
        user_college: [
          { required: true, message: "请输入学院", trigger: "change" }
        ],
        user_major: [
          { required: true, message: "请输入专业", trigger: "change" }
        ],
        user_grade: [
          { required: true, message: "请输入年级", trigger: "change" }
        ],
        user_class: [
          { required: true, message: "请输入班级", trigger: "change" }
        ],
        user_birthday: [
          { required: true, message: "请选择生日", trigger: "change" }
        ],
        user_sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      // 编辑界面数据
      editForm: {
        id: "",
        user_name: "",
        user_account: "",
        user_password: "",
        user_tel: "",
        user_email: "",
        user_role: "",
        user_student_ID: "",
        user_school: "",
        user_college: "",
        user_major: "",
        user_grade: "",
        user_class: "",
        user_birthday: "",
        user_sex: ""
      },
      options: [
        {
          value: "1",
          label: "学生"
        },
        {
          value: "2",
          label: "教师"
        },
        {
          value: "3",
          label: "超级管理员"
        }
      ],
      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        user_name: [
          { required: true, message: "请输入姓名", trigger: "change" }
        ],
        user_account: [
          { required: true, message: "请输入账号", trigger: "change" }
        ],
        user_password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        user_tel: [
          { required: true, message: "请输入手机号码", trigger: "change" }
        ],
        user_email: [
          { required: true, message: "请输入电子邮箱", trigger: "change" }
        ],
        user_role: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        user_student_ID: [
          { required: true, message: "请输入学号", trigger: "change" }
        ],
        user_school: [
          { required: true, message: "请输入学校", trigger: "change" }
        ],
        user_college: [
          { required: true, message: "请输入学院", trigger: "change" }
        ],
        user_major: [
          { required: true, message: "请输入专业", trigger: "change" }
        ],
        user_grade: [
          { required: true, message: "请输入年级", trigger: "change" }
        ],
        user_class: [
          { required: true, message: "请输入班级", trigger: "change" }
        ],
        user_birthday: [
          { required: true, message: "请选择生日", trigger: "change" }
        ],
        user_sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      // 新增界面数据
      addForm: {
        id: "",
        user_name: "",
        user_account: "",
        user_password: "",
        user_tel: "",
        user_email: "",
        user_role: "",
        user_student_ID: "",
        user_school: "",
        user_college: "",
        user_major: "",
        user_grade: "",
        user_class: "",
        user_birthday: "",
        user_sex: ""
      }
    };
  },
  methods: {
    handleEdit: function(index, row) {
      this.id = row.id;
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    }, // 实际编辑要请求数据库数据

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

    // 删除这条数据

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

    // 数据库获取数据

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
  }
  /*   mounted() {
    this.listOrderForAdmin();
  } */
};
</script>
