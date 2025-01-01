<template>
  <el-menu
      router
  >
    <!-- 遍历菜单 -->
    <template v-for="item in menuTree">
      <!-- 含有子菜单 -->
      <template v-if="item.children">
        <!-- 第一层 含有子菜单菜单 -->
        <el-sub-menu :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <menu-list :menuTree="item.children"></menu-list><!--递归调用-->
        </el-sub-menu>
      </template>

      <!-- 第一层 不含子菜单  -->
      <template v-else>
        <el-menu-item :index="item.path" :key="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>

</template>

<script>

export default {
  name: 'MenuList',
  props: {
    menuTree: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  }
}
</script>
