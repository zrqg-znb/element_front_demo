<script setup>
import { nextTick, reactive, ref } from 'vue'
import QueryBar from '../query-bar/QueryBar.vue'

const props = defineProps({
  /**
   * @remote true: 后端分页  false： 前端分页
   */
  remote: {
    type: Boolean,
    default: true,
  },
  /**
   * @isPagination 是否分页
   */
  isPagination: {
    type: Boolean,
    default: true,
  },
  scrollX: {
    type: Number,
    default: 450,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  columns: {
    type: Array,
    required: true,
  },
  /** queryBar中的参数 */
  queryItems: {
    type: Object,
    default() {
      return {}
    },
  },
  /** 补充参数（可选） */
  extraParams: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * 获取数据的API函数
   */
  getData: {
    type: Function,
    required: true,
  },
  /**
   * 是否立即加载数据
   */
  immediate: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:queryItems', 'onChecked', 'onDataChange'])

const loading = ref(false)
const initQuery = { ...props.queryItems }
const tableData = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  showSizePicker: true,
  showQuickJumper: true,
  itemCount: 0,
  prefix({ itemCount }) {
    return `共 ${itemCount} 条`
  },
})

// 过滤无效参数
function filterValidParams(params) {
  const filtered = {}
  for (const key in params) {
    const value = params[key]
    if (
      value !== null
      && value !== undefined
      && value !== ''
      && value !== 'null'
      && value !== 'undefined'
    ) {
      filtered[key] = value
    }
  }
  return filtered
}

// 监听queryItems变化
// watch(() => props.queryItems, () => {
//   if (props.immediate) {
//     handleSearch()
//   }
// }, { deep: true })

async function handleQuery() {
  try {
    loading.value = true
    let paginationParams = {}

    if (props.isPagination && props.remote) {
      paginationParams = {
        page: pagination.page,
        page_size: pagination.pageSize,
      }
    }

    const allParams = {
      ...props.queryItems,
      ...props.extraParams,
      ...paginationParams,
    }

    const params = filterValidParams(allParams)
    // 使用Alova的方式调用API
    const response = await props.getData(params)

    // 适配后端返回的数据格式
    if (response) {
      if (response.items) {
        // 分页数据格式
        tableData.value = response.items
        pagination.itemCount = response.pagination?.total_items || 0
      }
      else if (Array.isArray(response)) {
        // 数组格式
        tableData.value = response
        pagination.itemCount = response.length
      }
      else {
        // 其他格式
        tableData.value = response.data || []
        pagination.itemCount = tableData.value.length
      }
    }
    else {
      tableData.value = []
      pagination.itemCount = 0
    }
  }
  catch (error) {
    console.error('获取数据失败:', error)
    tableData.value = []
    pagination.itemCount = 0
    // Alova的错误已经在拦截器中处理了，这里不需要再显示错误消息
  }
  finally {
    emit('onDataChange', tableData.value)
    loading.value = false
  }
}
function handleSearch() {
  pagination.page = 1
  handleQuery()
}

async function handleReset() {
  const queryItems = { ...props.queryItems }
  for (const key in queryItems) {
    queryItems[key] = null
  }
  emit('update:queryItems', { ...queryItems, ...initQuery })
  await nextTick()
  pagination.page = 1
  handleQuery()
}

function onPageChange(currentPage) {
  pagination.page = currentPage
  if (props.remote) {
    handleQuery()
  }
}

function onPageSizeChange(pageSize) {
  pagination.pageSize = pageSize
  pagination.page = 1
  if (props.remote) {
    handleQuery()
  }
}

function onChecked(rowKeys) {
  if (props.columns.some(item => item.type === 'selection')) {
    emit('onChecked', rowKeys)
  }
}

// 刷新数据
function refresh() {
  handleQuery()
}

// 如果设置了立即加载，则在组件挂载时加载数据
if (props.immediate) {
  nextTick(() => {
    handleQuery()
  })
}

defineExpose({
  handleSearch,
  handleReset,
  refresh,
  tableData,
  loading,
})
</script>

<template>
  <div v-bind="$attrs">
    <QueryBar v-if="$slots.queryBar" mb-10px @search="handleSearch" @reset="handleReset">
      <slot name="queryBar" />
    </QueryBar>

    <!-- 操作按钮栏 -->
    <div v-if="$slots.tableHeader" mb-20px flex justify-between items-center>
      <slot name="tableHeader" />
    </div>

    <n-data-table
      :remote="remote"
      :loading="loading"
      :columns="columns"
      :data="tableData"
      :scroll-x="scrollX"
      :row-key="row => row[rowKey]"
      :pagination="isPagination ? pagination : false"
      @update:checked-row-keys="onChecked"
      @update:page="onPageChange"
      @update:page-size="onPageSizeChange"
    />
  </div>
</template>
