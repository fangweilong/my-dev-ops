<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <menu-list :menuTree="menuTree"></menu-list>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>
<script>

import MenuList from "@/views/components/MenuList.vue";

export default {
  components: {MenuList},
  data() {
    return {
      activeIndex: "Remote",
      menuTree: [
        {
          name: "Remote",
          title: "远程管理",
          path: "/remote/list"
        },
        {
          name: "Workspace",
          title: "远程管理",
          path: "/workspace/list"
        },
        {
          name: "Info",
          title: "远程管理",
          path: "/info/list"
        },
        {
          name: "Orders",
          title: "远程管理",
          path: "/orders/list"
        }
      ]
    };
  },
  mounted() {
    this.toPath();
  },
  methods: {
    handleSelect(key, path) {
      this.activeIndex = key;
      this.toPath();
    },
    toPath() {
      this.$router.push({name: this.activeIndex});
    }
  }
};
</script>
<style scoped>
</style>
