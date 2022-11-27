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
      <h3 class="text-lg font-bold mb-8">Edit inventories</h3>
      <DetailInventoryForm
        key="edit-form"
        v-model:item="item"
        v-model:quantity="quantity"
      />
      <div class="modal-action">
        <button class="btn btn-sm sm:btn-md" @click="props.closeModal">
          Close
        </button>
        <button class="btn btn-sm btn-primary sm:btn-md" @click="updateItem">
          Update
        </button>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'

import { InventoryItem } from '~/types/inventory'

interface Props {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (item: InventoryItem) => void
  inventory?: InventoryItem
}

const props = defineProps<Props>()

const item = ref(props.inventory?.name ?? inventoryList[0].name)
const quantity = ref(props.inventory?.quantity ?? 1)

watch(
  () => props.inventory,
  () => {
    item.value = props.inventory?.name ?? ''
    quantity.value = props.inventory?.quantity ?? 1
  }
)

const updateItem = () => {
  if (!props.inventory) return
  if (!item.value || !quantity.value) return

  const updatedData = {
    id: props.inventory.id,
    name: item.value,
    quantity: quantity.value,
    isNew: true,
  }

  props.onSubmit(updatedData)
}
</script>
