<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <el-icon class="icon"><User /></el-icon>
              <span>用户总数</span>
            </div>
          </template>
          <div class="card-content">
            <span class="number">1,234</span>
            <span class="unit">人</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <el-icon class="icon"><ShoppingCart /></el-icon>
              <span>订单总数</span>
            </div>
          </template>
          <div class="card-content">
            <span class="number">856</span>
            <span class="unit">单</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <el-icon class="icon"><Money /></el-icon>
              <span>销售额</span>
            </div>
          </template>
          <div class="card-content">
            <span class="number">45,678</span>
            <span class="unit">元</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <el-icon class="icon"><MessageBox /></el-icon>
              <span>消息数</span>
            </div>
          </template>
          <div class="card-content">
            <span class="number">99</span>
            <span class="unit">条</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>最近活动</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
            </div>
          </template>
          <el-table :data="todos" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === '已完成' ? 'success' : 'warning'">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, ShoppingCart, Money, MessageBox } from '@element-plus/icons-vue'

const activities = ref([
  {
    content: '完成了每日任务',
    timestamp: '2024-01-10 20:46',
    type: 'success'
  },
  {
    content: '新增了一个产品',
    timestamp: '2024-01-10 18:30',
    type: 'primary'
  },
  {
    content: '更新了系统配置',
    timestamp: '2024-01-10 16:15',
    type: 'info'
  },
  {
    content: '修复了已知问题',
    timestamp: '2024-01-10 14:20',
    type: 'warning'
  }
])

const todos = ref([
  {
    title: '完成产品设计文档',
    status: '进行中'
  },
  {
    title: '召开团队周会',
    status: '已完成'
  },
  {
    title: '系统性能优化',
    status: '进行中'
  },
  {
    title: '用户反馈处理',
    status: '已完成'
  }
])
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.dashboard-card {
  .card-header {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 8px;
      font-size: 20px;
      color: #409EFF;
    }
  }

  .card-content {
    text-align: center;
    padding: 10px 0;
    .number {
      font-size: 24px;
      font-weight: bold;
      color: #303133;
    }
    .unit {
      margin-left: 4px;
      font-size: 14px;
      color: #909399;
    }
  }
}

.mt-20 {
  margin-top: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>