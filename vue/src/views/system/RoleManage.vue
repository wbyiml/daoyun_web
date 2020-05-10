<template>
  <div>
    <!-- 工具条 -->
    <div style="margin:20px;">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="handleAddRole">新增</el-button>
        </el-col>
        <el-col :span="12">
          <label>查找</label>
          <el-input v-model="searchContent" placeholder="请输入角色名" style="width:300px"></el-input>
        </el-col>
      </el-row>
    </div>

    <!-- 角色列表 -->
    <div>
      <el-table
      :data="RoleTableData.filter(data => !searchContent || data.name.toLowerCase().includes(searchContent.toLowerCase()) )"
      stripe border style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="角色名称"
          sortable>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditRole(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    每个角色拥有的权限    ||    每个权限对应的角色(菜单树 角色标签（可删除）  添加角色)

    <!--新增界面-->
    <el-dialog
      :title="addRoleTitle"
      :visible.sync="AddRoleVisible"
      :close-on-click-modal="false"
      center
    >
      <el-form ref="form" :model="addRoleForm" :rules="rules" >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name" placeholder="输入角色的名称" clearable style="width:300px"></el-input>
        </el-form-item>

        <div>
          <div style="margin:10px;">
            <label>为该角色选择权限</label>
            <el-tooltip effect="dark" content="清空选择" placement="right">
              <el-button @click="resetCheckedPermission" icon="el-icon-delete" size="mini" circle style="margin-left:50px"></el-button>
            </el-tooltip>
            
          </div>
          <el-tree
            :data="permissionData"
            :props="defaultProps"
            node-key="id"
            ref="tree"
            default-expand-all
            :expand-on-click-node="true"
            show-checkbox

            @node-click="handleNodeClick"
            style="margin:10px;"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i :class="data.icon" ></i>
                {{ node.label }}
                <el-tag v-if="data.is_menu" size="mini" style="margin-left:10px">菜单</el-tag>
                <el-tag v-if="data.is_page" size="mini" type="success" style="margin-left:10px">页面</el-tag>
                <el-tag v-if="data.is_button" size="mini" type="info" style="margin-left:10px">按钮</el-tag>
              </span>
            </span>
          </el-tree>
        </div>

        <div style="margin:10px 120px;">
          <el-button type="primary" @click="submitForm('form')" style="width:300px">完成</el-button>
        </div>

      </el-form>
    </el-dialog>

    <!--删除确认-->
    <el-dialog
      title="是否删除"
      :visible.sync="DeleteRoleVisible"
      width="30%"
      center>
      <span>是否删除角色 <span style="color:red">{{deleteRoleName}}</span></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DeleteRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRole()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      searchContent:'',

      RoleTableData: [],
      permissionData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },

      AddRoleVisible: false,
      addRoleTitle:'',
      operation:'',
      addRoleForm:{
        name:'',
        permissions:[]
      },

      DeleteRoleVisible: false, 
      deleteRoleName: '',

      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    handleNodeClick(node,data) {
      console.log('node',node);
      console.log('data',data);
    },
    resetCheckedPermission() {
      this.$refs.tree.setCheckedKeys([]);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.$refs.tree.getCheckedNodes());
          // this.$refs.tree.setCheckedNodes([{"id":238},{"id":237},]);
          let permissions = []
          for(let i=0;i<this.$refs.tree.getCheckedNodes().length;i++){
            permissions.push({'id':this.$refs.tree.getCheckedNodes()[i].id})
          }
          try {
              const _this = this;
              this.$axios.post(this.$serverUrl+'/api/createRole', {
                'id': this.addRoleForm.id,
                'name': this.addRoleForm.name,
                'create_time': this.$formatDate(new Date().getTime()),
                'creator': this.$store.state.UserToken.user_id,
                'permissions': permissions,
                'operation': this.operation
              })
              .then(function (response) {
                console.log(response);
                if(response.data.state == -1){
                  console.log('Role already exist');
                  _this.$message({
                    showClose: true,
                    message: '该角色名称已存在，请重新输入角色名称',
                    type: 'error'
                  });
                }else{
                  // 新建角色成功
                  _this.AddRoleVisible = false;
                  window.location.reload();
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } catch (e) {
              console.log(e)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    deleteRole: function(){
      try {
          const _this = this;
          this.$axios.post(this.$serverUrl+'/api/deleteRole', {
            'name': this.deleteRoleName,
          })
          .then(function (response) {
            console.log(response);
            _this.DeleteRoleVisible = false;
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
          console.log(e)
      }
    },


    handleAddRole: function() { 
      this.addRoleTitle = '新增';
      this.operation = 1;
      this.addRoleForm = {
        name:'',
        permissions:[]
      };
      this.AddRoleVisible = true;
    },
    handleEditRole(row) {
      this.AddRoleVisible = true;
      this.addRoleTitle = '编辑';
      this.operation = 2;
      try {
        const _this = this;
        this.$axios.post(this.$serverUrl+'/api/getRoleByName', {
          'name': row.name,
        })
        .then(function (response) {
          console.log(response.data.role);
          let permissions = [];
          for(let i=0;i<response.data.role.permissions.length;i++){
            permissions.push(
              {'id':response.data.role.permissions[i].permission_id}
            );
          }
          _this.addRoleForm = {
            'id': response.data.role.id,
            'name': response.data.role.name,
            'permissions': permissions
          };
          _this.$refs.tree.setCheckedNodes(permissions);
        })
        .catch(function (error) {
          console.log(error);
        }); 
      } catch (e) {
          console.log(e)
      }
      // console.log(row);
    },
    handleDeleteRole(row) {
      this.deleteRoleName = row.name
      this.DeleteRoleVisible = true;
    },
    




    // 递归创建子树
    buildTree(list,treeNode) {
      let i=0;
      while(list[i]){
        if(list[i].parent_id == treeNode.id){
          if(list[i].id>this.lastId){
            this.lastId = list[i].id;
          }
          list[i].children = [];
          treeNode.children.push(list[i]);
          list.splice(i, 1);
          this.buildTree(list,treeNode.children[treeNode.children.length-1]);
        }else{
          i++;
        }
      }
    },

  },
  //初始化页面完成后,再对dom节点进行相关操作
  mounted() {
    try {
      const _this = this;
      // 加载角色
      this.$axios.get(this.$serverUrl+'/api/getAllRoles')
      .then(function (response) {
        console.log(response.data.roles.rows);
        _this.RoleTableData = response.data.roles.rows
      })
      .catch(function (error) {
        console.log(error);
      }); 

      // 加载权限
      this.$axios.get(this.$serverUrl+'/api/getAllPermissions')
      .then(function (response) {
        console.log(response.data.permissions.rows);
        let permissions = response.data.permissions.rows;
        
        // 有parent_id的list转换成带children的树
        while(permissions[0] && permissions[0].parent_id == 0){
          permissions[0].children = [];
          _this.permissionData.push(permissions[0]);
          permissions.splice(0, 1);
        }
        for(let i=0;i<_this.permissionData.length;i++){
          _this.buildTree(permissions,_this.permissionData[i])
        }
      })

    } catch (e) {
        console.log(e)
    }
  }
}
</script>
