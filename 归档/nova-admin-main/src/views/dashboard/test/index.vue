<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { VxeTableInstance, VxeTablePropTypes } from 'vxe-table'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const panels = ref([
  {
    Type: 'IDVP',
    children: ['IDVP SW 200', 'IDVP SW 201', 'IDVP SW 290'],
  },
  {
    Type: 'ADIP',
    children: ['ADIP SW 200', 'ADIP SW 201', 'ADIP SW 290'],
  },
  {
    Type: 'RNC',
    children: ['RNC_ww200', 'RNC_22_01', 'RNC_cc_290'],
  },
  {
    Type: 'TMS',
    children: ['TMS_MM_200', 'TMS_01', 'TMS_001'],
  },
])

const name = ref('IDVP')
const selectedCar = ref('IDVP SW 200')
const loading = ref(false)

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
  test: object
}

const tableRef = ref<VxeTableInstance>()

const tableClass = ref('')

watch(
  () => appStore.colorMode,
  (newValue) => {
    tableClass.value = newValue === 'dark' ? 'vxe-table-demo-theme--dark' : ''
  },
  { immediate: true },
)

const tableData = ref<RowVO[]>([])

const customConfig = reactive<VxeTablePropTypes.CustomConfig>({
  storage: true,
  mode: 'drawer',
  checkMethod({ column }) {
    return !['seq', 'name', 'test.num'].includes(column.field)
  },
})

const columnConfig = reactive<VxeTablePropTypes.ColumnConfig>({
  resizable: true,
})

// 模拟不同车型的数据
const mockDataMap: Record<string, RowVO[]> = {
  'IDVP SW 200': [
    { id: 10001, name: 'IDVP-Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Beijing', test: { num: 0, level: 1 } },
    { id: 10002, name: 'IDVP-Test2', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai', test: { num: 1, level: 2 } },
    { id: 10003, name: 'IDVP-Test3', role: 'Designer', sex: 'Man', age: 25, address: 'Guangzhou', test: { num: 2, level: 3 } },
  ],
  'IDVP SW 201': [
    { id: 20001, name: 'IDVP201-User1', role: 'PM', sex: 'Man', age: 32, address: 'Guangzhou', test: { num: 2, level: 3 } },
    { id: 20002, name: 'IDVP201-User2', role: 'Designer', sex: 'Women', age: 24, address: 'Shenzhen', test: { num: 3, level: 4 } },
    { id: 20003, name: 'IDVP201-User3', role: 'Tester', sex: 'Man', age: 26, address: 'Hangzhou', test: { num: 4, level: 5 } },
  ],
  'IDVP SW 290': [
    { id: 30001, name: 'IDVP290-Admin', role: 'Admin', sex: 'Man', age: 35, address: 'Hangzhou', test: { num: 4, level: 5 } },
    { id: 30002, name: 'IDVP290-Manager', role: 'Manager', sex: 'Women', age: 33, address: 'Nanjing', test: { num: 5, level: 6 } },
  ],
  'ADIP SW 200': [
    { id: 40001, name: 'ADIP-Manager', role: 'Manager', sex: 'Women', age: 30, address: 'Nanjing', test: { num: 5, level: 6 } },
    { id: 40002, name: 'ADIP-Lead', role: 'Lead', sex: 'Man', age: 33, address: 'Wuhan', test: { num: 6, level: 7 } },
    { id: 40003, name: 'ADIP-Dev', role: 'Developer', sex: 'Women', age: 27, address: 'Chengdu', test: { num: 7, level: 8 } },
  ],
  'ADIP SW 201': [
    { id: 50001, name: 'ADIP201-Dev', role: 'Developer', sex: 'Man', age: 27, address: 'Chengdu', test: { num: 7, level: 8 } },
    { id: 50002, name: 'ADIP201-QA', role: 'QA', sex: 'Women', age: 25, address: 'Xian', test: { num: 8, level: 9 } },
  ],
  'ADIP SW 290': [
    { id: 60001, name: 'ADIP290-Tester', role: 'Tester', sex: 'Women', age: 26, address: 'Xian', test: { num: 8, level: 9 } },
    { id: 60002, name: 'ADIP290-Analyst', role: 'Analyst', sex: 'Man', age: 29, address: 'Tianjin', test: { num: 9, level: 10 } },
  ],
  'RNC_ww200': [
    { id: 70001, name: 'RNC-Engineer', role: 'Engineer', sex: 'Man', age: 31, address: 'Qingdao', test: { num: 10, level: 11 } },
    { id: 70002, name: 'RNC-Architect', role: 'Architect', sex: 'Women', age: 34, address: 'Dalian', test: { num: 11, level: 12 } },
  ],
  'RNC_22_01': [
    { id: 80001, name: 'RNC-Architect', role: 'Architect', sex: 'Women', age: 34, address: 'Dalian', test: { num: 11, level: 12 } },
    { id: 80002, name: 'RNC-Consultant', role: 'Consultant', sex: 'Man', age: 36, address: 'Shenyang', test: { num: 12, level: 13 } },
  ],
  'RNC_cc_290': [
    { id: 90001, name: 'RNC-Specialist', role: 'Specialist', sex: 'Women', age: 28, address: 'Harbin', test: { num: 13, level: 14 } },
  ],
  'TMS_MM_200': [
    { id: 100001, name: 'TMS-Coordinator', role: 'Coordinator', sex: 'Man', age: 30, address: 'Jinan', test: { num: 14, level: 15 } },
    { id: 100002, name: 'TMS-Supervisor', role: 'Supervisor', sex: 'Women', age: 32, address: 'Zhengzhou', test: { num: 15, level: 16 } },
  ],
  'TMS_01': [
    { id: 110001, name: 'TMS-Director', role: 'Director', sex: 'Man', age: 38, address: 'Changsha', test: { num: 16, level: 17 } },
  ],
  'TMS_001': [
    { id: 120001, name: 'TMS-VP', role: 'VP', sex: 'Women', age: 40, address: 'Nanchang', test: { num: 17, level: 18 } },
    { id: 120002, name: 'TMS-CTO', role: 'CTO', sex: 'Man', age: 42, address: 'Hefei', test: { num: 18, level: 19 } },
  ],
}

// 模拟API请求
async function fetchTableData(carType: string): Promise<RowVO[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...(mockDataMap[carType] || [])])
    }, 1000)
  })
}

