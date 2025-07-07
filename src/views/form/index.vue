<template>
  <div class="form-container">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>基础表单</span>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入活动名称" />
        </el-form-item>

        <el-form-item label="活动区域" prop="region">
          <el-select v-model="formData.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="region1" />
            <el-option label="区域二" value="region2" />
          </el-select>
        </el-form-item>

        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="formData.date1"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="formData.date2"
                placeholder="选择时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="formData.delivery" />
        </el-form-item>

        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="formData.type">
            <el-checkbox label="美食/餐厅线上活动" name="type" />
            <el-checkbox label="地推活动" name="type" />
            <el-checkbox label="线下主题活动" name="type" />
            <el-checkbox label="单纯品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="formData.resource">
            <el-radio label="线上品牌商赞助" />
            <el-radio label="线下场地免费" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="活动形式" prop="desc">
          <el-input
            v-model="formData.desc"
            type="textarea"
            :rows="4"
            placeholder="请输入活动形式"
          />
        </el-form-item>

        <el-form-item label="图片上传">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">立即创建</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const formRef = ref()
const imageUrl = ref('')

const formData = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const rules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  ],
  resource: [
    { required: true, message: '请选择特殊资源', trigger: 'change' }
  ],
  desc: [
    { required: true, message: '请填写活动形式', trigger: 'blur' }
  ]
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('提交成功！')
      console.log('submit!', formData)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  imageUrl.value = ''
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }

  // 这里应该是上传到服务器的逻辑
  // 现在只是模拟一个本地预览
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    imageUrl.value = reader.result
  }

  return false // 阻止自动上传
}
</script>

<style scoped>
.form-container {
  padding: 20px;
}

.form-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-center {
  text-align: center;
}

.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>