<template>
  <NuxtLink :to="`/apartment/${props.item.id}`">
    <div class="card w-full bg-base-100 shadow-xl mb-6 md:mb-0">
      <figure><img :src="props.item.image" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">{{ props.item.address }}</h2>
        <p class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
          <span><strong>Floor</strong>: {{ props.item.floor }}</span>
        </p>
        <p class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <span><strong>Door:</strong> {{ props.item.door }}</span>
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Apartment } from '~/types/apartment'

interface Props {
  item: Apartment
}

const props = defineProps<Props>()
</script>
