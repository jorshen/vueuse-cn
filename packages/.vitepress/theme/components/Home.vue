<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const banner = document.createElement('div')
  banner.className = 't-cloud'
  banner.style.cssText = `
  margin: 0 0 20px;
  `
  banner.innerHTML = `<a rel="nofollow" href='https://curl.qcloud.com/pOXwgcLZ' target="_blank"><img src="/rhino-design-1200x90.png" alt="腾讯云"></a>`
  // 获取页面类名为 VPHomeFeatures 下的类名为 container 的元素
  const container = document.querySelector('.VPHomeFeatures .container .items')
  if (container) {
    // 在容器元素自身的前面插入
    container.insertAdjacentElement('beforebegin', banner)
  }
})
</script>

<template>
  <div class="home vp-doc" mt-4 flex flex-col items-center>
    <HomeSponsors />
  </div>
</template>
