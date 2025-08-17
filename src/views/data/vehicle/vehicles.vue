<script setup>
import { h, onMounted, reactive, ref } from 'vue'
import { NButton, NForm, NFormItem, NInput, NPopconfirm, NSelect, NTag } from 'naive-ui'
import CrudTable from '@/components/table/CrudTable.vue'
import CrudModal from '@/components/table/CrudModal.vue'
import QueryBarItem from '@/components/query-bar/QueryBarItem.vue'
import { projectApi, vehicleApi } from '@/service'
import { formatDateTime } from '@/utils'
import NovaIcon from '@/components/common/NovaIcon.vue'

// 查询参数
const queryItems = ref({
  project_id: null,
  name: null,
  code: null,
})

// 项目选项
const projectOptions = ref([])
const projectLoading = ref(false)

// 表格引用
const tableRef = ref()
const checkedRowKeys = ref([])

// 表格列配置
const columns = [
  { type: 'selection' },
  { title: '项目空间', key: 'project_space_name', width: 150 },
  { title: '车型名称', key: 'name', width: 150 },
  { title: '车型编码', key: 'code', width: 120 },
  {
    title: '管道配置',
    key: 'pipelines',
    width: 150,
    render(row) {
      if (!row.pipelines || row.pipelines.length === 0) {
        return '无配置'
      }
      return h(
        NTag,
        { type: 'info', bordered: false },
        { default: () => `${row.pipelines.length}个管道` },
      )
    },
  },
  { title: '车型描述', key: 'description', width: 200, ellipsis: { tooltip: true } },
  {
    title: '创建时间',
    key: 'created_at',
    width: 180,
    render(row) {
      return formatDateTime(row.created_at)
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleEdit(row),
          },
          {
            default: () => '编辑',
            icon: () => h(NovaIcon, { icon: 'icon-park-outline:edit-two' }),
          },
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDelete(row),
          },
          {
            default: () => '确定删除这个车型吗？',
            trigger: () =>
              h(
                NButton,
                {
                  size: 'small',
                  type: 'error',
                  secondary: true,
                  style: 'margin-left: 8px',
                },
                {
                  default: () => '删除',
                  icon: () => h(NovaIcon, { icon: 'icon-park-outline:delete-five' }),
                },
              ),
          },
        ),
      ]
    },
  },
]

// 弹窗相关
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalTitle = ref('')
const isEdit = ref(false)
const editId = ref('')

// 表单相关
const formRef = ref()
const formData = reactive({
  project_space: '',
  name: '',
  code: '',
  description: '',
  pipelines: [],
})

const rules = {
  project_space: [{ required: true, message: '请选择项目空间', trigger: 'change' }],
  name: [{ required: true, message: '请输入车型名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入车型编码', trigger: 'blur' }],
}

// 加载项目选项
async function loadProjectOptions() {
  try {
    projectLoading.value = true
    const response = await projectApi.getActiveProjects()
    if (response.success && response.items) {
      const projects = response.items
      projectOptions.value = projects.map(item => ({
        label: item.name,
        value: item.id,
      }))
    }
  }
  catch (error) {
    console.error('加载项目选项失败:', error)
  }
  finally {
    projectLoading.value = false
  }
}

// 处理选中行
function handleChecked(rowKeys) {
  checkedRowKeys.value = rowKeys
}

// 新增
function handleAdd() {
  isEdit.value = false
  modalTitle.value = '新增车型'
  resetForm()
  modalVisible.value = true
}

// 编辑
function handleEdit(row) {
  isEdit.value = true
  modalTitle.value = '编辑车型'
  editId.value = row.id

  // 处理管道数据格式
  const formattedPipelines = []
  if (row.pipelines && row.pipelines.length > 0) {
    row.pipelines.forEach((pipeline) => {
      const pipelineName = Object.keys(pipeline)[0]
      formattedPipelines.push({
        name: pipelineName,
        value: pipeline[pipelineName],
      })
    })
  }

  Object.assign(formData, {
    project_space: row.project_space,
    name: row.name,
    code: row.code,
    description: row.description || '',
    pipelines: formattedPipelines,
  })
  modalVisible.value = true
}

// 删除
async function handleDelete(row) {
  try {
    const response = await vehicleApi.deleteVehicle(row.id)
    if (response.success) {
      window.$message?.success('删除成功')
      tableRef.value?.refresh()
    }
  }
  catch (error) {
    console.error('删除失败:', error)
  }
}

// 批量删除
async function handleBatchDelete() {
  if (checkedRowKeys.value.length === 0) {
    window.$message?.warning('请选择要删除的车型')
    return
  }

  try {
    const promises = checkedRowKeys.value.map(id => vehicleApi.deleteVehicle(id))
    await Promise.all(promises)
    window.$message?.success('批量删除成功')
    checkedRowKeys.value = []
    tableRef.value?.refresh()
  }
  catch (error) {
    console.error('批量删除失败:', error)
  }
}

