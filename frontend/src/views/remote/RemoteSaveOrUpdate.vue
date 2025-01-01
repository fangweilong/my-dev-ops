<template>
  <el-form
      label-position="right"
      label-width="auto"
      :model="data"
  >
    <el-form-item label="id" label-position="right">
      <el-input v-model="data.id"/>
    </el-form-item>
    <el-form-item label="类型" label-position="right">
      <el-input v-model="data.remoteType"/>
    </el-form-item>
    <el-form-item label="名称" label-position="right">
      <el-input v-model="data.name"/>
    </el-form-item>
    <el-form-item label="地址" label-position="right">
      <el-input v-model="data.addr"/>
    </el-form-item>
    <el-form-item label="用户名" label-position="right">
      <el-input v-model="data.username"/>
    </el-form-item>
    <el-form-item label="密码" label-position="right">
      <el-input v-model="data.password"/>
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
  name: "RemoteSaveOrUpdate",
  emits: ['handleEmit'],
  props: {
    data: {
      type: {},
      default: {
        id:'',
        remoteType: '',
        name: '',
        addr:'',
        username: '',
        password: ''
      }
    }
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    submitForm() {
      ipc.invoke(ipcApiRoute.remoteManageSaveOrUpdate, JSON.stringify(this.data)).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "操作成功",
          });
          // 处理逻辑完成后，触发事件，并传递数据
          this.close();
        } else {
          this.$message({
            type: "error",
            message: "未知错误",
          });
        }
      })
    },
    close() {
      this.$emit('handleEmit');
    }
  }
};
</script>
