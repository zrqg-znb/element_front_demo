<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'
import type { ECOption } from '@/hooks/useEcharts'

// 代码健康度数据
const codeHealthData = reactive({
  departments: ['MCU部门', '车控系统', '自动驾驶', '车机屏幕', '车辆音响', '娱乐系统', '仪表系统'],
  healthScores: [85, 78, 92, 88, 76, 82, 90],
  complexityScores: [65, 72, 58, 62, 70, 68, 60],
  codeIssues: [12, 24, 8, 15, 28, 18, 10],
})

// DTS问题单统计
const dtsStatistics = reactive({
  departments: ['MCU部门', '车控系统', '自动驾驶', '车机屏幕', '车辆音响', '娱乐系统', '仪表系统'],
  total: [45, 38, 52, 41, 36, 43, 39],
  resolved: [32, 25, 48, 30, 22, 35, 33],
  pending: [13, 13, 4, 11, 14, 8, 6],
})

// 需求完成情况
const requirementsData = reactive({
  departments: ['MCU部门', '车控系统', '自动驾驶', '车机屏幕', '车辆音响', '娱乐系统', '仪表系统'],
  completed: [28, 22, 35, 26, 20, 30, 25],
  inProgress: [15, 12, 10, 14, 16, 12, 13],
  planned: [8, 10, 5, 9, 12, 8, 7],
})

// 最近活动
const recentActivities = ref([
  { id: 1, title: '自动驾驶系统代码审核完成', type: 'success', time: '10分钟前', department: '自动驾驶' },
  { id: 2, title: 'MCU部门新增15个DTS问题单', type: 'warning', time: '30分钟前', department: 'MCU部门' },
  { id: 3, title: '车机屏幕模块测试通过', type: 'success', time: '1小时前', department: '车机屏幕' },
  { id: 4, title: '车控系统代码复杂度超标', type: 'error', time: '2小时前', department: '车控系统' },
  { id: 5, title: '仪表系统新需求已添加', type: 'info', time: '3小时前', department: '仪表系统' },
  { id: 6, title: '娱乐系统集成测试开始', type: 'info', time: '5小时前', department: '娱乐系统' },
])

// 代码健康度图表
const codeHealthChartOption = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['健康度', '复杂度', '问题数'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: codeHealthData.departments,
  },
  yAxis: [
    {
      type: 'value',
      name: '百分比',
      min: 0,
      max: 100,
      interval: 20,
    },
    {
      type: 'value',
      name: '问题数',
      min: 0,
      max: 30,
      interval: 5,
    },
  ],
  series: [
    {
      name: '健康度',
      type: 'bar',
      data: codeHealthData.healthScores,
    },
    {
      name: '复杂度',
      type: 'bar',
      data: codeHealthData.complexityScores,
    },
    {
      name: '问题数',
      type: 'line',
      yAxisIndex: 1,
      data: codeHealthData.codeIssues,
    },
  ],
})

// DTS问题单图表
const dtsChartOption = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['总数', '已解决', '待处理'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: dtsStatistics.departments,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '总数',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      data: dtsStatistics.total,
    },
    {
      name: '已解决',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      data: dtsStatistics.resolved,
    },
    {
      name: '待处理',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      data: dtsStatistics.pending,
    },
  ],
})

