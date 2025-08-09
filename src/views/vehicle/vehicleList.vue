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
          <n-select
            v-model:value="queryItems.project_id"
            placeholder="请选择项目空间"
            clearable
            filterable
            :options="projectOptions"
            :loading="projectLoading"
          />
        </QueryBarItem>
        <QueryBarItem label="车型名称">
          <n-input v-model:value="queryItems.name" placeholder="请输入车型名称" clearable />
        </QueryBarItem>
        <QueryBarItem label="车型编码">
          <n-input v-model:value="queryItems.code" placeholder="请输入车型编码" clearable />
        </QueryBarItem>
      </template>

      <template #tableHeader>
        <div>
          <NButton type="primary" @click="handleAdd">
            <template #icon>
              <NIcon><AddOutline /></NIcon>
            </template>
            新增车型
          </NButton>
          <NButton v-if="checkedRowKeys.length > 0" ml-10 type="error" @click="handleBatchDelete">
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
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="100px"
      >
        <n-form-item label="项目空间" path="project_space">
          <n-select
            v-model:value="formData.project_id"
            placeholder="请选择项目空间"
            filterable
            :options="projectOptions"
            :loading="projectLoading"
          />
        </n-form-item>
        <n-form-item label="车型名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入车型名称" />
        </n-form-item>
        <n-form-item label="车型编码" path="code">
          <n-input v-model:value="formData.code" placeholder="请输入车型编码" />
        </n-form-item>
        <n-form-item label="车型模块" path="module">
          <n-input v-model:value="formData.module" placeholder="请输入车型模块" />
        </n-form-item>
        <n-form-item label="车型描述" path="description">
          <n-input
            v-model:value="formData.description"
            type="textarea"
            placeholder="请输入车型描述"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </n-form-item>
      </n-form>
    </CrudModal>
  </div>
</template>

<script setup>
import { ref, reactive, h, onMounted } from 'vue'
import { NButton, NTag, NPopconfirm, NIcon } from 'naive-ui'
import CrudTable from '@/components/table/CrudTable.vue'
import CrudModal from '@/components/table/CrudModal.vue'
import QueryBarItem from '@/components/query-bar/QueryBarItem.vue'
import { vehicleApi, projectApi } from '@/service'
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
  { title: '车型模块', key: 'module', width: 120 },
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
  project_id: '',
  name: '',
  code: '',
  module: '',
  description: '',
})

const rules = {
  project_id: [{ required: true, message: '请选择项目空间', trigger: 'change' }],
  name: [{ required: true, message: '请输入车型名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入车型编码', trigger: 'blur' }],
  module: [{ required: true, message: '请输入车型模块', trigger: 'blur' }],
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
  } catch (error) {
    console.error('加载项目选项失败:', error)
  } finally {
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
  Object.assign(formData, {
    project_id: row.project_space,
    name: row.name,
    code: row.code,
    module: row.module,
    description: row.description || '',
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
  } catch (error) {
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
  } catch (error) {
    console.error('批量删除失败:', error)
  }
}

// 保存
async function handleSave() {
  try {
    await formRef.value?.validate()
    modalLoading.value = true

    const response = isEdit.value
      ? await vehicleApi.updateVehicle(editId.value, formData)
      : await vehicleApi.createVehicle(formData)

    if (response.success) {
      window.$message?.success(isEdit.value ? '更新成功' : '创建成功')
      modalVisible.value = false
      tableRef.value?.refresh()
    }
  } catch (error) {
    console.error('保存失败:', error)
  } finally {
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
    project_id: '',
    name: '',
    code: '',
    module: '',
    description: '',
  })
  formRef.value?.restoreValidation()
}

// 组件挂载时加载项目选项
onMounted(() => {
  loadProjectOptions()
})
</script>
