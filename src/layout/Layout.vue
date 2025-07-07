<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
      <div class="logo-container">
        <img src="/vite.svg" alt="logo" class="logo" />
        <span v-show="!isCollapse" class="title">瑞卿demo</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><Monitor /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        <el-menu-item index="/table">
          <el-icon><Document /></el-icon>
          <template #title>表格</template>
        </el-menu-item>
        <el-menu-item index="/form">
          <el-icon><Edit /></el-icon>
          <template #title>表单</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <div class="header-left">
          <el-icon 
            class="collapse-btn"
            @click="toggleSidebar"
          >
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" />
              <span class="username">Admin</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主要内容区 -->
      <el-main>
        <el-tabs
          v-model="activeTab"
          class="demo-tabs"
          @tab-click="handleClick"
          type="card"
          closable
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in visitedViews"
            :key="item.path"
            :label="item.title"
            :name="item.path"
          >
          </el-tab-pane>
        </el-tabs>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Monitor, Document, Edit, Fold, Expand } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)
const activeTab = ref('/dashboard')
const visitedViews = ref([
  { path: '/dashboard', title: '仪表盘' },
])

const activeMenu = computed(() => route.path)

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleClick = (tab) => {
  router.push(tab.props.name)
}

const removeTab = (targetPath) => {
  if (activeTab.value === targetPath) {
    visitedViews.value.forEach((tab, index) => {
      if (tab.path === targetPath) {
        const nextTab = visitedViews.value[index + 1] || visitedViews.value[index - 1]
        if (nextTab) {
          activeTab.value = nextTab.path
          router.push(nextTab.path)
        }
      }
    })
  }
  visitedViews.value = visitedViews.value.filter(tab => tab.path !== targetPath)
}

// 监听路由变化，添加页签
watch(
  () => route.path,
  (path) => {
    activeTab.value = path
    const title = {
      '/dashboard': '仪表盘',
      '/table': '表格',
      '/form': '表单'
    }[path]
    
    if (!visitedViews.value.find(tab => tab.path === path)) {
      visitedViews.value.push({
        path,
        title
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #2b3649;
}

.logo {
  width: 32px;
  height: 32px;
}

.title {
  color: #fff;
  font-size: 16px;
  margin-left: 12px;
  white-space: nowrap;
}

.el-menu-vertical {
  border-right: none;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.header-left {
  display: flex;
  align-items: center;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 8px;
  color: #303133;
}

.demo-tabs {
  margin-bottom: 15px;
}
</style>