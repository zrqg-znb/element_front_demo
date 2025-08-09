<template>
  <div min-h-60px flex items-start justify-between p-15px>
    <n-space wrap :size="[35, 15]">
      <slot />
      <div>
        <n-button secondary type="primary" @click="emit('reset')">重置</n-button>
        <n-button ml-20px type="primary" @click="emit('search')">搜索</n-button>
      </div>
    </n-space>
  </div>
</template>

<script setup>
const emit = defineEmits(['search', 'reset'])
</script>
