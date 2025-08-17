<script setup>
import { h, reactive, ref } from 'vue'
import { NButton, NPopconfirm, NTag } from 'naive-ui'
import CrudTable from '@/components/table/CrudTable.vue'
import CrudModal from '@/components/table/CrudModal.vue'
import QueryBarItem from '@/components/query-bar/QueryBarItem.vue'
import { projectApi } from '@/service'
import { formatDateTime } from '@/utils'
import NovaIcon from '@/components/common/NovaIcon.vue'

// 查询参数
const queryItems = ref({
  name: null,
  is_active: null,
})

// 状态选项
const statusOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
]

// 表格引用
const tableRef = ref()
const checkedRowKeys = ref([])

// 表格列配置
const columns = [
  { type: 'selection' },
  { title: '项目名称', key: 'name', width: 200 },
  {
    title: '项目状态',
    key: 'is_active',
    width: 100,
    render(row) {
      return h(
        NTag,
        { type: row.is_active ? 'success' : 'error' },
        { default: () => (row.is_active ? '启用' : '禁用') },
      )
    },
  },
  { title: '车型数量', key: 'vehicle_count', width: 100 },
  { title: '项目描述', key: 'description', width: 200, ellipsis: { tooltip: true } },
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
            default: () => '确定删除这个项目吗？',
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
  name: '',
  is_active: true,
  description: '',
})

const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
}

// 处理选中行
function handleChecked(rowKeys) {
  checkedRowKeys.value = rowKeys
}

// 新增
function handleAdd() {
  isEdit.value = false
  modalTitle.value = '新增项目'
  resetForm()
  modalVisible.value = true
}

// 编辑
function handleEdit(row) {
  isEdit.value = true
  modalTitle.value = '编辑项目'
  editId.value = row.id
  Object.assign(formData, {
    name: row.name,
    is_active: row.is_active,
    description: row.description || '',
  })
  modalVisible.value = true
}

// 删除
async function handleDelete(row) {
  try {
    const response = await projectApi.deleteProject(row.id)
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
    window.$message?.warning('请选择要删除的项目')
    return
  }

  try {
    const promises = checkedRowKeys.value.map(id => projectApi.deleteProject(id))
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

    const response = isEdit.value
      ? await projectApi.updateProject(editId.value, formData)
      : await projectApi.createProject(formData)

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
    name: '',
    is_active: true,
    description: '',
  })
  formRef.value?.restoreValidation()
}
</script>

<template>
  <div>
    <CrudTable
      ref="tableRef"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="projectApi.getProjectList"
      @on-checked="handleChecked"
    >
      <template #queryBar>
        <QueryBarItem label="项目名称">
          <n-input v-model:value="queryItems.name" placeholder="请输入项目名称" clearable />
        </QueryBarItem>
        <QueryBarItem label="项目状态">
          <n-select
            v-model:value="queryItems.is_active"
            placeholder="请选择状态"
            clearable
            :options="statusOptions"
          />
        </QueryBarItem>
      </template>

      <template #tableHeader>
        <div class="flex">
          <NButton type="primary" @click="handleAdd">
            <template #icon>
              <NovaIcon icon="icon-park-outline:plus" />
            </template>
            新增项目
          </NButton>
          <NButton
            v-if="checkedRowKeys.length > 0"
            ml-10px
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
        <n-form-item label="项目名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入项目名称" />
        </n-form-item>
        <n-form-item label="项目状态" path="is_active">
          <n-switch
            v-model:value="formData.is_active"
            :checked-value="true"
            :unchecked-value="false"
          >
            <template #checked>
              启用
            </template>
            <template #unchecked>
              禁用
            </template>
          </n-switch>
        </n-form-item>
        <n-form-item label="项目描述" path="description">
          <n-input
            v-model:value="formData.description"
            type="textarea"
            placeholder="请输入项目描述"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </n-form-item>
      </n-form>
    </CrudModal>
  </div>
</template>
