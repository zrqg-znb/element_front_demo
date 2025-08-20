<script setup lang="ts">
import { ref } from 'vue'

// Reviews data
const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: 'I\'ve never seen anything like this before. It\'s amazing. I love it.',
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: 'I don\'t know what to say. I\'m speechless. This is amazing.',
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john',
    body: 'I\'m at a loss for words. This is amazing. I love it.',
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Jane',
    username: '@jane',
    body: 'I\'m at a loss for words. This is amazing. I love it.',
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: 'I\'m at a loss for words. This is amazing. I love it.',
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'James',
    username: '@james',
    body: 'I\'m at a loss for words. This is amazing. I love it.',
    img: 'https://avatar.vercel.sh/james',
  },
]

// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2))
const secondRow = ref(reviews.slice(reviews.length / 2))
</script>

<template>
  <div class="w-full min-w-[100em]">
    <BubbleBg class="w-full h-96" />
  </div>
  <n-grid
    class="w-full min-w-[100em]"
  >
    <n-gi :span="8">
      <n-space
        vertical
        :size="16"
      >
        <CardContainer class="w-full ">
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
  <div class="min-w-[100em]">
    <div
      class="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl"
    >
      <!-- First Marquee -->
      <Marquee
        pause-on-hover
        class="[--duration:20s]"
      >
        <ReviewCard
          v-for="review in firstRow"
          :key="review.username"
          :img="review.img"
          :name="review.name"
          :username="review.username"
          :body="review.body"
        />
      </Marquee>

      <!-- Second Marquee (reverse) -->
      <Marquee
        reverse
        pause-on-hover
        class="[--duration:20s]"
      >
        <ReviewCard
          v-for="review in secondRow"
          :key="review.username"
          :img="review.img"
          :name="review.name"
          :username="review.username"
          :body="review.body"
        />
      </Marquee>

      <!-- Left Gradient -->
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
      />

      <!-- Right Gradient -->
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
