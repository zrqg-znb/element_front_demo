<script setup lang="ts">
import { useAuthStore } from '@/store'
import IconLogout from '~icons/icon-park-outline/logout'
import IconUser from '~icons/icon-park-outline/user'

const { t } = useI18n()

const { userInfo, logout } = useAuthStore()
const router = useRouter()

const options = computed(() => {
  return [
    {
      label: userInfo?.userName,
      key: 'userCenter',
      icon: () => h(IconUser),
    },
    {
      label: t('app.userCenter'),
      key: 'userCenter',
      icon: () => h(IconUser),
    },
    {
      label: t('app.loginOut'),
      key: 'loginOut',
      icon: () => h(IconLogout),
    },
  ]
})
function handleSelect(key: string | number) {
  if (key === 'loginOut') {
    window.$dialog?.info({
      title: t('app.loginOutTitle'),
      content: t('app.loginOutContent'),
      positiveText: t('common.confirm'),
      negativeText: t('common.cancel'),
      onPositiveClick: () => {
        logout()
      },
    })
  }
  if (key === 'userCenter')
    router.push('/userCenter')
}
</script>

<template>
  <n-dropdown
    trigger="click"
    :options="options"
    @select="handleSelect"
  >
    <n-avatar
      round
      :src="userInfo?.avatar"
    >
      <template #fallback>
        <div class="wh-full flex-center">
          <icon-park-outline-user />
        </div>
      </template>
    </n-avatar>
  </n-dropdown>
</template>

<style scoped></style>
