<script setup lang="ts">
</script>

<template>
  <div class="w-[100vw] h-[100vh]">
    <div class="flex h-[40rem] items-center justify-center px-4">
      <div class="mx-auto text-4xl font-normal text-neutral-600 dark:text-neutral-400">
        这个网站是
        <FlipWords
          :words="[' Wiki知识库', '数据挖掘', '前端开发', '开源共创']"
          :duration="2000"
          class="text-4xl !text-primary"
        />
        <div>
          从运维到CICD，从前||后端到全栈，从demo到Project<br>
          程序员个人武器库
        </div>
      </div>
    </div>
  </div>
  <n-grid
    :x-gap="24"
    :y-gap="24"
    class="pl-5 pr-5 flex justify-center items-center w-full"
  >
    <n-gi :span="8" class="flex justify-center items-center flex-wrap">
      <CardContainer class="w-full">
        <CardBody
          class="w-full group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
        >
          <CardItem
            :translate-z="50"
            class="text-xl font-bold text-neutral-600 dark:text-white"
          >
            WIKI-CICD
          </CardItem>
          <CardItem
            as="p"
            translate-z="60"
            class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
          >
            Devops知识库，包含GitLab、Linux、Nginx、Docker、K8s等基础知识，以及ACP、HCIE等行业技术认证内容。
          </CardItem>
          <CardItem
            :translate-z="100"
            class="mt-4 w-full"
          >
            <img
              src="@/assets/images/img.png"
              height="1000"
              width="1000"
              class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            >
          </CardItem>
          <div class="mt-10 flex items-center justify-center">
            <ShimmerButton
              class="shadow-xl h-2.5em w-12em"
              shimmer-size="0.1em"
            >
              <span
                class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg dark:from-white dark:to-slate-900/10"
              >
                前往阅读
              </span>
            </ShimmerButton>
          </div>
        </CardBody>
      </CardContainer>
    </n-gi>
    <n-gi :span="8" class="flex justify-center items-center flex-wrap">
      <CardContainer class="w-full">
        <CardBody
          class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
        >
          <CardItem
            :translate-z="50"
            class="text-xl font-bold text-neutral-600 dark:text-white"
          >
            WIKI-数据挖掘
          </CardItem>
          <CardItem
            as="p"
            translate-z="60"
            class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
          >
            本Wiki记录了数据爬取、数据清洗、数据分析、数据可视化的相关知识，以Python、Charts为主
          </CardItem>
          <CardItem
            :translate-z="100"
            class="mt-4 w-full"
          >
            <img
              src="@/assets/images/data.jpeg"
              height="1000"
              width="1000"
              class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            >
          </CardItem>
          <div class="mt-10 flex items-center justify-center">
            <ShimmerButton
              class="shadow-xl h-2.5em w-12em"
              shimmer-size="0.1em"
            >
              <span
                class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg dark:from-white dark:to-slate-900/10"
              >
                前往阅读
              </span>
            </ShimmerButton>
          </div>
        </CardBody>
      </CardContainer>
    </n-gi>
    <n-gi :span="8" class="flex justify-center items-center flex-wrap">
      <CardContainer class="w-full">
        <CardBody
          class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
        >
          <CardItem
            :translate-z="50"
            class="text-xl font-bold text-neutral-600 dark:text-white"
          >
            WIKI-数据挖掘
          </CardItem>
          <CardItem
            as="p"
            translate-z="60"
            class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
          >
            本Wiki记录了数据爬取、数据清洗、数据分析、数据可视化的相关知识，以Python、Charts为主
          </CardItem>
          <CardItem
            :translate-z="100"
            class="mt-4 w-full"
          >
            <img
              src="@/assets/images/data.jpeg"
              height="1000"
              width="1000"
              class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            >
          </CardItem>
          <div class="mt-10 flex items-center justify-center">
            <ShimmerButton
              class="shadow-xl h-2.5em w-12em"
              shimmer-size="0.1em"
            >
              <span
                class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg dark:from-white dark:to-slate-900/10"
              >
                前往阅读
              </span>
            </ShimmerButton>
          </div>
        </CardBody>
      </CardContainer>
    </n-gi>
  </n-grid>
</template>

<style scoped>
</style>
