<script setup lang="ts">
import { useMousePressed } from '@vueuse/core'
import { stringify } from '@vueuse/docs-utils'
import { useToggle } from '@vueuse/shared'
import { computed, reactive, useTemplateRef } from 'vue'

const el = useTemplateRef<HTMLElement>('el')
const [withTarget, toggle] = useToggle()
const target = computed<HTMLElement | null>(() =>
  (withTarget.value ? el.value : window) as HTMLElement)

const mouse = reactive(useMousePressed({ target }))
const text = stringify(mouse)
</script>

<template>
  <div ref="el" class="select-none">
    <pre lang="yaml">{{ text }}</pre>
    <div>
      开启追踪
      <button class="ml-2 button small" @click="toggle()">
        {{ withTarget ? 'Demo section' : 'Entire page' }}
      </button>
    </div>
  </div>
</template>
