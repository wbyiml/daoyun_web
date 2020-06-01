<template>
  <div>
    <!-- 菜单树 点击：编辑删除    拖拽     新增    三种形状-->
    <div v-if="permissionData.length == 0">
        <el-button type="text" size="mini" @click="() => handleAppend(permissionData)">
            添加节点
        </el-button>
    </div>
    <el-tree
      :data="permissionData"
      :props="defaultProps"
      node-key="id"
      :expand-on-click-node="false"

      @node-click="handleNodeClick"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <i :class="data.icon" ></i>
          {{ node.label }}
          <el-tag v-if="data.is_menu" size="mini" style="margin-left:10px">菜单</el-tag>
          <el-tag v-if="data.is_page" size="mini" type="success" style="margin-left:10px">页面</el-tag>
          <el-tag v-if="data.is_button" size="mini" type="info" style="margin-left:10px">按钮</el-tag>
        </span>
        
        <span>
          <el-button type="text" size="mini" @click="() => handleAppend(data)">
            添加子节点
          </el-button>
          <el-button type="text" size="mini" @click="() => handleEdit(data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="() => handleRemove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <div style="margin:50px 250px" v-if="modified">
      <el-button type="primary"  @click="undoModify()">
        撤销修改
      </el-button>
      <el-button type="primary" style="margin-left:50px" @click="savePermissionVisible=true">
        确认修改
      </el-button>
    </div>
    <!--确认修改-->
    <el-dialog
      title="是否确认修改"
      :visible.sync="savePermissionVisible"
      width="30%"
      center>
      <span>注意：修改权限后，则<span style="color:red">需要重新设置所有角色权限</span>！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="savePermissionVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModify()">确 定</el-button>
      </span>
    </el-dialog>


    <!--新增界面-->
    <el-dialog
      :title="addPermissionTitle"
      :visible.sync="addPermissionVisible"
      :close-on-click-modal="false"
      center
    >
      <el-dialog
        width="30%"
        title="选择图标"
        :visible.sync="iconsVisible"
        append-to-body>
        <span v-for="icon in icons" :key="icon" style="display: inline-flex; width:50px;height:50px;">
          <i :class="icon" style="margin:auto;font-size:30px" @click="addPermissionForm.icon=icon; iconsVisible=false"></i>
        </span>
      </el-dialog>

      <el-form ref="form" :model="addPermissionForm" :rules="rules" >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addPermissionForm.name" placeholder="输入权限的名称" clearable style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="URL" prop="url">
          <el-input  v-model="addPermissionForm.url" placeholder="输入权限对应的url" clearable style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="图标" prop="icon">
          <i :class="addPermissionForm.icon" style="margin:10px;font-size:30px"></i>
          <el-button type="primary" @click="iconsVisible = true">选择</el-button>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <div style="margin-top: 20px">
            <el-checkbox v-model="addPermissionForm.is_menu" label="菜单" border size="medium" :disabled="addPermissionForm.is_button"></el-checkbox>
            <el-checkbox v-model="addPermissionForm.is_page" label="页面" border size="medium"></el-checkbox>
            <el-checkbox v-model="addPermissionForm.is_button" label="按钮" border size="medium" :disabled="addPermissionForm.is_menu"></el-checkbox>
          </div>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" :rows="2" placeholder="请输入权限的描述" v-model="addPermissionForm.description"></el-input>
        </el-form-item>

        <div style="margin:10px 120px;">
          <el-button type="primary" @click="submitForm('form')" style="width:300px">完成</el-button>
        </div>

      </el-form>
    </el-dialog>


    <!--删除确认-->
    <el-dialog
      title="是否删除"
      :visible.sync="deletePermissionVisible"
      width="30%"
      center>
      <span>是否删除权限 <span style="color:red">{{deletePermissionNode.data.name}}</span> </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletePermissionVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletePermission()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "PermissionManage",
  data(){
    return {
        permissionData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        
        addPermissionVisible: false,
        addPermissionTitle:'',
        operation:'',
        addPermissionForm:{
          data:'',
          name:'',
          url:'',
          icon:'',
          is_menu:false,
          is_page:false,
          is_button:false,
          description:'',
        },
        icons:[],
        iconsVisible:false,

        deletePermissionVisible: false, 
        deletePermissionNode: {
          data:{
            name:''
          }
        },
        deletePermissionId: '',

        savePermissionVisible: false, 
        modified: false,

        rules: {
          name: [
            { required: true, message: '权限名称不能为空', trigger: 'blur' },
          ]
        }


    }
  },
  methods: {
    handleNodeClick(node,data) {
      console.log(data);
      console.log(node);
    },

    handleAppend(data) {
      console.log(this) 
      this.addPermissionTitle = '添加子节点'
      this.operation = 1;
      this.addPermissionForm = {
        data:data,
        name:'',
        url:'',
        icon:'',
        is_menu:false,
        is_page:false,
        is_button:false,
        description:'',
      };
      this.addPermissionVisible = true;
    },
    handleEdit(data){
      this.addPermissionTitle = '编辑'
      this.operation = 2;
      this.addPermissionForm = {
        data:data,
        name:data.name,
        url:data.url,
        icon:data.icon,
        is_menu:data.is_menu==true||data.is_menu==1,
        is_page:data.is_page==true||data.is_page==1,
        is_button:data.is_button==true||data.is_button==1,
        description:data.description,
      };
      this.addPermissionVisible = true;
      // console.log(data)
    },
    handleRemove(node, data) { 
      this.deletePermissionNode = node;
      this.deletePermissionId = data.id;
      this.deletePermissionVisible = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.addPermissionForm.is_menu == false && 
             this.addPermissionForm.is_page == false &&
             this.addPermissionForm.is_button == false){
            this.$message({
              showClose: true,
              message: '请选择至少一项类型',
              type: 'error'
            });
            return false;
          }

          if(this.operation == 1){ //新增
            let newChild = { 
              name: this.addPermissionForm.name, 
              url:this.addPermissionForm.url,
              icon:this.addPermissionForm.icon,
              is_menu:this.addPermissionForm.is_menu,
              is_page:this.addPermissionForm.is_page,
              is_button:this.addPermissionForm.is_button,
              description:this.addPermissionForm.description,
              children: [] };
            if(this.addPermissionForm.data.length == 0){
              this.addPermissionForm.data.push(newChild);
            }else{
              if (!this.addPermissionForm.data.children) {
                this.$set(this.addPermissionForm.data, 'children', []);
              }
              this.addPermissionForm.data.children.push(newChild);
            }
          }else if(this.operation == 2){ //编辑
            this.addPermissionForm.data.name = this.addPermissionForm.name;
            this.addPermissionForm.data.url = this.addPermissionForm.url;
            this.addPermissionForm.data.icon = this.addPermissionForm.icon;
            this.addPermissionForm.data.is_menu = this.addPermissionForm.is_menu;
            this.addPermissionForm.data.is_page = this.addPermissionForm.is_page;
            this.addPermissionForm.data.is_button = this.addPermissionForm.is_button;
            this.addPermissionForm.data.description = this.addPermissionForm.description;
          }

          this.addPermissionVisible = false;
          this.modified = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    deletePermission(){
      let parent = this.deletePermissionNode.parent;
      let children = parent.data.children || parent.data;
      let index = children.findIndex(d => d.id === this.deletePermissionId);
      console.log(children[index])
      children.splice(index, 1);
      this.deletePermissionVisible = false;
      this.modified = true;
    },

    handleDragStart(node, ev) {
      console.log('drag start', node, ' ev ',ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label, ' ev ',ev);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label, ' ev ',ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType, ' ev ',ev);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType, ' ev ',ev);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.is_menu == false  && dropNode.data.is_page == false) {
        return type !== 'inner';
      } else {
        this.modified = true;
        return true;
      }
    },
    allowDrag() {
      return true;
      // return draggingNode.data.name.indexOf('校园管理') === -1;  // indexOf为-1表示不包含该字串 
    },

    //撤销修改
    undoModify(){
        let _this = this
        try {
          // 加载权限
          this.$axios.get(this.$serverUrl+'/api/getAllPermissions')
          .then(function (response) {
            console.log(response.data.permissions.rows);
            let permissions = response.data.permissions.rows;
            _this.permissionData = []
            
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
        this.modified = false;
    },
    //确认修改
    confirmModify(){
      let _this = this;
      try {
          this.$axios.post(this.$serverUrl+'/api/updatePermissions', {
            'permissions': this.permissionData,
            'update_time': this.$formatDate(new Date().getTime()),
            'updater': this.$store.state.UserToken.user_id,
          })
          .then(function (response) {
            console.log(response);
            _this.modified = false;
            _this.savePermissionVisible = false;
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




    // 递归创建子树
    buildTree(list,treeNode) {
      let i=0;
      while(list[i]){
        if(list[i].parent_id == treeNode.id){
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
      // 加载icon.json
      let file = '/icon.json'
      let _this = this
      this.$axios.get(file)
      .then(function (response) {
        let icons = response.data
        for(var item in icons){ 
            _this.icons.push(icons[item])
        } 
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