// 加载数据的方法
async function loadData(carType: string) {
  loading.value = true
  try {
    const data = await fetchTableData(carType)
    tableData.value = data
  }
  catch (error) {
    console.error('Failed to load data:', error)
    tableData.value = []
  }
  finally {
    loading.value = false
  }
}

// 获取当前面板的第一个车型
function getCurrentFirstCar() {
  const currentPanel = panels.value.find(panel => panel.Type === name.value)
  return currentPanel?.children[0] || ''
}

// 切换车型
async function handleCarSelect(car: string) {
  if (selectedCar.value !== car) {
    selectedCar.value = car
    await loadData(car)
  }
}

// 监听tab切换
watch(name, async () => {
  const firstCar = getCurrentFirstCar()
  if (firstCar && selectedCar.value !== firstCar) {
    selectedCar.value = firstCar
    await loadData(firstCar)
  }
}, { immediate: true })

onMounted(async () => {
  // 加载初始数据
  if (selectedCar.value) {
    await loadData(selectedCar.value)
  }
})
</script>

<template>
  <div class="w-full h-full">
    <n-tabs
      v-model:value="name"
      type="card"
      tab-style="min-width: 120px;"
      class="mb-4"
    >
      <n-tab-pane
        v-for="panel in panels"
        :key="panel.Type"
        :tab="panel.Type.toString()"
        :name="panel.Type"
        class="w-full h-full"
      >
        <div class="flex gap-4 h-full">
          <!-- 左侧车型选择区域 -->
          <div class="flex-shrink-0 w-48 border-r pr-4">
            <div class="space-y-2">
              <n-button
                v-for="car in panel.children"
                :key="car"
                :type="selectedCar === car ? 'primary' : 'default'"
                :secondary="selectedCar !== car"
                class="w-full justify-start"
                @click="handleCarSelect(car)"
              >
                {{ car }}
              </n-button>
            </div>
          </div>

          <!-- 右侧表格区域 -->
          <div class="flex-1" :class="tableClass">
            <div class="mb-2 text-lg font-medium">
              当前空间：{{ panel.Type }}     车型: {{ selectedCar }} ({{ tableData.length }} 条记录)
            </div>

            <vxe-grid
              :id="`table-${name}-${selectedCar.replace(/\s+/g, '-')}`"
              ref="tableRef"
              border
              :loading="loading"
              :data="tableData"
              :columns="[
                { type: 'seq', title: '序号', width: 60 },
                { field: 'name', title: '姓名', minWidth: 120 },
                { field: 'role', title: '角色', minWidth: 100 },
                { field: 'sex', title: '性别', width: 80 },
                { field: 'age', title: '年龄', width: 80 },
                { field: 'address', title: '地址', minWidth: 120 },
                { field: 'test.num', title: '测试num', width: 100 },
                { field: 'test.level', title: '测试level', width: 100 },
              ]"
              :custom-config="customConfig"
              :column-config="columnConfig"
              :toolbar-config="{
                custom: true,
                refresh: {
                  query: () => loadData(selectedCar),
                },
              }"
              height="500"
              keep-source
            />
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style lang="scss" scoped>
@import './dark.scss';
</style>