// 需求完成情况图表
const requirementsChartOption = ref<ECOption>({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: '需求状态',
      type: 'pie',
      radius: '50%',
      data: [
        { value: requirementsData.completed.reduce((a, b) => a + b, 0), name: '已完成' },
        { value: requirementsData.inProgress.reduce((a, b) => a + b, 0), name: '进行中' },
        { value: requirementsData.planned.reduce((a, b) => a + b, 0), name: '计划中' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})

// 初始化图表
const { destroy: _destroyCodeHealth } = useEcharts('codeHealthChartRef', codeHealthChartOption)
const { destroy: _destroyDts } = useEcharts('dtsChartRef', dtsChartOption)
const { destroy: _destroyRequirements } = useEcharts('requirementsChartRef', requirementsChartOption)

// 部门选择
const selectedDepartment = ref('全部')
const departments = ['全部', 'MCU部门', '车控系统', '自动驾驶', '车机屏幕', '车辆音响', '娱乐系统', '仪表系统']

// 关键指标
const keyMetrics = reactive({
  totalCodeIssues: 115,
  avgCodeHealth: 84.4,
  totalDTS: 294,
  resolvedDTS: 225,
  totalRequirements: 251,
  completedRequirements: 186,
})

// 筛选活动
const filteredActivities = computed(() => {
  if (selectedDepartment.value === '全部') {
    return recentActivities.value
  }
  return recentActivities.value.filter(activity => activity.department === selectedDepartment.value)
})
</script>

<template>
  <div class="dashboard-container">
    <!-- 顶部卡片 -->
    <n-grid :cols="4" :x-gap="16" :y-gap="16">
      <n-gi>
        <n-card title="代码健康度" size="small" class="metric-card">
          <template #header-extra>
            <n-tag type="success">{{ keyMetrics.avgCodeHealth }}%</n-tag>
          </template>
          <div class="card-content">
            <div class="metric-value">{{ keyMetrics.totalCodeIssues }}</div>
            <div class="metric-label">代码问题总数</div>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="DTS问题单" size="small" class="metric-card">
          <template #header-extra>
            <n-tag type="info">{{ Math.round(keyMetrics.resolvedDTS / keyMetrics.totalDTS * 100) }}%</n-tag>
          </template>
          <div class="card-content">
            <div class="metric-value">{{ keyMetrics.totalDTS }}</div>
            <div class="metric-label">问题单总数</div>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="需求完成率" size="small" class="metric-card">
          <template #header-extra>
            <n-tag type="success">{{ Math.round(keyMetrics.completedRequirements / keyMetrics.totalRequirements * 100) }}%</n-tag>
          </template>
          <div class="card-content">
            <div class="metric-value">{{ keyMetrics.completedRequirements }}/{{ keyMetrics.totalRequirements }}</div>
            <div class="metric-label">已完成/总需求</div>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="部门筛选" size="small" class="metric-card">
          <div class="card-content">
            <n-select v-model:value="selectedDepartment" :options="departments.map(d => ({ label: d, value: d }))" />
          </div>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- 图表区域 -->
    <n-grid :cols="3" :x-gap="16" :y-gap="16" class="mt-4">
      <n-gi :span="2">
        <n-card title="代码健康度分析" class="chart-card">
          <div ref="codeHealthChartRef" class="chart-container"></div>
        </n-card>
      </n-gi>
      <n-gi :span="1">
        <n-card title="需求完成情况" class="chart-card">
          <div ref="requirementsChartRef" class="chart-container"></div>
        </n-card>
      </n-gi>
      <n-gi :span="2">
        <n-card title="DTS问题单统计" class="chart-card">
          <div ref="dtsChartRef" class="chart-container"></div>
        </n-card>
      </n-gi>
      <n-gi :span="1">
        <n-card title="最近活动" class="chart-card">
          <n-list hoverable clickable>
            <n-list-item v-for="activity in filteredActivities" :key="activity.id">
              <n-thing :title="activity.title" :title-extra="activity.time">
                <template #header-extra>
                  <n-tag :type="activity.type as 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary'" size="small">
                    {{ activity.department }}
                  </n-tag>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- 快速访问区域 -->
    <n-card title="快速访问" class="mt-4">
      <n-grid :cols="3" :x-gap="16">
        <n-gi>
          <n-card title="代码看板" size="small" class="access-card">
            <template #header-extra>
              <n-icon>
                <icon-park-outline-code-computer />
              </n-icon>
            </template>
            <n-button type="primary" block>
              查看详情
            </n-button>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="DTS问题单" size="small" class="access-card">
            <template #header-extra>
              <n-icon>
                <icon-park-outline-bug />
              </n-icon>
            </template>
            <n-button type="primary" block>
              查看详情
            </n-button>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="需求分析" size="small" class="access-card">
            <template #header-extra>
              <n-icon>
                <icon-park-outline-application />
              </n-icon>
            </template>
            <n-button type="primary" block>
              查看详情
            </n-button>
          </n-card>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 16px;
}

.metric-card {
  height: 100%;
  transition: all 0.3s;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.metric-label {
  font-size: 14px;
  color: #888;
}

.chart-card {
  height: 100%;
}

.chart-container {
  height: 300px;
}

.access-card {
  transition: all 0.3s;
}

.access-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>