<script setup lang="ts">
import { SettingDrawer } from './components'
import topMenu from './topMenu.layout.vue'
</script>

<template>
  <SettingDrawer />
  <component :is="topMenu" />
</template>
