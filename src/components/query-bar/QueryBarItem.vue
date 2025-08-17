<script setup>
import { isNullOrWhitespace } from '@/utils'

defineProps({
  label: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: Number,
    default: 80,
  },
  contentWidth: {
    type: Number,
    default: 220,
  },
})
</script>

<template>
  <div flex items-center>
    <label
      v-if="!isNullOrWhitespace(label)"
      w-80px
      flex-shrink-0
      :style="{ width: `${labelWidth}px` }"
    >
      {{ label }}
    </label>
    <div :style="{ width: `${contentWidth}px` }">
      <slot />
    </div>
  </div>
</template>
