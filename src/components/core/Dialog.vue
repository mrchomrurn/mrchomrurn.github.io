<template>
  <slot
    name="activator"
    :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': `#${id}` }"
  >
  </slot>

  <div class="modal fade" :id="id" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
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
import { getCurrentInstance, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps({
  id: {
    type: String,
    default: () => `__dialog-${getCurrentInstance()?.uid}`,
  },
  title: String,
})

let modal: any

onMounted(() => {
  modal = new Modal(`#${props.id}`)
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
