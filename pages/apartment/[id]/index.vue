<template>
  <div class="w-full">
    <SharedBreadcrumb :items="breadcrumbItems" />
    <div class="prose mb-6">
      <h1>{{ `Apartment ${id} detail` }}</h1>
    </div>

    <DetailApartmentInfo :apartment="apartmentInfo" />
    <DetailInventoryList :apartment="apartmentInfo" />
  </div>
</template>

<script setup lang="ts">
import { Apartment } from '~/types/apartment'

const route = useRoute()
const { id } = route.params

const breadcrumbItems = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: `Apartment ${id} detail`,
    link: `/apartment/${id}`,
  },
]

const { data } = await useAsyncData(`apartments/${id}`, () =>
  useBaseFetch(`/apartments/${id}`)
)

const apartmentInfo = computed(() => data.value as Apartment)
</script>
