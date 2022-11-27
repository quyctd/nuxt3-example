<template>
  <div class="text-sm breadcrumbs mb-3">
    <ul>
      <li v-for="item in props.items" :key="item.id">
        <nuxt-link v-if="item.link" :to="item.link">
          {{ item.title }}
        </nuxt-link>
        <span v-else>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  items: {
    id: number
    title: string
    link: string
  }[]
}

const props = defineProps<Props>()
</script>
