<template>
  <div>
    <!-- 工具条 -->
    <div style="margin:20px;">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="handleAddDictionary">新增</el-button>
        </el-col>
        <el-col :span="12">
          <label>查找</label>
          <el-input v-model="searchContent" placeholder="请输入字典名称或英文标识" style="width:300px"></el-input>
        </el-col>
      </el-row>
    </div>

    <!-- 字典列表 -->
    <div>
      <el-table
      :data="DictionaryTableData.filter(data => !searchContent || 
                                                data.name.toLowerCase().includes(searchContent.toLowerCase()) || 
                                                data.englishName.toLowerCase().includes(searchContent.toLowerCase()) )"
      stripe border style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="字典名称"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="englishName"
          label="英文标识"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditDictionary(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteDictionary(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!--新增界面-->
    <el-dialog
      :title="addDictionaryTitle"
      :visible.sync="AddDictionaryVisible"
      :close-on-click-modal="false"
      center
    >
      <el-form ref="form" :model="addDictionaryForm" :rules="rules" >
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="addDictionaryForm.name" placeholder="输入字典的名称" clearable style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="英文标识" prop="englishName">
          <el-input  v-model="addDictionaryForm.englishName" placeholder="输入字典的英文标识" clearable style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" :rows="2" placeholder="请输入字典的描述" v-model="addDictionaryForm.description"></el-input>
        </el-form-item>

        <div>
          <div style="margin:10px;">
            <el-row>
              <el-col :span="12">
                <label>字典项</label>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="addDictionaryItem">新增字典项</el-button>
              </el-col>
            </el-row>
          </div>



          <el-table 
            :data="addDictionaryForm.items" 
            stripe border style="width: 100%" max-height="250"
            :default-sort = "{prop: 'sort', order: 'ascending'}"
            @cell-click = 'clickAddDictionaryItemsCell'
            @cell-mouse-enter = 'hoverAddDictionaryItemsCell'
            @cell-mouse-leave = 'leaveAddDictionaryItemsCell'
            ref="addDictionaryItemsTable"
          >
            <el-table-column
              label="序号"
              prop="sort"
              align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.sortButton" @click="clickSortButton(scope.row)" type="primary" icon="el-icon-top"></el-button>
                <span v-else>{{scope.row.sort}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="keyword"
              label="keyword">
              <template slot-scope="scope">
                <el-input v-if="scope.row.status" v-model="scope.row.keyword" placeholder="输入keyword"></el-input>
                <span v-else>{{scope.row.keyword}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              label="value">
              <template slot-scope="scope">
                <el-input v-if="scope.row.status" v-model="scope.row.value" placeholder="输入value"></el-input>
                <span v-else>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_default"
              label="默认值"
              align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.is_default" class="el-icon-check"></i>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini" v-if="!scope.row.status"
                  @click="scope.row.status = 1">编辑</el-button>
                <el-button
                  size="mini" v-if="scope.row.status"
                  @click="scope.row.status = 0">完成</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteDictionaryItem(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div style="margin:10px 120px;">
          <el-button type="primary" @click="submitForm('form')" style="width:300px">完成</el-button>
        </div>

      </el-form>
    </el-dialog>

    <!--删除确认-->
    <!-- <el-dialog
      title="是否删除"
      :visible.sync="DeleteDictionaryVisible"
      :close-on-click-modal="false"
      center
    >
    </el-dialog> -->
    <el-dialog
      title="是否删除"
      :visible.sync="DeleteDictionaryVisible"
      width="30%"
      center>
      <span>是否删除字典名称为 <span style="color:red">{{deleteDictionaryName}}</span> 的字典</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DeleteDictionaryVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDictionary()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContent:'',

      DictionaryTableData: [],

      AddDictionaryVisible: false,
      addDictionaryTitle:'',
      operation:'',
      addDictionaryForm:{
        name:'',
        englishName:'',
        description:'',
        items:[]
      },

      DeleteDictionaryVisible: false, 
      deleteDictionaryName: '',

      rules: {
        name: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    addDictionaryItem: function() {
      let isDefault = false;
      if(this.addDictionaryForm.items.length==0){
        isDefault = true
      }
      this.addDictionaryForm.items.push({ 
        keyword: '', 
        value: '', 
        is_default: isDefault, 
        sort:this.addDictionaryForm.items.length+1, 

        sortButton:0,
        status:1 });
    },
    deleteDictionaryItem: function(row) {
      for (let i = 0; i < this.addDictionaryForm.items.length; i++) {
          if (this.addDictionaryForm.items[i].sort == row.sort) {
              // 第一个参数：删除起始地址 第二个参数：删除长度
              this.addDictionaryForm.items.splice(i, 1);
              i -= 1;
          }else if(this.addDictionaryForm.items[i].sort > row.sort){
              this.addDictionaryForm.items[i].sort -= 1;
          }
      }
    },
    // clickAddDictionaryItemsCell: function(row, column, cell, event){
    clickAddDictionaryItemsCell: function(row, column){
      if(column.property == 'is_default'){
        for (let i = 0; i < this.addDictionaryForm.items.length; i++) {
          this.addDictionaryForm.items[i].is_default = false;
        }
        row.is_default = true
      }
    },
    // hoverAddDictionaryItemsCell: function(row, column, cell, event){
    hoverAddDictionaryItemsCell:function(row, column){
      if(column.property == 'sort' && row.sort!=1){
        row.sortButton = 1
      }
    },
    leaveAddDictionaryItemsCell:function(row, column){
      if(column.property == 'sort'){
        row.sortButton = 0
      }
    },
    clickSortButton: function(row){
      for (let i = 0; i < this.addDictionaryForm.items.length; i++) {
          if (this.addDictionaryForm.items[i].sort == row.sort-1) {
              // 第一个参数：删除起始地址 第二个参数：删除长度
              this.addDictionaryForm.items[i].sort += 1;
          }
      }
      row.sort -= 1;
      this.$refs.addDictionaryItemsTable.sort('sort',  'ascending');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let items = [];
          for(let i=0;i<this.addDictionaryForm.items.length;i++){
            items.push({ 
              keyword: this.addDictionaryForm.items[i].keyword, 
              value: this.addDictionaryForm.items[i].value, 
              is_default: this.addDictionaryForm.items[i].is_default, 
              sort: this.addDictionaryForm.items[i].sort, 
            });
          }
          try {
              const _this = this;
              this.$axios.post(this.$serverUrl+'/api/createDictionary', {
                'id': this.addDictionaryForm.id,
                'name': this.addDictionaryForm.name,
                'englishName': this.addDictionaryForm.englishName,
                'description': this.addDictionaryForm.description,
                'items': items,
                'operation': this.operation
              })
              .then(function (response) {
                console.log(response);
                if(response.data.state == -1){
                  console.log('dictionary already exist');
                  _this.$message({
                    showClose: true,
                    message: '该字典名称已存在，请重新输入字典名称',
                    type: 'error'
                  });
                }else{
                  // 新建字典成功
                  _this.AddDictionaryVisible = false;
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

    deleteDictionary: function(){
      try {
          const _this = this;
          this.$axios.post(this.$serverUrl+'/api/deleteDictionary', {
            'name': this.deleteDictionaryName,
          })
          .then(function (response) {
            console.log(response);
            _this.DeleteDictionaryVisible = false;
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
          console.log(e)
      }
    },


    handleAddDictionary: function() { 
      this.addDictionaryTitle = '新增';
      this.operation = 1;
      this.addDictionaryForm = {
        name:'',
        englishName:'',
        description:'',
        items:[]
      };
      this.AddDictionaryVisible = true;
    },
    handleEditDictionary(row) {
      this.addDictionaryTitle = '编辑';
      this.operation = 2;
      try {
        const _this = this;
        this.$axios.post(this.$serverUrl+'/api/getDictionaryByName', {
          'name': row.name,
        })
        .then(function (response) {
          console.log(response.data.dictionary);
          let items = [];
          for(let i=0;i<response.data.dictionary.items.length;i++){
            items.push({ 
              keyword: response.data.dictionary.items[i].keyword, 
              value: response.data.dictionary.items[i].value, 
              is_default: response.data.dictionary.items[i].is_default, 
              sort: response.data.dictionary.items[i].sort, 
              sortButton:0,
              status:0
            });
          }
          _this.addDictionaryForm = {
            'id': response.data.dictionary.id,
            'name': response.data.dictionary.name,
            'englishName': response.data.dictionary.englishName,
            'description': response.data.dictionary.description,
            'items':items
          };
          _this.AddDictionaryVisible = true;
        })
        .catch(function (error) {
          console.log(error);
        }); 
      } catch (e) {
          console.log(e)
      }
      // console.log(row);
    },
    handleDeleteDictionary(row) {
      this.deleteDictionaryName = row.name
      this.DeleteDictionaryVisible = true;
      console.log( row);
    },
    

  },
  //初始化页面完成后,再对dom节点进行相关操作
  mounted() {
    try {
      const _this = this;
      this.$axios.get(this.$serverUrl+'/api/getAllDictionaries')
      .then(function (response) {
        console.log(response.data.dictionaries.rows);
        _this.DictionaryTableData = response.data.dictionaries.rows
      })
      .catch(function (error) {
        console.log(error);
      }); 
    } catch (e) {
        console.log(e)
    }
  }
};
</script>


