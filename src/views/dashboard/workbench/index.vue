<script setup lang="ts">
const Bentoitems = [
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and experience design.',
  },
  {
    title: 'The Power of Communication',
    description: 'Understand the impact of effective communication in our lives.',
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
  },
]
</script>

<template>
  <div class="w-full">
    <BubbleBg class="w-full h-96" />
  </div>
  <n-grid
    :x-gap="16"
    :y-gap="16"
  >
    <n-gi :span="8">
      <n-space
        vertical
        :size="16"
      >
        <CardContainer class="w-full">
          <CardBody
            class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
          >
            <CardItem
              :translate-z="50"
              class="text-xl font-bold text-neutral-600 dark:text-white"
            >
              悬浮卡片示例
            </CardItem>
            <CardItem
              as="p"
              translate-z="60"
              class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
            >
              鼠标滑动查看 3d 效果
            </CardItem>
            <CardItem
              :translate-z="100"
              :rotate-x="20"
              :rotate-z="-10"
              class="mt-4 w-full"
            >
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                alt="thumbnail"
              >
            </CardItem>
            <div class="mt-10 mr-10 text-align-end">
              <CardItem
                :translate-z="20"
                :translate-x="40"
                as="button"
                class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
              >
                Get Started
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </n-space>
    </n-gi>
    <n-gi :span="8">
      <n-space
        vertical
        :size="16"
      >
        <CardContainer class="w-full">
          <CardBody
            class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
          >
            <CardItem
              :translate-z="50"
              class="text-xl font-bold text-neutral-600 dark:text-white"
            >
              悬浮卡片示例
            </CardItem>
            <CardItem
              as="p"
              translate-z="60"
              class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
            >
              鼠标滑动查看 3d 效果
            </CardItem>
            <CardItem
              :translate-z="100"
              :rotate-x="20"
              :rotate-z="-10"
              class="mt-4 w-full"
            >
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                alt="thumbnail"
              >
            </CardItem>
            <div class="mt-10 mr-10 text-align-end">
              <CardItem
                :translate-z="20"
                :translate-x="40"
                as="button"
                class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
              >
                Get Started
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </n-space>
    </n-gi>
    <n-gi :span="8">
      <n-space
        vertical
        :size="16"
      >
        <CardContainer class="w-full">
          <CardBody
            class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
          >
            <CardItem
              :translate-z="50"
              class="text-xl font-bold text-neutral-600 dark:text-white"
            >
              悬浮卡片示例
            </CardItem>
            <CardItem
              as="p"
              translate-z="60"
              class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
            >
              鼠标滑动查看 3d 效果
            </CardItem>
            <CardItem
              :translate-z="100"
              :rotate-x="20"
              :rotate-z="-10"
              class="mt-4 w-full"
            >
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                alt="thumbnail"
              >
            </CardItem>
            <div class="mt-10 mr-10 text-align-end">
              <CardItem
                :translate-z="20"
                :translate-x="40"
                as="button"
                class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
              >
                Get Started
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </n-space>
    </n-gi>
  </n-grid>
  <div class="w-full h-full">
    <BentoGrid class="mx-auto max-w-5xl">
      <BentoGridItem
        v-for="(item, index) in Bentoitems"
        :key="index"
        :class="index === 3 || index === 6 ? 'md:col-span-2' : ''"
      >
        <template #header>
          <div class="flex size-full animate-pulse space-x-4">
            <div class="flex size-full flex-1 rounded-md bg-zinc-800" />
          </div>
        </template>

        <template #title>
          <strong>{{ item.title }}</strong>
        </template>

        <template #icon />

        <template #description>
          <p>{{ item.description }}</p>
        </template>
      </BentoGridItem>
    </BentoGrid>
  </div>
</template>

<style scoped></style>