// 保存
async function handleSave() {
  try {
    await formRef.value?.validate()
    modalLoading.value = true

    // 格式化管道数据
    const submitData = { ...formData }
    submitData.pipelines = formatPipelinesForSubmit()

    const response = isEdit.value
      ? await vehicleApi.updateVehicle(editId.value, submitData)
      : await vehicleApi.createVehicle(submitData)

    if (response.success) {
      window.$message?.success(isEdit.value ? '更新成功' : '创建成功')
      modalVisible.value = false
      tableRef.value?.refresh()
    }
  }
  catch (error) {
    console.error('保存失败:', error)
  }
  finally {
    modalLoading.value = false
  }
}

// 取消
function handleCancel() {
  resetForm()
}

// 重置表单
function resetForm() {
  Object.assign(formData, {
    project_space: '',
    name: '',
    code: '',
    description: '',
    pipelines: [],
  })
  formRef.value?.restoreValidation()
}

// 添加管道
function addPipeline() {
  formData.pipelines.push({
    name: '',
    value: '',
  })
}

// 移除管道
function removePipeline(index) {
  formData.pipelines.splice(index, 1)
}

// 格式化管道数据为后端需要的格式
function formatPipelinesForSubmit() {
  return formData.pipelines
    .filter(p => p.name && p.value) // 过滤掉空的管道
    .map((p) => {
      const pipelineObj = {}
      pipelineObj[p.name] = p.value
      return pipelineObj
    })
}

// 组件挂载时加载项目选项
onMounted(() => {
  loadProjectOptions()
})
</script>

<template>
  <div>
    <CrudTable
      ref="tableRef"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="vehicleApi.getVehicleList"
      @on-checked="handleChecked"
    >
      <template #queryBar>
        <QueryBarItem label="项目空间">
          <NSelect
            v-model:value="queryItems.project_id"
            placeholder="请选择项目空间"
            clearable
            filterable
            :options="projectOptions"
            :loading="projectLoading"
          />
        </QueryBarItem>
        <QueryBarItem label="车型名称">
          <NInput v-model:value="queryItems.name" placeholder="请输入车型名称" clearable />
        </QueryBarItem>
        <QueryBarItem label="车型编码">
          <NInput v-model:value="queryItems.code" placeholder="请输入车型编码" clearable />
        </QueryBarItem>
      </template>

      <template #tableHeader>
        <div class="flex">
          <NButton type="primary" @click="handleAdd">
            <template #icon>
              <NovaIcon icon="icon-park-outline:add" />
            </template>
            新增车型
          </NButton>
          <NButton
            v-if="checkedRowKeys.length > 0"
            class="ml-20px"
            type="error"
            @click="handleBatchDelete"
          >
            批量删除
          </NButton>
        </div>
      </template>
    </CrudTable>

    <!-- 新增/编辑弹窗 -->
    <CrudModal
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      width="700px"
      @save="handleSave"
      @cancel="handleCancel"
    >
      <NForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="100px"
      >
        <NFormItem label="项目空间" path="project_space">
          <NSelect
            v-model:value="formData.project_space"
            placeholder="请选择项目空间"
            filterable
            :options="projectOptions"
            :loading="projectLoading"
          />
        </NFormItem>
        <NFormItem label="车型名称" path="name">
          <NInput v-model:value="formData.name" placeholder="请输入车型名称" />
        </NFormItem>
        <NFormItem label="车型编码" path="code">
          <NInput v-model:value="formData.code" placeholder="请输入车型编码" />
        </NFormItem>
        <NFormItem label="管道配置" path="pipelines">
          <div class="pipeline-container">
            <div v-for="(pipeline, index) in formData.pipelines" :key="index" class="pipeline-item">
              <div class="pipeline-header">
                <NInput
                  v-model:value="pipeline.name"
                  placeholder="管道名称"
                  class="pipeline-name-input"
                />
                <NButton quaternary circle size="small" @click="() => removePipeline(index)">
                  <template #icon>
                    <NovaIcon icon="icon-park-outline:close" />
                  </template>
                </NButton>
              </div>
              <NInput
                v-model:value="pipeline.value"
                placeholder="管道值，例如: 'MPU','MCU'"
                class="pipeline-value-input"
              />
            </div>
            <NButton class="add-pipeline-btn" secondary size="small" @click="addPipeline">
              <template #icon>
                <NovaIcon icon="icon-park-outline:add" />
              </template>
              添加管道
            </NButton>
          </div>
        </NFormItem>
        <NFormItem label="车型描述" path="description">
          <NInput
            v-model:value="formData.description"
            type="textarea"
            placeholder="请输入车型描述"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </NFormItem>
      </NForm>
    </CrudModal>
  </div>
</template>

<style scoped>
.pipeline-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pipeline-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  background-color: #f9f9f9;
}

.pipeline-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.pipeline-name-input {
  flex: 1;
  margin-right: 8px;
}

.pipeline-value-input {
  width: 100%;
}

.add-pipeline-btn {
  align-self: flex-start;
  margin-top: 8px;
}
</style>
