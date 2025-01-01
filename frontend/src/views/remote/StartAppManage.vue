<template>
  <el-form
      label-position="right"
      label-width="auto"
      :model="tableData"
  >
    <el-form-item label="xshell" label-position="right">
      <el-input v-model="tableData.xshell"/>
      <el-button type="primary" @click="selectDir('xshell',tableData.xshell)">
        重新选择
      </el-button>
    </el-form-item>
    <el-form-item label="xftp" label-position="right">
      <el-input v-model="tableData.xftp"/>
      <el-button type="primary" @click="selectDir('xftp',tableData.xftp)">
        重新选择
      </el-button>
    </el-form-item>
    <el-form-item label="微软远程桌面" label-position="right">
      <el-input v-model="tableData.microsoftRemoteDesktop"/>
      <el-button type="primary" @click="selectDir('microsoftRemoteDesktop',tableData.microsoftRemoteDesktop)">
        重新选择
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">
        保存/修改
      </el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import {ipcApiRoute} from '@/api/main';
import {ipc} from '@/utils/ipcRenderer';

export default {
  name: "StartAppManage",
  emits: ['handleEmit'],
  data() {
    return {
      tableData:{
        xshell: "", //xShell
        xftp: "", //xFtp
        microsoftRemoteDesktop: "", //微软远程桌面
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      ipc.invoke(ipcApiRoute.remoteAppList).then(res => {
        if(res.code === 200){
          const entries = Object.entries(res.data);
          for (const [key, value] of entries) {
            this.tableData[key] = value.path;
          }
        }
      })
    },
    submitForm(){
      ipc.invoke(ipcApiRoute.remoteAppListUpdate, JSON.stringify(this.tableData)).then(res => {
        if(res.code === 200){
          this.$message({
            type: "success",
            message: "操作成功",
          });
          // 处理逻辑完成后，触发事件，并传递数据
          this.close();
        }
      })
    },
    selectDir(key,path) {
      ipc.invoke(ipcApiRoute.selectExe, path).then(r => {
        this.tableData[key] = r;
      })
    },
    close(){
      this.$emit('handleEmit');
    }
  }
};
</script>
