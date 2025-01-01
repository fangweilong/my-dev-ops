<template>

  <el-row>
    <el-button type="primary" @click="appConfigVisible = true">配置文件</el-button>

    <el-button type="primary" icon="Plus" @click="saveOrUpdateDialogVisible = true">新增</el-button>
  </el-row>

  <el-row>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column prop="remoteType" label="类型" width="180"/>
      <el-table-column prop="name" label="名称" width="180"/>
      <el-table-column prop="addr" label="地址" width="180"/>
      <el-table-column prop="username" label="连接名" width="180"/>
      <el-table-column prop="password" label="连接密码"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              type="primary"
              @click="handleStart(scope.row)"
          >连接
          </el-button>
          <el-button
              type="primary" icon="Edit" circle
              @click="handleUpdate(scope.row)"
          ></el-button>
          <el-button
              type="danger" icon="Delete" circle
              @click="handleDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>

  <el-dialog v-model="saveOrUpdateDialogVisible" title="新增/编辑" width="800" :close-on-click-modal="false"
             :close-on-press-escape="false">
    <SaveOrUpdate :data="selectData" @handleEmit="handleEmit"></SaveOrUpdate>
  </el-dialog>

  <el-dialog v-model="appConfigVisible" title="新增/编辑" width="800" :close-on-click-modal="false"
             :close-on-press-escape="false">
    <StartAppManage @handleEmit="handleEmit"></StartAppManage>
  </el-dialog>
</template>

<script>
import {ipcApiRoute} from '@/api/main';
import {ipc} from '@/utils/ipcRenderer';
import SaveOrUpdate from "@/views/remote/RemoteSaveOrUpdate.vue";
import StartAppManage from "@/views/remote/StartAppManage.vue";

export default {
  components: {StartAppManage, SaveOrUpdate},
  data() {
    return {
      saveOrUpdateDialogVisible: false, //新增或者编辑的弹窗
      appConfigVisible: false, //配置文件的弹窗
      tableData: [{name: "", remoteType: "", addr: "", username: "", password: ""}], //表格数据
      selectData: {}, //选中数据
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const params = {}
      ipc.invoke(ipcApiRoute.remoteManageList, params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        } else {
          this.$message({
            type: "error",
            message: "未知错误",
          });
        }
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      ipc.invoke(ipcApiRoute.remoteManageDelete, params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: "未知错误",
          });
        }
      })
      this.getData();
    },
    handleUpdate(row) {
      this.selectData = row;
      this.saveOrUpdateDialogVisible = true;
    },
    handleEmit() {
      this.selectData = {};
      this.saveOrUpdateDialogVisible = false;
      this.getData();
    },
    handleStart(row) {
      const params = {
        id: row.id
      }
      ipc.invoke(ipcApiRoute.remoteAppOpen, params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: "未知错误",
          });
        }
      })
    }
  }
};
</script>
