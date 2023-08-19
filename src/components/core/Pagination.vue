<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center mb-0">
      <li class="page-item disabled">
        <a class="page-link">Previous</a>
      </li>
      <li v-for="page in getPagination" class="page-item">
        <a
          class="page-link"
          :class="{ active: page == pagination.page }"
          href="#"
          @click.prevent="pageChange(page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { IPagination } from '../../types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object as () => IPagination,
    required: true,
  },
})

const pagination = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const getPagination = computed(() => {
  const { totalPage } = pagination.value

  return [...new Array(totalPage)].map((_, i) => i + 1)
})

const pageChange = (page: number) => {
  pagination.value.page = page
}
</script>
