<template>
  <div>
    <div
      class="my-6 flex flex-col sm:flex-row sm:items-center justify-between w-full"
    >
      <h2 class="text-xl font-bold">Inventory list</h2>
      <div class="flex gap-x-4 mt-4 sm:mt-0">
        <button
          v-if="isViewMode"
          class="btn btn-sm btn-primary sm:btn-md"
          @click="toEditMode"
        >
          Edit inventories
        </button>
        <button
          v-if="isEditMode"
          class="btn btn-sm btn-primary sm:btn-md"
          for="add-inventory-modal"
          :disabled="isMaxItems"
          @click="handleClickAdd"
        >
          Add new inventory
        </button>
        <button
          v-if="isEditMode"
          class="btn btn-sm btn-primary sm:btn-md"
          @click="toPreviewMode"
        >
          Preview changes
        </button>
        <button
          v-if="isPreviewMode"
          class="btn btn-sm btn-primary sm:btn-md"
          @click="toEditMode"
        >
          Continue editing
        </button>
        <button
          v-if="isPreviewMode"
          class="btn btn-sm btn-primary sm:btn-md"
          @click="publishChanges"
        >
          Approve changes
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th v-if="isEditMode">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listItems" :key="item.id">
            <td v-if="!item.isNew">
              <span class="text-gray-600">{{ item.id }}</span>
            </td>
            <td v-else>
              <span class="badge badge-secondary">NEW</span>
            </td>
            <td>
              <span class="text-gray-600">{{ item.name }}</span>
            </td>
            <td>
              <span class="text-gray-600">{{ item.quantity }}</span>
            </td>
            <td v-if="isEditMode">
              <div class="flex gap-x-3">
                <button
                  class="btn btn-sm btn-primary sm:btn-md"
                  @click="() => openEditModal(item.id)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-ghost sm:btn-md"
                  @click="() => onClickDelete(item.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DetailNewInventoryModal
      :is-open="isNewModalOpen"
      :close-modal="closeAddModal"
      :on-submit="handleAddNewInventory"
    />

    <DetailEditInventoryModal
      :is-open="isEditModalOpen"
      :close-modal="closeEditModal"
      :on-submit="handleEditInventory"
      :inventory="selectedInventory"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

import { InventoryItem } from '~/types/inventory'
import { Apartment } from '~/types/apartment'

type ActionMode = 'view' | 'edit' | 'preview'

interface Props {
  apartment: Apartment
}

const route = useRoute()
const { id } = route.params as { id: string }

const props = defineProps<Props>()

const items = computed(() => {
  const inventories = props.apartment.inventory || []
  const sortedInventories = inventories.sort((a, b) => b.id - a.id)

  return sortedInventories
})

const toast = useToast()
const mode = ref<ActionMode>('view')
const isNewModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedInventory = ref<InventoryItem | undefined>(undefined)
const listItems = ref<InventoryItem[]>(items.value)

const isEditMode = computed(() => mode.value === 'edit')
const isViewMode = computed(() => mode.value === 'view')
const isPreviewMode = computed(() => mode.value === 'preview')
const isMaxItems = computed(() => listItems.value.length >= 20)

const toEditMode = () => {
  mode.value = 'edit'
}

const toPreviewMode = () => {
  mode.value = 'preview'
}

const handleClickAdd = () => (isNewModalOpen.value = true)

const closeAddModal = () => (isNewModalOpen.value = false)

const openEditModal = (id: string | number) => {
  const selectedItem = listItems.value.find((item) => item.id === id)
  if (!selectedItem) return

  selectedInventory.value = selectedItem
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedInventory.value = undefined
}

const handleAddNewInventory = (newItem: InventoryItem) => {
  closeAddModal()

  listItems.value.unshift({
    ...newItem,
    id: (listItems.value[0]?.id || 0) + 1,
  })
}

const handleEditInventory = (editItem: InventoryItem) => {
  closeEditModal()

  const index = listItems.value.findIndex((item) => item.id === editItem.id)
  listItems.value[index] = { ...editItem }
}

const onClickDelete = (id: string | number) => {
  listItems.value = listItems.value.filter((item) => item.id !== id)
}

const publishChanges = () => {
  const body = {
    ...props.apartment,
    inventory: listItems.value.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isNew, ...rest } = item
      return rest
    }),
  }
  useBaseFetch(`/apartments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(() => {
      toast.success('Publish changes successfully', { timeout: 1500 })
      mode.value = 'view'
    })
    .catch(() => {
      toast.error('Publish changes failed', { timeout: 1500 })
    })

  setTimeout(() => {
    window.location.reload()
  }, 2000)
}
</script>
