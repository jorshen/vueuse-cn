<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { functions } from '@vueuse/metadata'
import { computed, onMounted } from 'vue'
import exportSizes from '../../../export-size.json'

const props = defineProps<{ fn: string }>()
const info = computed(() => functions.find(i => i.name === props.fn)!)
const lastUpdated = useTimeAgo(new Date(info.value?.lastUpdated || 0))
const link = computed(() => `/functions\#category=${encodeURIComponent(info.value!.category!)}`)

const exportSize = exportSizes[info.value!.name as keyof typeof exportSizes]

function getFunctionLink(fn: string) {
  const info = functions.find(i => i.name === fn)
  return info?.docs?.replace(/https?:\/\/vueuse\.org\//g, '/')
}
onMounted(() => {
  const tCloud = document.getElementsByClassName('t-cloud')
  if (tCloud.length) {
    return
  }
  const banner = document.createElement('div')
  banner.className = 't-cloud'
  banner.style.cssText = `
  margin: 20px 0 0;
  `
  banner.innerHTML = `<a rel="nofollow" href='https://curl.qcloud.com/pOXwgcLZ' target="_blank"><img src="/rhino-design-180x460.png" alt="腾讯云"></a>`
  // 获取页面类名为 VPHomeFeatures 下的类名为 container 的元素
  const container = document.querySelector('.VPDocAsideOutline')
  if (container) {
    container.appendChild(banner)
  }
})
</script>

<template>
  <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-8 items-start">
    <div opacity="50">
      Category
    </div>
    <div><a :href="link">{{ info.category }}</a></div>
    <div opacity="50">
      Export Size
    </div>
    <div> {{ exportSize }}</div>
    <template v-if="info.package !== 'core' && info.package !== 'shared'">
      <div opacity="50">
        Package
      </div>
      <div><code>@vueuse/{{ info.package }}</code></div>
    </template>
    <template v-if="info.lastUpdated">
      <div opacity="50">
        Last Changed
      </div>
      <div>{{ lastUpdated }}</div>
    </template>
    <template v-if="info.alias?.length">
      <div opacity="50">
        Alias
      </div>
      <div flex="~ gap-1 wrap">
        <code v-for="(a, idx) of info.alias" :key="idx" class="!py-0">{{ a }}</code>
      </div>
    </template>
    <template v-if="info.related?.length">
      <div opacity="50">
        Related
      </div>
      <div flex="~ gap-1 wrap">
        <a
          v-for="(name, idx) of info.related"
          :key="idx"
          class="!py-0"
          :href="getFunctionLink(name)"
        >
          <code>{{ name }}</code>
        </a>
      </div>
    </template>
  </div>
</template>
