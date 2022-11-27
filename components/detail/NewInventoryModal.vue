<template>
  <input
    id="add-inventory-modal"
    type="checkbox"
    class="modal-toggle"
    :checked="props.isOpen"
  />
  <div class="modal cursor-pointer">
    <label class="modal-box relative">
      <label
        class="btn btn-sm btn-circle absolute right-2 top-2"
        @click="props.closeModal"
        >✕</label
      >
      <h3 class="text-lg font-bold mb-8">Add new inventory</h3>
      <DetailInventoryForm
        key="add-form"
        v-model:item="item"
        v-model:quantity="quantity"
      />
      <div class="modal-action">
        <button class="btn btn-sm sm:btn-md" @click="props.closeModal">
          Close
        </button>
        <button class="btn btn-sm btn-primary sm:btn-md" @click="addNewItem">
          Add
        </button>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

import { InventoryItem } from '~/types/inventory'

interface Props {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (item: InventoryItem) => void
}

const props = defineProps<Props>()

const item = ref(inventoryList[0].name)
const quantity = ref(1)

const addNewItem = () => {
  if (!item.value || !quantity.value) return

  const newItem = {
    id: 0,
    name: item.value,
    quantity: quantity.value,
    isNew: true,
  }

  props.onSubmit(newItem)
}
</script>
