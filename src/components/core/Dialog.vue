<template>
  <slot
    name="activator"
    :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': `#${id}` }"
  >
  </slot>

  <div class="modal fade" :id="id" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header border-bottom-lg">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
            {{ title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, computed, watch } from 'vue'
import { Modal } from 'bootstrap'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  id: {
    type: String,
    default: () => `__dialog-${getCurrentInstance()?.uid}`,
  },
  modelValue: Boolean,
  title: String,
})

let modal: any

const dialogModel = computed({
  get: () => props.modelValue,
  set: (show) => emit('update:modelValue', show),
})

watch(
  () => dialogModel.value,
  (show: boolean) => {
    if (show) {
      handleOpen()
    } else {
      handleClose()
    }
  }
)

onMounted(() => {
  modal = new Modal(`#${props.id}`)
  const el = document.getElementById(props.id) as HTMLElement
  el.addEventListener('hidden.bs.modal', () => {
    dialogModel.value = false
  })
})

const handleOpen = () => {
  if (!modal) {
    console.error('Modal is not initialized yet.')
    return
  }

  modal.show()
}

const handleClose = () => {
  if (!modal) {
    console.error('Modal is not initialized yet.')
    return
  }

  modal.hide()
}

defineExpose({ handleClose, handleOpen })
</script>
