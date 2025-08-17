<script setup>
import { h, ref } from 'vue'
import { NButton, NCode, NDescriptions, NDescriptionsItem, NDivider, NModal, NTabPane, NTabs, NTag } from 'naive-ui'
import CrudTable from '@/components/table/CrudTable.vue'
import QueryBarItem from '@/components/query-bar/QueryBarItem.vue'
import { executionApi } from '@/service'
import { formatDateTime } from '@/utils'
import NovaIcon from '@/components/common/NovaIcon.vue'

const route = useRoute()

// 查询参数
const queryItems = ref({
  script_id: route.query.script_id || null,
  script_name: null,
  status: null,
})

// 移除了脚本选项相关代码，改为使用输入框模糊搜索

// 状态选项
const statusOptions = [
  { label: '执行中', value: 'running' },
  { label: '成功', value: 'success' },
  { label: '失败', value: 'failed' },
  { label: '超时', value: 'timeout' },
  { label: '已取消', value: 'cancelled' },
]

// 表格引用
const tableRef = ref()

// 详情弹窗
const detailModalVisible = ref(false)
const currentExecution = ref(null)

// 表格列配置
const columns = [
  { title: '脚本名称', key: 'script_name', width: 150 },
  {
    title: '执行状态',
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NTag,
        { type: getStatusType(row.status) },
        { default: () => row.status_display },
      )
    },
  },
  {
    title: '开始时间',
    key: 'started_at',
    width: 180,
    render(row) {
      return formatDateTime(row.started_at)
    },
  },
  {
    title: '结束时间',
    key: 'finished_at',
    width: 180,
    render(row) {
      return row.finished_at ? formatDateTime(row.finished_at) : '未结束'
    },
  },
  {
    title: '执行耗时',
    key: 'execution_time',
    width: 120,
    render(row) {
      return row.execution_time ? `${row.execution_time.toFixed(2)}秒` : '-'
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    fixed: 'right',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          secondary: true,
          onClick: () => handleViewDetail(row),
        },
        { default: () => '查看详情', icon: () => h(NovaIcon, { icon: 'icon-park-outline:view-grid-detail' }) },
      )
    },
  },
]

// 获取状态类型
function getStatusType(status) {
  const typeMap = {
    running: 'info',
    success: 'success',
    failed: 'error',
    timeout: 'warning',
    cancelled: 'default',
  }
  return typeMap[status] || 'default'
}

// 查看详情
async function handleViewDetail(row) {
  try {
    const response = await executionApi.getExecutionDetail(row.id)
    if (response.success) {
      currentExecution.value = response
      detailModalVisible.value = true
    }
  }
  catch (error) {
    console.error('获取详情失败:', error)
  }
}

// 移除了loadScriptOptions函数，不再需要预加载脚本选项
</script>

<template>
  <div>
    <CrudTable
      ref="tableRef"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="executionApi.getExecutionList"
    >
      <template #queryBar>
        <QueryBarItem label="脚本名称">
          <n-input
            v-model:value="queryItems.script_name"
            placeholder="请输入脚本名称"
            clearable
          />
        </QueryBarItem>
        <QueryBarItem label="执行状态">
          <n-select
            v-model:value="queryItems.status"
            placeholder="请选择状态"
            clearable
            :options="statusOptions"
          />
        </QueryBarItem>
      </template>
    </CrudTable>

    <!-- 执行详情弹窗 -->
    <NModal
      v-model:show="detailModalVisible"
      preset="card"
      title="执行详情"
      size="huge"
      style="width: 80%; max-width: 1000px"
      :bordered="false"
    >
      <div v-if="currentExecution">
        <NDescriptions :column="2" bordered>
          <NDescriptionsItem label="脚本名称">
            {{ currentExecution.script_name }}
          </NDescriptionsItem>
          <NDescriptionsItem label="执行状态">
            <NTag :type="getStatusType(currentExecution.status)">
              {{ currentExecution.status_display }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="开始时间">
            {{ formatDateTime(currentExecution.started_at) }}
          </NDescriptionsItem>
          <NDescriptionsItem label="结束时间">
            {{ currentExecution.finished_at ? formatDateTime(currentExecution.finished_at) : '未结束' }}
          </NDescriptionsItem>
          <NDescriptionsItem label="执行耗时">
            {{ currentExecution.execution_time ? `${currentExecution.execution_time.toFixed(2)}秒` : '-' }}
          </NDescriptionsItem>
        </NDescriptions>

        <NDivider />

        <NTabs type="line" animated>
          <NTabPane name="params" tab="输入参数">
            <NCode
              :code="JSON.stringify(currentExecution.input_parameters, null, 2)"
              language="json"
              show-line-numbers
            />
          </NTabPane>
          <NTabPane name="output" tab="执行输出">
            <NCode
              :code="currentExecution.output || '无输出'"
              language="text"
              show-line-numbers
            />
          </NTabPane>
          <NTabPane v-if="currentExecution.error_message" name="error" tab="错误信息">
            <NCode
              :code="currentExecution.error_message"
              language="text"
              show-line-numbers
            />
          </NTabPane>
        </NTabs>
      </div>
    </NModal>
  </div>
</template>
